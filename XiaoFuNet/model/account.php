<?php

    require_once '../messageAPI/index.php';
    require_once '../model/account.class.php';
    //检测用户是否存在 
    function judge_user_is_exsist($tel){
        $account=new user();
        $account->account=$tel;
        $res=$account->judge_exists();
        //echo $res;
        return $res;
    }
    //创建用户
    function create_account($tel,$pwd,$sex,$school){
        $account=new user();
        $account->account=$tel;
        $account->password=$pwd;
        $account->sex=$sex;
        $account->school=$school;
        $res=$account->create();
        return $res;       
    }
    //检测用户密码正确性
    function judge_pwd($pwd,$tel){
        $account=new user();
        $account->account=$tel;
        $account->password=$pwd;
        $res=$account->judge_pwd();
        return $res;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    