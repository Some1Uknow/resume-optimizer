@echo off
REM Script to zip the chrome-extension directory, deleting old zip if it exists

set ZIP_NAME=chrome-extension.zip
set DIR_NAME=chrome-extension

REM Delete old zip if it exists
if exist %ZIP_NAME% del %ZIP_NAME%

REM Create new zip using PowerShell
powershell Compress-Archive -Path %DIR_NAME% -DestinationPath %ZIP_NAME%

echo Zipping complete: %ZIP_NAME%
