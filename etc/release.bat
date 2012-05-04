set FILE_NAME=excel_incremental_search2.zip
set LOCAL_PATH=D:\Homepage\vector
set RELEASE_PATH=%LOCAL_PATH%\excel_incremental_search
set URI=ftp://VA049605@hp.vector.co.jp

set LHAPLUS="C:\Program Files\Lhaplus\Lhaplus.exe"
set WINSCP="D:\Software\WinSCP\WinSCP.exe"

del %FILE_NAME%
cd ..\
%LHAPLUS% /c:zip /o:.\ /n:.\etc\%FILE_NAME% .\readme.html .\ExcelIncrementalSearch .\ExcelIncrementalSearch.xla .\register.vbs .\unregistere.vbs
copy .\etc\%FILE_NAME% %RELEASE_PATH%
%WINSCP% %URI% /synchronize %LOCAL_PATH% /

start http://hp.vector.co.jp/authors/VA049605/excel_incremental_search.html
