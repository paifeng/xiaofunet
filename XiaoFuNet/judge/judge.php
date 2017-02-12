<?php
   
    //验证注册用户的手机号码合法性
    header("content-type:text/html; charset:utf-8");
    require_once '../model/account.php';
    if(!empty($_POST["tel"])){
        $tel=$_POST["tel"];
        if(strlen($tel)==11 && preg_match("/1[3458]{1}\d{9}$/",$tel)){
            //验证通过
            $res=judge_user_is_exsist($tel);
            //echo $res;
            if ($res==0){
                echo "2";
                return;
            }else{
                echo "1";
                //file_put_contents("e:/test.text", $tel,FILE_APPEND);
                if (!session_id()) session_start();
                $_SESSION['exists']="1";
                $_SESSION['tel']=$tel;
                return;
            }
        }else{
            //手机号码格式不对
            echo "0";
            return;
        }
    }
    
    //file_put_contents("e:/test.text", $tel,FILE_APPEND);
    //接收用户的发送短信请求
  
    if(!empty($_POST['send'])){
        if(empty($_SESSION['exists'])){
            if($_POST['send']=="1"){
                //file_put_contents("e:/test.text","OK"."\r\n",FILE_APPEND);
                if (!session_id()) session_start();
                if(!empty($_SESSION['judge_vrification']) && !empty($_SESSION['tel'])){
                   if($_SESSION['judge_vrification']=="1"){
                       $_SESSION["send_tel"]=$_SESSION['tel'];
                       unset($_SESSION['judge_vrification']);
                       unset($_SESSION['exists']);
                       unset($_SESSION['tel']);
                       //echo $_SESSION['vrification'];
                       //send_message($_SESSION["send_tel"]);
                       echo "1";
                       return ;
                   }
                }else{
                   echo "0";
                   return ;
               }
            }
        }else{
            echo "2";
            return;
        }
    }
    //接收手机验证码
    if(!empty($_POST['code'])){
        $code=$_POST['code'];
        if (!session_id()) session_start();
        if($_SESSION['message_veri']==$code){
            unset($_SESSION['message_veri']);
            //file_put_contents("e:/test.text","ok"."\r\n",FILE_APPEND);
            echo "1";
            $_SESSION['judge_code']="1";
            return;
        }else{
            echo "0";
            return;
        }
        //file_put_contents("e:/test.text",$code."\r\n",FILE_APPEND);
    }
    //判断密码是否合法
    if (!empty($_POST['type']) && $_POST['type']=="pwd"){
        //file_put_contents("e:/test.text","ok"."\r\n",FILE_APPEND);
        if (!session_id()) session_start();
        if(!empty($_SESSION['judge_code']) && $_SESSION['judge_code']=="1"){
            $pwd=trim($_POST['pwd']);
            //file_put_contents("e:/test.text",$pwd."\r\n",FILE_APPEND);
            if(strlen($pwd)>6 && strlen($pwd)<16){
                echo "1";
                return;
            }else{
                echo "0";
                return;
            }
        }
    }
    if(!empty($_POST['type']) && $_POST['type']=="finish"){
        if (!session_id()) session_start();
        if(!empty($_SESSION['judge_code']) && $_SESSION['judge_code']=="1"){
        //file_put_contents("e:/test.text","pl1"."\r\n",FILE_APPEND);
            if(!empty($_POST['pwd'])){
                $pwd=$_POST['pwd'];
            }else{
                echo "0";
                return;
            }
            if(strlen($pwd)<6 || strlen($pwd)>16){
                echo "0";
                return;
            }
            if(!empty($_POST['pwd2'])){
                $pwd2=$_POST['pwd2'];
            }else{
                echo "0";
                return;
            }
            if($pwd!=$pwd2){
                echo "0";
                return;
            }
            if(!empty($_POST['sex'])){
                $sex=$_POST['sex'];
            }else{
                echo "0";
                return;
            }
            //file_put_contents("e:/test.text","pl"."\r\n",FILE_APPEND);
            if($sex!='1' && $sex!='0'){
                echo "0";
                return;
            }
            if(!empty($_POST['school'])){
                $school=$_POST['school'];
            }else{
                echo "0";
                return;
            }
            if (!session_id()) session_start();
            $tel=$_SESSION["send_tel"];
            unset($_SESSION['judge_code']);
            $res=create_account($tel,$pwd,$sex,$school);
            //file_put_contents("e:/test.text",$tel.$pwd.$sex.$school."\r\n",FILE_APPEND); 
            if($res==1){
                echo "<script language=javascript type=text/JavaScript>window.location.href='../others/login.html'</script>";
            }          
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    