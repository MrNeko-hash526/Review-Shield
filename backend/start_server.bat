@echo off
echo Starting Review Shield Backend...
echo.

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Starting Flask server...
echo The server will run on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

python app.py
