@echo off
setlocal

cscript SelectRangeTest.vbs //Nologo
if errorlevel 1 (set RESULT=1)

if not defined RESULT (set RESULT=0)

exit /b %RESULT%