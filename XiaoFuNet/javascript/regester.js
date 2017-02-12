/**
 * 用户注册页面JavaScript
 */
//显示或隐藏注册时的输入框中的信息提示
function ClearAllInput()
{
  for(var i=0;i<document.all.length;i++)
  {
    if(document.all[i].type == "text" || document.all[i].type == "textarea")
    {
      document.all[i].value = "";
    }
  }
}
function RegisterJudge(){
	this.show_notice=function(lable_id,input_id){
		var input_length=$(input_id).value.length;
		//window.alert(input_length);
		if (input_length!=0){
			$(lable_id).style.display="none";
		}else{
			$(lable_id).style.display="block";
		}
	}
}
//初始化验证码
function loadVerification(){
	$("verification").src="../verification/";
}
function Verification(){        //点击换验证码 
	$("verification").src="../verification/?num="+Math.random();
}
loadVerification();
var register_judge=new RegisterJudge();

function Judge(){
	this.tel_notice=function(){
		var tel=$("tel").value;
		if (tel.length!='11'){
			$("notice_one").style.color="#000";
			$("notice_one").innerHTML="请输入您的电话号码";
		}
	}
	this.judge_tel=function (){
			var tel=$("tel").value;
			//window,alert(tel);
			if (tel.length!='11'){
				judge.dealwitherror_tel("！不是有效的手机号码");
				return;
				//window,alert(tel);
			}
			var myRegExp=/^0?1[3|4|5|8][0-9]\d{8}$/gim;
			if(myRegExp.test(tel)){
				//到服务器验证
				var myURL="../judge/judge.php";
				var myData="tel="+tel;
				//window.alert(myURL+"  "+myData);
				OpenAjax_Post(myURL,myData,judge.response_message_tel);				
			}else{
				judge.dealwitherror_tel("！不是有效的手机号码");
				return;
			}
	}
	this.response_message_tel=function (){
		//window.alert('ok');
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){
				var message=xmlHttp.responseText;
				//document.write(message);
				switch(message){
					case '1': 
						$("notice_one").innerHTML="<img src='../images/ok.gif'>";
						return;
					break;
					case '2': 
						judge.dealwitherror_tel("该用户已经存在");
						return;
					break;
					case '0': 
						judge.dealwitherror_tel("！不是有效的手机号码");
					break;
				}
			}
		}
	}
	this.dealwitherror_tel=function (word_notice){	
		$("notice_one").style.color="red";
		$("notice_one").innerHTML=word_notice;
	}
	this.verification_notice=function(){
		$("notice_two").innerHTML="";
	}
	this.judge_vrification=function(){
		var myData=$("verification_input_val").value;
		if (myData.length!='4'){
			judge.dealwitherror_verification();
			return;
		}
		var myRegExp=/^([A-Z0-9]){3}([A-Z0-9])$/gim;
		if(myRegExp.test(myData)){
			//window.alert('ok');
			var myURL="../verification/VerificationControlor.php";
			var myData="verification="+myData;
			//window.alert(myURL+"  "+myData);
			OpenAjax_Post(myURL,myData,judge.response_message_verifition);
		}else{			
			judge.dealwitherror_verification();
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
						judge.dealwitherror_verification();
						return;
					break;
					case '1': 
						$("notice_two").innerHTML="<img src='../images/ok.gif'>";
					break;
				}
			}
		}
	}
	this.dealwitherror_verification=function (){
		$("notice_two").innerHTML="！验证码有误";
		Verification();
		$("verification_input_val").value="";
	}
	//用户提交短信时最后验证
	this.send=function (){
			var URL="../judge/judge.php";
			var Data="send=1";
			//window.alert(myURL+"  "+myData);
			OpenAjax_Post(URL,Data,judge.response_send);
			//回调函数
	}
	this.response_send=function (){
		//window.alert('ok');
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){
				var message=xmlHttp.responseText;
				//document.write(message);
				switch(message){
					case '0': 
						judge.deal_with_error_send();
						return;
					break;
					case '1': 
						$("move_box").style.left="330px";
						$("register_box").style.height="282px";
						$("register_input").style.display="none";
						$("message_judge").style.display="block";
					break;
				}
			}
		}
	}
	this.deal_with_error_send=function(){
		judge.tel_notice();
		$("notice_one").style.color="red";
		Verification();
		$("verification_input_val").value="";
		$("notice_two").innerHTML="请输入验证码";
	}
	//验证手机验证码
	this.send_code=function (){
		//window.alert("ok");
		var URL="../judge/judge.php";
		var Data="code="+$('input_code').value;
		//window.alert(myURL+"  "+myData);
		OpenAjax_Post(URL,Data,judge.send_code_return);
	}
	this.send_code_return=function (){
		//window.alert('ok');
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){
				var message=xmlHttp.responseText;
				//document.write(message);
				switch(message){
					case '0': 
						judge.deal_with_error_send_code();
						return;
					break;
					case '1': 
						$("move_box").style.left="630px";
						$("register_box").style.height="450px";
						$("message_judge").style.display="none";
						$("input_personal_message").style.display="block";
					break;
				}
			}
		}
	}
	this.deal_with_error_send_code=function(){
		$('notice_code').innerHTML="验证码有误请重新输入";
	}
}
var judge=new Judge()
ClearAllInput();

function finish_register(){
	//密码输入提示
	this.notice_pwd=function(){
		//window.alert("ok");
		$("input_personal_message_notice_one").style.color="#000";
		$("input_personal_message_notice_one").innerHTML="6-16位字符";
	}
	//检测密码是都合法
	this.judge_pwd=function (){
		var pwd=$("pwd").value;
		//window,alert(pwd);
		if (pwd.length<6 || pwd.length>16){
			finish_register.dealwitherror_pwd("6-16位的密码哦!");
			return;
			//window,alert(tel);
		}		
			//到服务器验证
			var myURL="../judge/judge.php";
			var myData="type=pwd"+"&pwd="+pwd;
			//window.alert(myURL+"  "+myData);
			OpenAjax_Post(myURL,myData,finish_register.response_message_pwd);
	}
	this.response_message_pwd=function (){
		//window.alert('ok');
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){
				var message=xmlHttp.responseText;
				//document.write(message);
				switch(message){
					case '0': 
						finish_register.dealwitherror_pwd("6-16位的密码哦!");
						return;
					break;
					case '1': 
						$("input_personal_message_notice_one").innerHTML="<img src='../images/ok.gif'>";
					break;
				}
			}
		}
	}
	this.dealwitherror_pwd=function (word_notice){	
		$("input_personal_message_notice_one").style.color="red";
		$("input_personal_message_notice_one").innerHTML=word_notice;
	}
	
	this.checkpwd=function(){
		//window.alert("ok");
		var pwd=$("pwd").value;
		var pwd2=$("judge_pwd").value;
		//window.alert(pwd+"  "+pwd2);
		if (pwd==pwd2){
			$("input_personal_message_notice_two").innerHTML="<img src='../images/ok.gif'>";
		}else{
			$("input_personal_message_notice_two").innerHTML="两次输入密码不一样";
		}
			
	}
	this.clear=function(){
		$("input_personal_message_notice_two").innerHTML="";
	}
	this.finish=function(){
		var pwd=$("pwd").value;
		var pwd2=$("judge_pwd").value;
		if(document.getElementById("man").checked) {
			var sex='1';
		}else{
			var sex='0';
		}
		var school=$("school").value;
		var myURL="../judge/judge.php";
		var myData="type=finish"+"&pwd="+pwd+"&pwd2="+pwd2+"&sex="+sex+"&school="+school;
		//window.alert(myData);
		//window.alert(myURL+"  "+myData);
		OpenAjax_Post(myURL,myData,finish_register.response_finish);
	}
	this.response_finish=function (){
		//window.alert('ok');
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){
				var message=xmlHttp.responseText;
				//document.write(message);
				switch(message){
					case '0': 
						finish_register.dealwitherror_finish();
						return;
					break;
					default :
						document.write(message);
				}
			}
		}
	}
	this.dealwitherror_finish=function (){	
		$("input_personal_message_notice_three").style.color="red";
		$("input_personal_message_notice_three").innerHTML="请完善信息再提交";
	}
}
var finish_register=new finish_register();









