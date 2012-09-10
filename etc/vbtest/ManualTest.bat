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

if %FAILURES% == 0 (
    color 27
) else (
    color 47
)
pause

exit /b %FAILURES%