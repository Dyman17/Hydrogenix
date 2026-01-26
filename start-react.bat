@echo off
echo ========================================
echo    HydroGenix React - Startup Script
echo ========================================
echo.

echo Starting HydroGenix React application with backend...
echo.

echo 1. Make sure PostgreSQL is running
echo 2. Make sure you have created the database
echo 3. Make sure backend dependencies are installed
echo.

echo Starting backend server...
cd backend
start cmd /k "python app.py"

timeout /t 3 /nobreak >nul

echo Starting frontend development server...
cd ..
npm run dev

echo.
echo ========================================
echo HydroGenix React is now running!
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.