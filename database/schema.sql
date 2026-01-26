-- HydroGenix Database Schema
-- PostgreSQL

-- Create database
CREATE DATABASE hydrogenix;

-- Connect to database
\c hydrogenix;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    language VARCHAR(10) DEFAULT 'ru' CHECK (language IN ('ru', 'kz', 'en')),
    theme VARCHAR(10) DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
    phone VARCHAR(20),
    city VARCHAR(100),
    street VARCHAR(200),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name_ru VARCHAR(200) NOT NULL,
    name_kz VARCHAR(200) NOT NULL,
    name_en VARCHAR(200) NOT NULL,
    material_ru VARCHAR(100) NOT NULL,
    material_kz VARCHAR(100) NOT NULL,
    material_en VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    weight VARCHAR(50),
    shelf_life VARCHAR(50),
    application VARCHAR(50) CHECK (application IN ('plant', 'agriculture', 'landscape')),
    description_ru TEXT,
    description_kz TEXT,
    description_en TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    city VARCHAR(100),
    street VARCHAR(200),
    postal_code VARCHAR(20),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_application ON products(application);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Insert sample products
INSERT INTO products (name_ru, name_kz, name_en, material_ru, material_kz, material_en, price, weight, shelf_life, application, description_ru, description_kz, description_en) VALUES
('Гидрогель для комнатных растений', 'Бөлме өсімдіктеріне арналған гидрогель', 'Hydrogel for houseplants', 'Натуральный полимер', 'Табиғи полимер', 'Natural polymer', 1500.00, '500г', '3 года', 'plant', 'Идеален для комнатных растений, экономит воду до 50%', 'Бөлме өсімдіктері үшін тамаша, суды 50% дейін үнемдейді', 'Perfect for houseplants, saves up to 50% water'),
('Гидрогель для огорода', 'Бау-бақша үшін гидрогель', 'Garden hydrogel', 'Синтетический полимер', 'Синтетикалық полимер', 'Synthetic polymer', 2500.00, '1кг', '5 лет', 'agriculture', 'Для открытого грунта, долговечный состав', 'Ашық грунт үшін, төзімді құрам', 'For open ground, durable composition'),
('Декоративный гидрогель', 'Декоративті гидрогель', 'Decorative hydrogel', 'Биоразлагаемый материал', 'Биологиялық ыдырайтын материал', 'Biodegradable material', 3000.00, '300г', '2 года', 'landscape', 'Яркие цвета, для декоративных целей', 'Жарқын түстер, декоративті мақсаттар үшін', 'Bright colors, for decorative purposes'),
('Гидрогель для рассады', 'Көшеттер үшін гидрогель', 'Seedling hydrogel', 'Натуральный полимер', 'Табиғи полимер', 'Natural polymer', 1800.00, '400г', '2.5 года', 'plant', 'Отлично подходит для проращивания семян', 'Тұқымдардың өнуі үшін жақсы', 'Great for seed germination'),
('Промышленный гидрогель', 'Өнеркәсіптік гидрогель', 'Industrial hydrogel', 'Синтетический полимер', 'Синтетикалық полимер', 'Synthetic polymer', 4500.00, '2кг', '7 лет', 'agriculture', 'Для крупных сельскохозяйственных предприятий', 'Үлкен ауыл шаруашылық кәсіпорындары үшін', 'For large agricultural enterprises');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();