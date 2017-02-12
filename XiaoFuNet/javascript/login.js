/**
 * 
 */
function login(){

	this.judge_tel=function (){
		var tel=$("tel").value;
		//window,alert(tel);
		if (tel.length!='11'){
			login.dealwitherror_tel_login("！手机号码有误");
			return;
			//window,alert(tel);
		}
		var myRegExp=/^0?1[3|4|5|8][0-9]\d{8}$/gim;
		if(myRegExp.test(tel)){
			//到服务器验证
			var myURL="../judge/judge.php";
			var myData="tel="+tel;
			//window.alert(myURL+"  "+myData);
			OpenAjax_Post(myURL,myData,login.response_message_tel_login);				
		}else{
			login.dealwitherror_tel_login("！不是有效的手机号码");
			return;
		}
	}
	this.response_message_tel_login=function (){
		//window.alert('ok');
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){
				var message=xmlHttp.responseText;
				//document.write(message);
				switch(message){
					case '0': 
						login.dealwitherror_tel_login("！手机号码有误");
						return;
					break;
					case '2': 
						$("notice_one").innerHTML="<img src='../images/ok.gif'>";
						return;
					break;
					case '1': 
						login.dealwitherror_tel_login("！该用户不存在");
					break;
				}
			}
		}
	}
	this.dealwitherror_tel_login=function (word_notice){	
		$("notice_one").style.color="red";
		$("notice_one").innerHTML=word_notice;
	}
	
	//验证验证码
	this.verification_notice=function(){
		$("notice_two").innerHTML="";
	}
	this.login_vrification=function(){
		var myData=$("verification_input_val").value;
		if (myData.length!='4'){
			login.dealwitherror_verification();
			return;
		}
		var myRegExp=/^([A-Z0-9]){3}([A-Z0-9])$/gim;
		if(myRegExp.test(myData)){
			//window.alert('ok');
			var myURL="../verification/VerificationControlor.php";
			var myData="verification="+myData;
			//window.alert(myURL+"  "+myData);
			OpenAjax_Post(myURL,myData,login.response_message_verifition);
		}else{			
			login.dealwitherror_verification();
			return;
		}
	}
	this.response_message_verifition=function (){
		//window.alert('ok');
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){
				var message=xmlHttp.responseText;
				//window.alert(message);
				switch(message){
					case '0': 
						login.dealwitherror_verification();
						return;
					break;
					case '1': 
						$("notice_three").innerHTML="<img src='../images/ok.gif'>";
					break;
				}
			}
		}
	}
	this.dealwitherror_verification=function (){
		$("notice_three").innerHTML="！验证码有误";
		Verification();
		$("verification_input_val").value="";
	}
	//登录
	this.login=function(){
		var tel=$("tel").value;
		var pwd=$("pwd").value;
		var verification=$("verification_input_val").value;
			//window.alert('ok');
		var myURL="../judge/login.php";
		var myData="type=login"+"&tel="+tel+"&pwd="+pwd+"&ver="+verification;
		//window.alert(myURL+"  "+myData);
		OpenAjax_Post(myURL,myData,login.response_login);
	}
	this.response_login=function (){
		//window.alert('ok');
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){
				var message=xmlHttp.responseText;
				//document.write(message);
				switch(message){
					case '0': 
						login.dealwitherror_login();
						return;
					break;
					case '1':
						document.write(message);
				}
			}
		}
	}
	this.dealwitherror_login=function (){
		$("notice_two").innerHTML="密码错误！";
		Verification();
	}
}
var login=new login();