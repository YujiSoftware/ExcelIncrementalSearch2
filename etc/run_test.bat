@echo off

call :SetPid
if DEFINED pid (taskkill /f /pid %pid%)

echo VB�e�X�g�����s���܂��B
pushd vbtest
call test.bat
if errorlevel 1 (
    echo.
    pause
    goto :EOF
)
echo VB�e�X�g�ɐ������܂����B
echo.
popd

wscript CreateHtml.js
echo HTML�t�@�C���𐶐����܂����B

pushd test
    start javaw -jar server.jar
    echo �T�[�o���N�����܂����B
popd

pushd D:\Software\selenium-autoexec-server
    del /q suite\* > nul
    copy %~dp0test\*.html suite > nul
    echo �e�X�g�t�@�C����z�u���܂����B

    call set_classpath.bat
    start java -classpath %SELENIUM_AES_CLASSPATH% com.enjoyxstudy.selenium.autoexec.AutoExecServer startup %~dp0setting.properties
    ping -n 8 localhost > nul
    echo SeleniumAES ���N�����܂����B
    
    echo.
    java -jar selenium-autoexec-client-1.2.jar http://localhost:4444/selenium-server/autoexec/command/
    echo.
    pause

    start java -classpath %SELENIUM_AES_CLASSPATH% com.enjoyxstudy.selenium.autoexec.AutoExecServer shutdown
    echo SeleniumAES ���I�����܂����B
popd

call :SetPid
taskkill /f /pid %pid%
goto :EOF

:SetPid
for /f "tokens=5" %%i in ('netstat -oan ^| findstr "127.0.0.1:80"') do (
    if not defined PID (set PID=%%i)
)
