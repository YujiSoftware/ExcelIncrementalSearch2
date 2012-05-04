try{
    var files = ["search.xlsx", "search %23#.xlsx", "join.xlsx", "join_header.xlsx"];
    
    var objWshShell = new ActiveXObject("WScript.Shell");
    var currentDir = objWshShell.CurrentDirectory;

    var excel = WScript.CreateObject("Excel.Application");
    excel.Visible = true;
    excel.Workbooks.Open(currentDir + "\\..\\..\\" + "ExcelIncrementalSearch.xla");
    
    for(var i = 0, len = files.length; i < len; i++){
        excel.Workbooks.Open(currentDir + "\\" + files[i]);
        excel.Run("ExcelIncrementalSearch.xla!CreateExcelIncrementalSearch");
    }

}finally{
    if(excel){
      // Excel‚ð•Â‚¶‚é
      excel.DisplayAlerts = false 
      excel.Quit();
      excel = null;
    }
}