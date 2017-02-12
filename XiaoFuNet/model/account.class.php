<?php
    /*  
     *  用户类,完成对会员的增删检查以及判断用户的存在
     */
     require_once '../model/SqlHelper.class.php';
    class user{
        //用户账户
        public $account;
        //用户密码
        public $password;
        //用户性别
        public $sex;
        //所属院校
        public $school;
        //购物车
        public $shopcar;
        //判断一个用户是否已经存在
        public function judge_exists(){
            $sql="select sex from user where account='".$this->account."'";
            $mysqlHelper=new SqlHelper();
            $res=$mysqlHelper->execute_dql2($sql);
            //var_dump($res);
            if (empty($res[0]['sex'])){
                return "1";
            }else{
                return "0";
            }
        }
        //创建用户
        public function create(){
            $sql="insert into user(account,password,sex,school) values('".$this->account."',md5('".$this->password."'),".$this->sex.",'".$this->school."')";
            //echo $sql;
            $mysqlHelper=new SqlHelper();
            $res=$mysqlHelper->execute_dml($sql);
            return $res;
        }
        //验证用户登录密码是否ok
        public function judge_pwd(){
            $sql="select password from user where account='".$this->account."'";
            $mysqlHelper=new SqlHelper();
            $res=$mysqlHelper->execute_dql2($sql);
            return $res[0]['password'];
        }
        
    }