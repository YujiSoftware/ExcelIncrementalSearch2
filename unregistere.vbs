Set excel = WScript.CreateObject("Excel.Application")
excel.Workbooks.Add
excel.Visible = false
excel.AddIns("ExcelIncrementalSearch").Installed = False

excel.Application.Quit

MsgBox "�o�^���������܂����B", vbInformation, "Excel�C���N�������^���T�[�`"