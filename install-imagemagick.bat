@echo off
echo Installing ImageMagick for SRO Tech icon generation...
echo.

REM Check if Chocolatey is installed
where choco >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Chocolatey not found. Installing Chocolatey first...
    echo.
    
    REM Install Chocolatey
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
    
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install Chocolatey. Please install manually from: https://chocolatey.org/
        pause
        exit /b 1
    )
    
    echo.
    echo Chocolatey installed successfully!
    echo.
)

echo Installing ImageMagick...
choco install imagemagick -y

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ImageMagick installed successfully!
    echo You can now run: generate-icons.bat
    echo.
) else (
    echo.
    echo Failed to install ImageMagick.
    echo Please install manually from: https://imagemagick.org/script/download.php#windows
    echo.
)

pause
