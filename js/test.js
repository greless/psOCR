
var Ocr = function()
{  	

try{
	var cs= new CSInterface();
 	var fs = require("fs");
	var extensionPath= cs.getSystemPath(SystemPath.EXTENSION);
  
	var ocrType=document.getElementById("ocrType"); 
	//var	selectedIndex=ocrType.selectedIndex;
	var check0=document.getElementById("check0");
	var check1=document.getElementById("check1");
	var check2=document.getElementById("check2");
	//	alert(checkSelection.checked)
	// cs.evalScript('alert("'+a+'")');
 
		
		 /* // 持久化运行
		  var event = new CSEvent();//创建一个事件
		  event.type = "com.adobe.PhotoshopPersistent"; //注册持久化运行事件
		  event.scope = "APPLICATION";
		  event.extensionId = cs.getExtensionID(); // 我们的扩展 ID
		  cs.dispatchEvent(event); //发送事件让宿主持久化运行我们的扩展	   
		
		*/
		
	
	  var Path= undefined;
	 var p1 = new Promise(function (resolve, reject) {
		 
	 if(check0.checked)
		cs.evalScript('SaveSelection()',function(result){resolve(result); }); 	 
	else if(check1.checked)
		cs.evalScript('SaveCurrentLayer()',function(result){resolve(result);  }); 	
	else if(check2.checked)
		cs.evalScript('SaveAllLayer()',function(result){resolve(result);  }); 	 
	else	 
		cs.evalScript('SaveAllLayer()',function(result){resolve(result);  }); 	
   
});

var p2 = p1.then(function (result) {
   // alert('成功：' + result);
	Path=result;
	if(result=="undefined" || result==undefined ) 		 
	{	
		alert('失败：' + result);
		return;
	} 
	 
	if(ocrType.selectedIndex==4)
		BaiduAIQRcode(Path,ocrType.selectedIndex);
	else
		BaiduAI(Path,ocrType.selectedIndex);
});
var p3 = p2.catch(function (reason) {
    alert('失败：' + reason);
});
 
	}catch(e){alert(e);}; 
}

function BaiduAI(Path,Index)
{
	try{
	var cs= new CSInterface();
 	var fs = require("fs");
	var AipOcrClient = require("baidu-aip-sdk").ocr;	  
		
	// 设置APPID/AK/SK
	var APP_ID = "17594920";
	var API_KEY = "puMFv72xqCYV2jdcSlXgtFvm";
	var SECRET_KEY = "v5XHtqKXEm0p6ehPZrXIXrftDvocyv1m";

	// 新建一个对象，建议只保存一个对象调用服务接口
	var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
	var HttpClient = require("baidu-aip-sdk").HttpClient;
	  
	// 设置request库的一些参数，例如代理服务地址，超时时间等
	// request参数请参考 https://github.com/request/request#requestoptions-callback
	HttpClient.setRequestOptions({timeout: 5000});

	// 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
	// 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
	// request参数请参考 https://github.com/request/request#requestoptions-callback
	HttpClient.setRequestInterceptor(function(requestOptions) {
		// 查看参数
		console.log(requestOptions)
		// 修改参数
		requestOptions.timeout = 5000;
		// 返回参数
		return requestOptions;
	});

	 var fs = require('fs');
 
	var image = fs.readFileSync(Path).toString("base64");

	// 调用通用文字识别, 图片参数为本地图片	 
	//https://ai.baidu.com/docs#/OCR-Node-SDK/top
	//普通识别：generalBasic；高精度：accurateBasic ;位置：generalUrl；高精度位置：accurate ；二维码：qrcode
	if(Index==0)
		var ocrParam=client.generalBasic(image);
	else if(Index==1)
		var ocrParam=client.accurateBasic(image);
	else if(Index==2)
		var ocrParam=client.generalUrl(image);
	else if(Index==3)
		var ocrParam=client.accurate(image);
	else
		alert("未定义识别模式")

	ocrParam.then(function(result) {		
		 
		 var error=result.error_code;
		 if(error!="undefined" &&error!=undefined ) 		 
			 alert(JSON.stringify(result)); 
		 
		 
		 // 打印识别数据
		  var num=result.words_result_num;
		 for(var i=0;i<num;i++)
		 {
			 var name=result.words_result[i].words;	
			 
			 var location=result.words_result[i].location;
			  if(location!=undefined && location!="undefined")
			  {
				 name=name+" left:"+ location.left+" top:"+ location.top+" width:"+ location.width+" height:"+ location.height+" "
			  }	
			  
			cs.evalScript('addLayerText("'+name+'")');  
			//	写到桌面
			cs.evalScript('WriteData("'+name+'")');  
		 }
		 
	}).catch(function(err) {
		// 如果发生网络错误
		//alert(err,"err");
		alert("网络错误","err");
		//cs.evalScript('alert("'+err+'")');		
	});
	
		}catch(e){alert(e);}; 
}
 
 
 function BaiduAIQRcode(Path,Index)
{
	try{
	var cs= new CSInterface();
 	var fs = require("fs");
	var AipOcrClient = require("baidu-aip-sdk").ocr;	  
		
	// 设置APPID/AK/SK
	var APP_ID = "17594920";
	var API_KEY = "puMFv72xqCYV2jdcSlXgtFvm";
	var SECRET_KEY = "v5XHtqKXEm0p6ehPZrXIXrftDvocyv1m";

	// 新建一个对象，建议只保存一个对象调用服务接口
	var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
	var HttpClient = require("baidu-aip-sdk").HttpClient;
	  
	// 设置request库的一些参数，例如代理服务地址，超时时间等
	// request参数请参考 https://github.com/request/request#requestoptions-callback
	HttpClient.setRequestOptions({timeout: 5000});

	// 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
	// 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
	// request参数请参考 https://github.com/request/request#requestoptions-callback
	HttpClient.setRequestInterceptor(function(requestOptions) {
		// 查看参数
		console.log(requestOptions)
		// 修改参数
		requestOptions.timeout = 5000;
		// 返回参数
		return requestOptions;
	});

	 var fs = require('fs');
 
	var image = fs.readFileSync(Path).toString("base64");

	// 调用通用文字识别, 图片参数为本地图片	 
	//https://ai.baidu.com/docs#/OCR-Node-SDK/top
	//普通识别：generalBasic；高精度：accurateBasic ;位置：generalUrl；高精度位置：accurate ；二维码：qrcode
	client.qrcode(image).then(function(result) {		
		 
		 var error=result.error_code;
		 if(error=="undifined") 
			alert(JSON.stringify(result)); 
		 
		 // 打印识别数据
		  var num=result.codes_result_num;
		 for(var i=0;i<num;i++)
		 {
			 var name=result.codes_result[i].text;	

			cs.evalScript('addLayerText("'+name+'")');  
			//	写到桌面
			cs.evalScript('WriteData("'+name+'")');  
		 }
		 
	}).catch(function(err) {
		// 如果发生网络错误
		//alert(err,"err");
		alert("网络错误","err");
		//cs.evalScript('alert("'+err+'")');			
	});
	
		}catch(e){alert(e);}; 
}
 
 

