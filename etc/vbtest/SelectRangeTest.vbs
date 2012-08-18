failures = 0
current = Replace(WScript.ScriptFullName, WScript.ScriptName,"")

Set excel = CreateObject("Excel.Application")
excel.Workbooks.Open(current & "..\..\ExcelIncrementalSearch.xla")
excel.Workbooks.Open(current & "search.xlsx")

AutoRangeTest
ManualRangeTest

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

Sub AutoRangeTest()
	excel.Cells(2, 2).Select
	excel.Run("ExcelIncrementalSearch.xla!SelectRange")
	
	AssertEquals "AutoRangeTest Failed.", "$B$2:$F$10", excel.Selection.Address
End Sub

'------------------------------------

Sub ManualRangeTest()
	excel.Range("C4:E6").Select
	excel.Run("ExcelIncrementalSearch.xla!SelectRange")
	
	AssertEquals "ManualRangeTest Failed.", "$C$4:$E$6", excel.Selection.Address
End Sub

