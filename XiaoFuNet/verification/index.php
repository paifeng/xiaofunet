<?php

	header("content-type:text/html;   charset:utf-8");
	//创建画布
	$img=imagecreatetruecolor(150,48);
	//创建画布颜色
	$backcolor=imagecolorallocate($img,237,247,255);
	//填充背景色
	imagefill($img,0,0,$backcolor);
	//创建字体颜色
	$textcolor=imagecolorallocate($img,251,126,59);
	$word_arr=parse_ini_file("Font.ini");
	$word="";
	for ($i=0;$i<4;$i++){
		$num=rand(0,35);
		$word.="$word_arr[$num]";		
	}
	session_start();
	$_SESSION['vrification']=$word;
	imagefttext($img,40,rand(0,2),10,50,$textcolor,"sparta.ttf",$word);

	header("content-type:image/png");
	imagepng($img);
	imagedestroy($img);
?>