@echo off

call :SetPid
if DEFINED pid (taskkill /f /pid %pid%)

echo VBテストを実行します。
pushd vbtest
call test.bat
if errorlevel 1 (
    echo.
    pause
    goto :EOF
)
echo VBテストに成功しました。
echo.
popd

wscript CreateHtml.js
echo HTMLファイルを生成しました。

pushd test
    start javaw -jar server.jar
    echo サーバを起動しました。
popd

pushd D:\Software\selenium-autoexec-server
    del /q suite\* > nul
    copy %~dp0test\*.html suite > nul
    echo テストファイルを配置しました。

    call set_classpath.bat
    start java -classpath %SELENIUM_AES_CLASSPATH% com.enjoyxstudy.selenium.autoexec.AutoExecServer startup %~dp0setting.properties
    ping -n 8 localhost > nul
    echo SeleniumAES を起動しました。
    
    echo.
    java -jar selenium-autoexec-client-1.2.jar http://localhost:4444/selenium-server/autoexec/command/
    echo.
    pause

    start java -classpath %SELENIUM_AES_CLASSPATH% com.enjoyxstudy.selenium.autoexec.AutoExecServer shutdown
    echo SeleniumAES を終了しました。
popd

call :SetPid
taskkill /f /pid %pid%
goto :EOF

:SetPid
for /f "tokens=5" %%i in ('netstat -oan ^| findstr "127.0.0.1:80"') do (
    if not defined PID (set PID=%%i)
)
