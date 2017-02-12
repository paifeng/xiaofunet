<?php
    
    header("content-type:text/html; charset:utf-8");
    //保存一个父页面地址
    if (!empty($_POST['father_page'])){
        if(!session_id()) session_start();
        $_SESSION['father_URL']=$_POST['father_page'];
    }
    require_once '../model/account.php';
    if(!empty($_POST['type']) && $_POST['type']=="login"){
        if(!empty($_POST['ver'])){
            $ver=trim($_POST['ver']);
            if(!session_id()) session_start();
            if($_SESSION['judge_vrification']=="1"){
                unset($_SESSION['judge_vrification']);
                unset($_SESSION['exists']);
                $tel=trim($_POST['tel']);
                $pwd=trim($_POST['pwd']);
                $res=judge_pwd($pwd,$tel);
                if ($res==md5($pwd)){
                    //密码ok
                    if(!empty($_SESSION['father_URL'])){
                        //将登录信息写入session
                        $_SESSION['login']="1";
                        $_SESSION['tel']=$tel;
                        $URL=$_SESSION['father_URL'];
                        echo "<script language=javascript type=text/JavaScript>window.location.href='".$URL."';</script>";
                    }else{
                        echo "<script language=javascript type=text/JavaScript>window.location.href='http://112.74.93.31';</script>";
                    }
                }else{
                    echo "0";
                }
            }else{
                echo "1";
            }
        }else{
            echo "1";
        }
    }
    //判断用户是否登录
    if(!empty($_POST['islogin']) && $_POST['islogin']=="ok"){
        if(!session_id()) session_start();
        //file_put_contents("e:/test.text", $_session['login'].'\r\n',FILE_APPEND);
        if(!empty($_SESSION['login']) && $_SESSION['login']=="1"){
            echo "{'stute':'1','account':'".$_SESSION['tel']."'}";
        }else{
            echo "{'stute':'0'}";
        }
    }