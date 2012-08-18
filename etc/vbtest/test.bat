@echo off
setlocal

set FAILURES=0

for /r %%i in (*.vbs) do (
    echo %%~nxi
    cscript %%i //Nologo
    call set /a FAILURES=FAILURES + %%ERRORLEVEL%%
)

echo.
echo Failures: %FAILURES%

exit /b %FAILURES%