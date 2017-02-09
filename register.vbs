Set objShell = CreateObject("WScript.Shell")

'未インストールの場合、アンインストールでエラーが発生するので、それを無視する
On Error Resume Next

'すでにインストールされている場合、一度アンインストールする
Set excel = WScript.CreateObject("Excel.Application")
excel.Workbooks.Add
excel.Visible = false
excel.AddIns("ExcelIncrementalSearch").Installed = False
excel.Application.Quit

WScript.Sleep 2000
Cleanup

On Error Goto 0
Set excel = WScript.CreateObject("Excel.Application")
excel.Workbooks.Add
excel.Visible = false
excel.AddIns.Add(objShell.CurrentDirectory + "\ExcelIncrementalSearch.xla")
excel.AddIns("ExcelIncrementalSearch").Installed = True
excel.Application.Quit

MsgBox "登録しました。", vbInformation, "Excelインクリメンタルサーチ"

Sub Cleanup()
	'[WMI for VBS] レジストリの値の名前と種類を列挙するサンプルスクリプト: StdRegProv - WMI Sample
	'http://www.wmifun.net/sample/stdregprov_d.html
	
	Dim oClass
	Dim oLocator
	Dim oService
	Dim oRegName
	Dim oRegType
	Dim i
	Dim versions
	Dim version
	Dim subKey
	Const HKEY_CURRENT_USER = &H80000001
	
	versions = Array("11.0", "12.0", "14.0", "15.0", "16.0")
	
    For Each version In versions
    	subKey = "SOFTWARE\Microsoft\Office\" + version + "\Excel\Add-in Manager"
    	
		Set oLocator = WScript.CreateObject("WbemScripting.SWbemLocator")
		Set oService = oLocator.ConnectServer(, "root\default")
		Set oClass = oService.Get("StdRegProv")

		oClass.EnumValues HKEY_CURRENT_USER, subKey, oRegName, oRegType

		If Not IsNull(oRegName) Then
			For i = 0 To Ubound(oRegName)
				If Right(oRegName(i), 26) = "ExcelIncrementalSearch.xla" Then
					oClass.DeleteValue HKEY_CURRENT_USER, subKey, oRegName(i)
				End If
			Next
		End If
    Next
End Sub
