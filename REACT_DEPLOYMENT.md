# HydroGenix React - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.8+
- PostgreSQL
- npm or yarn

### 1. Database Setup

1. Install PostgreSQL
2. Create database:
```sql
CREATE DATABASE hydrogenix;
```

3. Run the schema:
```bash
psql -U postgres -d hydrogenix -f database/schema.sql
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Quick Start (Windows)

Double-click `start-react.bat` to start both servers automatically.

## 📁 Project Structure

```
hydrogenix-grow-smarter-main/
├── src/
│   ├── components/
│   │   ├── home/           # Homepage sections
│   │   ├── layout/         # Header/Layout components
│   │   └── ui/             # Reusable UI components
│   ├── contexts/           # React contexts (Cart, Language, Theme)
│   ├── data/               # Static data
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components
│   └── test/               # Test files
├── backend/                # Python Flask backend
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── database/               # Database schema
│   └── schema.sql          # PostgreSQL schema
├── public/                 # Static assets
├── start-react.bat         # Windows startup script
└── README.md               # Project documentation
```

## 🔧 Configuration

### Environment Variables (.env in backend/)
```env
DB_HOST=localhost
DB_NAME=hydrogenix
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET_KEY=your_secret_key
```

## 🌍 Features Integrated

### ✅ Backend Integration
- RESTful API with Flask
- PostgreSQL database
- JWT authentication
- User management
- Product catalog
- Order processing

### ✅ Frontend Features
- React + TypeScript
- Vite development server
- Tailwind CSS styling
- Responsive design
- Context-based state management
- Component-based architecture

### ✅ Removed Components (as requested)
- TeamSection from homepage
- Footer component from layout

## 🎨 Design System

### Colors
- Primary Green: #4CAF50
- Light Green: #8BC34A
- Beige: #F5F5DC
- White: #FFFFFF

### Typography
- Font: Inter (via Google Fonts)
- Responsive sizing with Tailwind

## 🌐 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Products
- `GET /api/products` - Get all products

### User
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order

## 🔒 Security

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation
- Protected routes

## 🚀 Deployment Options

### Frontend (Vercel/Netlify)
1. Build production version: `npm run build`
2. Deploy dist folder to hosting provider

### Backend (Railway/Render)
1. Push backend to GitHub
2. Connect to Railway/Render
3. Set environment variables
4. Deploy

### Database (Supabase)
1. Create Supabase account
2. Create new project
3. Run schema.sql in SQL editor

## 📞 Support

For issues and questions:
- Check console logs for errors
- Verify database connection
- Ensure all environment variables are set
- Check API endpoint accessibility

---
Integrated by combining React frontend with Python Flask backend
Original design preserved with requested modifications