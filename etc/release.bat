set FILE_NAME=excel_incremental_search2.zip
del %FILE_NAME%
cd ..\
"C:\Program Files\Lhaplus\Lhaplus.exe" /c:zip /o:.\ /n:.\etc\%FILE_NAME% .\readme.html .\ExcelIncrementalSearch .\ExcelIncrementalSearch.xla .\register.vbs .\unregistere.vbs
