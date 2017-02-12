<?php
	header("content-type:text/html;   charset:utf-8");
	if(!empty($_POST['verification'])){
		$verification_val=$_POST['verification'];
	}
	if (!session_id()) session_start();
	if(strtoupper($verification_val)==$_SESSION['vrification']){
		echo "1";
		unset($_SESSION['vrification']);
		$_SESSION['judge_vrification']="1";
	}else{
		echo "0";
	}
?>