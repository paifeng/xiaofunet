<?php
    //壹讯通短信接口
    header("content-type:text/html; charset:utf-8");
    require_once '../messageAPI/message.class.php';
    function send_message($send_tel){
        $word="";
        for ($i=0;$i<6;$i++){
            $num=rand(0,9);
            $word.=$num;
        }
        if (!session_id()) session_start();
        $_SESSION['message_veri']=$word;
        $content="尊敬的会员,您的验证码是:".$word.";请不要把验证码泄露给其他人!【校服网】";
        $message_api=new MessageAPI($send_tel, $content);
        $res=$message_api->sendMessage();
    }
?>