@echo off
echo Installing Review Shield Backend Dependencies...
echo.

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Installing Python packages...
python -m pip install --upgrade pip
python -m pip install flask flask-cors requests beautifulsoup4 selenium webdriver-manager

echo.
echo Installing ML packages (this may take a while)...
python -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
python -m pip install transformers

echo.
echo Installing additional packages...
python -m pip install pandas numpy scikit-learn python-dotenv

echo.
echo Installation complete!
echo.
echo To run the server:
echo 1. Run: activate.bat
echo 2. Run: python app.py
echo.
pause
