/**
 * 
 */

window.onscroll=function showsearch(){
	myheight=mywindow.getDocHeight();
	myrollheight=mywindow.getRollHeight();
	//window.alert(myheight+"  "+myrollheight);
	if(myrollheight<myheight){
		$("hidden_search_box").style.display="none";
		$("index_return_top").style.display="none";
	}
	if(myrollheight>myheight){
		$("hidden_search_box").style.display="block";
		$("index_return_top").style.display="block";
	}
}
//发送一个当前地址给服务器
function send_url(){
	var url=window.location.href;
	var	myURL="./judge/login.php";
	var myData="father_page="+url;
	OpenAjax_Post(myURL,myData);
}
send_url();