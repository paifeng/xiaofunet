<?php
    header("content-type:text/html; charset:utf-8");
    class MessageAPI{
        
        //设置请求的账户名
        protected $account="zhanghaifeng";
        //设置请求的账户密码
        protected $password="666666";
        //设置任务名称
        protected $action="send";
        //短信接收者电话号码
        protected $send_tel="";
        //发送的信息
        protected $content="";
        //定时发送          为空表示立即发送
        protected $send_time="";
        //是否启用系统自带签名      Y 加签名   N不加签名不加签名的用户可以自己传入自定义的签名
        //短信格式:【XXX】XXXXXXX（X代表可自定义）注意签名 是黑框【 】70字符/条
        protected $AddSign="";
        //接口URL地址
        protected $url="http://www.smswst.com/api/httpapi.aspx?";
        /*
         * action=send&account=账号&password=密码&mobile=18682126070,18682126071&content=你好,壹讯通【壹讯通】&sendTime=2014-01-04 09:08:10&AddSign=Y
         */
        //构造函数初始化$send_tel与$content
        public function __construct($tel,$con){
            $this->send_tel=$tel;
            $this->content=$con;
        }
        //构造发送短信的接口
        public function sendMessage(){
            $curlPost="action=".$this->action."&account=".$this->account."&password=".$this->password.
            "&mobile=".$this->send_tel."&content=".$this->content."&sendTime=".$this->send_time."&AddSign".$this->AddSign;
            $start = curl_init();//初始化curl
            curl_setopt($start,CURLOPT_URL,$this->url);//抓取指定网页
            curl_setopt($start, CURLOPT_HEADER, 0);//设置header
            curl_setopt($start, CURLOPT_RETURNTRANSFER, 1); //要求结果为字符串且输出到屏幕上
            curl_setopt($start, CURLOPT_FOLLOWLOCATION, 1);  //允许curl提交后,网页重定向
            curl_setopt($start, CURLOPT_POST, 1);//post提交方式
            curl_setopt($start, CURLOPT_POSTFIELDS, $curlPost);
            $data = curl_exec($start);//运行curl
            curl_close($start);
            return $data;//返回结果
        }     
    }