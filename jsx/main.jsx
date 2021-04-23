// 获得缓存路径
 function GetTempPath( )
{ 
    return Folder.temp;    
 }

// 新增图层名称
 function addLayerText(name)
{
     try{
        var docRef = app.activeDocument;  
        var layerRef = docRef.artLayers.add();
        layerRef.name=name;
        }
    catch(e){alert(e)};
 }

// 保存所有图层
 function SaveAllLayer()
{
    try{
        var jpegSaveOptions = new JPEGSaveOptions();  
         var SavePath=File(Folder.myDocuments+"/ai_baidu_temp.jpg");				
        app.activeDocument.saveAs(SavePath,jpegSaveOptions, true,Extension.NONE);
	
        return SavePath.fsName;
        }
    catch(e){alert(e)};
}

// 保存当前选区
 function SaveSelection()
{
     try{
        var SavePath=File(Folder.myDocuments+"/ai_baidu_temp.jpg");		
		var doc=app.activeDocument;
		doc.crop(app.activeDocument.selection.bounds);
		var jpegSaveOptions = new JPEGSaveOptions();  
		doc.saveAs(SavePath,jpegSaveOptions,true,Extension.NONE)
		selectPrevious();
		app.bringToFront();
   return SavePath.fsName;
}catch(e){ alert("请设置一个选区")};

 }

// 保存当前图层
 function SaveCurrentLayer()
{
   
try{   
	var SavePath=File( Folder.myDocuments+"/ai_baidu_temp");
    quick_export_png(SavePath.fsName, true);
    var LayerName= app.activeDocument.activeLayer.name;
    return SavePath.fsName+"\\"+LayerName+".jpg";
}catch(e){ alert(e)};


//quick_export_png(activeDocument.path.fsName, true);

function quick_export_png(path, layer)

    {

    try

        {

        if (layer == undefined) layer = false;    

        var d = new ActionDescriptor();

        var r = new ActionReference();

        r.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));

        d.putReference(stringIDToTypeID("null"), r);
 

        d.putString(stringIDToTypeID("fileType"), "jpg");

         d.putInteger(stringIDToTypeID("quality"), 32);

        d.putInteger(stringIDToTypeID("metadata"), 0);

        d.putString(stringIDToTypeID("destFolder"), path);

        d.putBoolean(stringIDToTypeID("sRGB"), true);

        d.putBoolean(stringIDToTypeID("openWindow"), false);

        executeAction(stringIDToTypeID(layer?"exportSelectionAsFileTypePressed":"exportDocumentAsFileTypePressed"), d, DialogModes.NO);

        }

    catch (e) { throw(e); }

    }
}

 function selectPrevious()
    {
    try {
        var d = new ActionDescriptor();
        var r = new ActionReference();
        r.putEnumerated(stringIDToTypeID("historyState"), stringIDToTypeID("ordinal"), stringIDToTypeID("previous"));
        d.putReference(stringIDToTypeID("null"), r);
        executeAction(stringIDToTypeID("select"), d, DialogModes.NO);
        }
    catch (e) { if (e.number!=8007) { alert("Line: "+e.line+"\n\n"+e,"Bug!",true); throw(e); } }
    }
 
function WriteData(Txt)
{  
	var file = new File(Folder.desktop + "/OCR.txt");  
	 file.open("a", "TEXT",null);  
    //   file.encoding = "UTF8";  
//	file.seek(0,2);  
//	$.os.search(/windows/i)  != -1 ? file.lineFeed = 'windows'  : file.lineFeed = 'macintosh';  
	file.writeln(Txt);  
	file.close();  
} 
