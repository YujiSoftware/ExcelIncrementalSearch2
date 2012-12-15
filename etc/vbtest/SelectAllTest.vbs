On Error Resume Next
failures = 0
current = Replace(WScript.ScriptFullName, WScript.ScriptName,"")

Set excel = CreateObject("Excel.Application")
excel.Workbooks.Open(current & "..\..\ExcelIncrementalSearch.xla")

SelectAllTest

if(Err.Number)then
	WScript.Echo Err.Source + ", " + Err.Description
	failures = failures + 1
End If

excel.DisplayAlerts = false
excel.Quit()

WScript.Quit(failures)

'------------------------------------

Sub AssertEquals(message, expected, actual)
	If (expected <> actual) Then
		WScript.Echo(message + " expected:<" + expected + "> but was:<" + actual + ">)")
		failures = failures + 1
	End If
End Sub

'------------------------------------
Sub SelectAllTest()
	excel.Workbooks.Open(current & "SelectAll.xlsx")

	excel.WorkSheets(1).Cells.Select
	actual = excel.Run("ExcelIncrementalSearch.xla!Selected")
	
	AssertEquals "SelectAllTest Failed.", true, actual
End Sub
