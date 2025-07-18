@echo off
echo Activating Review Shield Backend Virtual Environment...
call venv\Scripts\activate.bat
echo.
echo Virtual environment activated!
echo.
echo To install dependencies: pip install -r requirements.txt
echo To run the server: python app.py
echo To deactivate: deactivate
echo.
cmd /k
