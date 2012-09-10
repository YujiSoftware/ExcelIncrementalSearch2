On Error Resume Next
failures = 0
current = Replace(WScript.ScriptFullName, WScript.ScriptName,"")

Set excel = CreateObject("Excel.Application")
excel.Workbooks.Open(current & "..\..\ExcelIncrementalSearch.xla")

ManualSelectRangeTest
AutoSelectRangeTest

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

Sub RangeTest()
	excel.Cells(2, 2).Select
	excel.Run("ExcelIncrementalSearch.xla!SelectRange")
	
	AssertEquals "AutoRangeTest Failed.", "$B$2:$F$10", excel.Selection.Address
End Sub

'------------------------------------

Sub ManualSelectRangeTest()
	excel.Workbooks.Open(current & "search.xlsx")
	
	'ïÅí Ç…îÕàÕëIë
	excel.Range("C4:E6").Select
	excel.Run("ExcelIncrementalSearch.xla!SelectRange")
	
	AssertEquals "ManualSelectRangeTest(Normal) Failed.", "$C$4:$E$6", excel.Selection.Address
	
	'åãçáÇ≥ÇÍÇΩÉZÉãÇä‹Çﬁ
	excel.Range("E8:F10").Select
	excel.Run("ExcelIncrementalSearch.xla!SelectRange")
	
	AssertEquals "ManualSelectRangeTest(MergeCells) Failed.", "$E$8:$F$10", excel.Selection.Address
End Sub

'------------------------------------
Sub AutoSelectRangeTest()
	excel.Workbooks.Open(current & "SelectRange.xlsx")

	For Each oSheet In excel.WorkSheets
		oSheet.Select
		startPosition = oSheet.Cells(1,1).Value
		expected = oSheet.Cells(2, 1).Value
		
		oSheet.Range(startPosition).Select
		excel.Run("ExcelIncrementalSearch.xla!SelectRange")
		
		AssertEquals "AutoSelectRangeTest(" + oSheet.Name + ") Failed.", expected, excel.Selection.Address
	Next
End Sub
