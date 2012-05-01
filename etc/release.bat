set FILE_NAME=excel_incremental_search2.zip
set RELEASE_PATH=D:\Homepage\vector\excel_incremental_search
del %FILE_NAME%
cd ..\
"C:\Program Files\Lhaplus\Lhaplus.exe" /c:zip /o:.\ /n:.\etc\%FILE_NAME% .\readme.html .\ExcelIncrementalSearch .\ExcelIncrementalSearch.xla .\register.vbs .\unregistere.vbs
copy .\etc\%FILE_NAME% %RELEASE_PATH%