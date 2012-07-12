success = True
current = Replace(WScript.ScriptFullName, WScript.ScriptName,"")

Set excel = CreateObject("Excel.Application")
excel.Workbooks.Open(current & "..\..\ExcelIncrementalSearch.xla")
excel.Workbooks.Open(current & "search.xlsx")

AutoRangeTest
ManualRangeTest

excel.DisplayAlerts = false
excel.Quit()

If (success) Then
	WScript.Quit(0)
Else
	WScript.Quit(1)
End If

'------------------------------------

Sub AutoRangeTest()
	excel.Cells(2, 2).Select
	excel.Run("ExcelIncrementalSearch.xla!SelectRange")
	
	If (excel.Selection.Address <> "$B$2:$F$10") Then
		WScript.Echo("AutoRangeTest Failed. [Selection.Address=" & excel.Selection.Address & "]")
		success = False
	End If
End Sub


'------------------------------------

Sub ManualRangeTest()
	excel.Range("C4:E6").Select
	excel.Run("ExcelIncrementalSearch.xla!SelectRange")
	
	if (excel.Selection.Address <> "$C$4:$E$6") Then
		WScript.Echo("ManualRangeTest Failed. [Selection.Address=" & excel.Selection.Address & "]")
		success = False
	End If
End Sub

