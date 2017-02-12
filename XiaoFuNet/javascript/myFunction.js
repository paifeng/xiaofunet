/**
 * 这里是一些常用的JavaScript函数
 */
//获取元素对象
function $(id){
	return document.getElementById(id);
}
function hoverChangeColor(id,color){
	$(id).style.background=color;
}
//浏览器相关对象
function windowObj(){
	//获取到浏览器的文档高度
	this.getDocHeight=function(){
			var innerheight=window.innerHeight
			if(innerheight==undefined){
				innerheight=document.documentElement.clientHeight;
			} 
			return innerheight;
	}
	//获取到滚动条滚动高度
	this.getRollHeight=function(){
		var pageYOffset=window.pageYOffset;
		if(pageYOffset==undefined){
			pageYOffset=document.documentElement.scrollTop;
		} 
		return pageYOffset;
	}
}
var mywindow=new windowObj();
function pageScroll(){
    //把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数）
    window.scrollBy(0,-100);
    //延时递归调用，模拟滚动向上效果
    scrolldelay = setTimeout('pageScroll()',50);
    //获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    //判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面）
    if(sTop==0) clearTimeout(scrolldelay);
}
//创建Ajax对象引擎
function getXmlHttpRequest(){
	try{
		var xmlHttp=new XMLHttpRequest();
	}catch(err){
		try{
			var xmlHttp=new ActiveXObject("MSxml2.XMLHTTP");
		}catch(err){
			var xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}
xmlHttp=getXmlHttpRequest();
function OpenAjax_Post(myURL,myData,myFunction){        //Ajax请求 
		//构造URL
		var url=myURL;
		//构造请求数据
		var data=myData;
		//window.alert(url+data);
		//创建请求
		xmlHttp.open("POST",url,true);
		//创建回调函数
		xmlHttp.onreadystatechange=myFunction;
		//post请求头
		xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		//发送请求
		xmlHttp.send(data);
}
	//判断用户是否登录了
	function tool_bar(){
		this.tool_islogin=function(){
				//到服务器验证
				var myURL="../judge/login.php";
				var myData="islogin=ok";
				//window.alert(myURL+"  "+myData);
				OpenAjax_Post(myURL,myData,tool.response_message_tool);				
			}
		this.response_message_tool=function (){
			//window.alert('ok');
			if(xmlHttp.readyState==4){
				if(xmlHttp.status==200){
					var message=xmlHttp.responseText;
					var res=eval( "(" + message+ ")" );;
					//window.alert(res.stute);
					//document.write(message);
					switch(res.stute){
						case '1': 
							//func_ok();
							tool_login_ok(res.account)
							return;
						break;
						case '0': 
							tool_login_no()	
							return;
						break;
					}
				}
			}
		}
	}












