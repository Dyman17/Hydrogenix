from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import psycopg2
import bcrypt
import os
from datetime import timedelta
import json

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Allow React dev server

# Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'hydrogenix-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
jwt = JWTManager(app)

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ.get('DB_HOST', 'localhost'),
        database=os.environ.get('DB_NAME', 'hydrogenix'),
        user=os.environ.get('DB_USER', 'postgres'),
        password=os.environ.get('DB_PASSWORD', 'postgres')
    )
    return conn

# Helper functions
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def get_user_by_email(email):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, name, email, password_hash, language, theme FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    
    if user:
        return {
            'id': user[0],
            'name': user[1],
            'email': user[2],
            'password_hash': user[3],
            'language': user[4],
            'theme': user[5]
        }
    return None

def create_user(name, email, password, language='ru', theme='light'):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        hashed_password = hash_password(password)
        cur.execute("""
            INSERT INTO users (name, email, password_hash, language, theme)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
        """, (name, email, hashed_password, language, theme))
        
        user_id = cur.fetchone()[0]
        conn.commit()
        
        cur.close()
        conn.close()
        return user_id
    except Exception as e:
        conn.rollback()
        cur.close()
        conn.close()
        raise e

def get_all_products():
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("""
        SELECT id, name_ru, name_kz, name_en, material_ru, material_kz, material_en,
               price, weight, shelf_life, application, description_ru, description_kz, description_en
        FROM products
        ORDER BY name_ru
    """)
    
    products = []
    for row in cur.fetchall():
        products.append({
            'id': row[0],
            'name': {
                'ru': row[1],
                'kz': row[2],
                'en': row[3]
            },
            'material': {
                'ru': row[4],
                'kz': row[5],
                'en': row[6]
            },
            'price': float(row[7]),
            'weight': row[8],
            'shelfLife': row[9],
            'application': row[10],
            'description': {
                'ru': row[11],
                'kz': row[12],
                'en': row[13]
            }
        })
    
    cur.close()
    conn.close()
    return products

def get_user_orders(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("""
        SELECT o.id, o.total_price, o.status, o.created_at,
               o.city, o.street, o.postal_code, o.phone
        FROM orders o
        WHERE o.user_id = %s
        ORDER BY o.created_at DESC
    """, (user_id,))
    
    orders = []
    for row in cur.fetchall():
        orders.append({
            'id': f'ORD-{row[0]:03d}',
            'totalPrice': float(row[1]),
            'status': row[2],
            'createdAt': row[3].isoformat(),
            'deliveryAddress': {
                'city': row[4],
                'street': row[5],
                'postalCode': row[6],
                'phone': row[7]
            }
        })
    
    cur.close()
    conn.close()
    return orders

def create_order(user_id, order_data):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Create order
        cur.execute("""
            INSERT INTO orders (user_id, total_price, status, city, street, postal_code, phone)
            VALUES (%s, %s, 'pending', %s, %s, %s, %s)
            RETURNING id
        """, (
            user_id,
            order_data['totalPrice'],
            order_data.get('city'),
            order_data.get('street'),
            order_data.get('postalCode'),
            order_data.get('phone')
        ))
        
        order_id = cur.fetchone()[0]
        
        # Create order items
        for item in order_data['items']:
            cur.execute("""
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES (%s, %s, %s, %s)
            """, (order_id, item['productId'], item['quantity'], item['price']))
        
        conn.commit()
        cur.close()
        conn.close()
        return order_id
    except Exception as e:
        conn.rollback()
        cur.close()
        conn.close()
        raise e

# Routes

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'HydroGenix API is running'})

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'message': f'{field} is required'}), 400
        
        # Check if user already exists
        existing_user = get_user_by_email(data['email'])
        if existing_user:
            return jsonify({'message': 'User with this email already exists'}), 409
        
        # Create new user
        user_id = create_user(
            name=data['name'],
            email=data['email'],
            password=data['password'],
            language=data.get('language', 'ru'),
            theme=data.get('theme', 'light')
        )
        
        # Get created user data
        user = get_user_by_email(data['email'])
        del user['password_hash']  # Remove password hash from response
        
        # Create JWT token
        access_token = create_access_token(identity=user['id'])
        
        return jsonify({
            'message': 'User registered successfully',
            'token': access_token,
            'user': user
        }), 201
        
    except Exception as e:
        print(f"Registration error: {e}")
        return jsonify({'message': 'Registration failed'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email and password are required'}), 400
        
        # Find user
        user = get_user_by_email(data['email'])
        if not user:
            return jsonify({'message': 'Invalid credentials'}), 401
        
        # Verify password
        if not verify_password(data['password'], user['password_hash']):
            return jsonify({'message': 'Invalid credentials'}), 401
        
        # Remove password hash from response
        del user['password_hash']
        
        # Create JWT token
        access_token = create_access_token(identity=user['id'])
        
        return jsonify({
            'message': 'Login successful',
            'token': access_token,
            'user': user
        }), 200
        
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'message': 'Login failed'}), 500

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        products = get_all_products()
        return jsonify(products), 200
    except Exception as e:
        print(f"Error fetching products: {e}")
        return jsonify({'message': 'Failed to fetch products'}), 500

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, name, email, language, theme, phone, city, street, postal_code
            FROM users WHERE id = %s
        """, (user_id,))
        
        user = cur.fetchone()
        cur.close()
        conn.close()
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        user_data = {
            'id': user[0],
            'name': user[1],
            'email': user[2],
            'language': user[3],
            'theme': user[4],
            'phone': user[5],
            'address': {
                'city': user[6],
                'street': user[7],
                'postalCode': user[8]
            }
        }
        
        return jsonify(user_data), 200
        
    except Exception as e:
        print(f"Error fetching profile: {e}")
        return jsonify({'message': 'Failed to fetch profile'}), 500

@app.route('/api/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            UPDATE users 
            SET name = %s, phone = %s, city = %s, street = %s, postal_code = %s, language = %s, theme = %s
            WHERE id = %s
        """, (
            data.get('name'),
            data.get('phone'),
            data.get('city'),
            data.get('street'),
            data.get('postalCode'),
            data.get('language', 'ru'),
            data.get('theme', 'light'),
            user_id
        ))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({'message': 'Profile updated successfully'}), 200
        
    except Exception as e:
        print(f"Error updating profile: {e}")
        return jsonify({'message': 'Failed to update profile'}), 500

@app.route('/api/orders', methods=['GET'])
@jwt_required()
def get_orders():
    try:
        user_id = get_jwt_identity()
        orders = get_user_orders(user_id)
        return jsonify(orders), 200
    except Exception as e:
        print(f"Error fetching orders: {e}")
        return jsonify({'message': 'Failed to fetch orders'}), 500

@app.route('/api/orders', methods=['POST'])
@jwt_required()
def create_order_endpoint():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate order data
        if not data.get('items') or not data.get('totalPrice'):
            return jsonify({'message': 'Order items and total price are required'}), 400
        
        order_id = create_order(user_id, data)
        
        return jsonify({
            'message': 'Order created successfully',
            'orderId': f'ORD-{order_id:03d}'
        }), 201
        
    except Exception as e:
        print(f"Error creating order: {e}")
        return jsonify({'message': 'Failed to create order'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)