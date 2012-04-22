Set objShell = CreateObject("WScript.Shell")

Set excel = WScript.CreateObject("Excel.Application")
excel.Workbooks.Add
excel.Visible = false

excel.AddIns.Add(objShell.CurrentDirectory + "\ExcelIncrementalSearch.xla")
excel.AddIns("ExcelIncrementalSearch").Installed = True

excel.Application.Quit

MsgBox "登録しました。", vbInformation, "Excelインクリメンタルサーチ"