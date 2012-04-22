Set excel = WScript.CreateObject("Excel.Application")
excel.Workbooks.Add
excel.Visible = false
excel.AddIns("ExcelIncrementalSearch").Installed = False

excel.Application.Quit

MsgBox "登録を解除しました。", vbInformation, "Excelインクリメンタルサーチ"