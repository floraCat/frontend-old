﻿
/*
 * 插件名称：切换卡
 * 监听属性：'data-js-tabs'
 * 简介：多个显隐层选择触发切换
 * 参数说明：
 *   - 'data-js-tabs'的值为多个参数组合的字符串，每个参数用'|'隔开，格式如：param1|param2|param3；
 *   - @param1:触发器组容器（必需）
 *   - @param2:显隐层组容器（必需）
 *   - @param3:切换卡外容器，参数无值时为单个切换卡（可选）
 *   - 所有参数可以是类名如'.clsName'，也可以是属性名如'p'
 * 其他：
 *   - 兼容chorme,firefox,ie
 */


+(function(){

	'use strict';

	//'切换卡'模块
	var modeName="[data-js-tabs]";

	//显示模式
	$.fn.showMode=function(){
		$(this).show();
		return this;
	}
	//隐藏模式
	$.fn.hideMode=function(){
		$(this).hide();
		return this;
	}


	//监听
	$(window).on("load",function(){
		$(modeName).each(function(){
			var $val=$(this).data("js-tabs");
			var $arr=$val.split("|");
			var key=$arr[0];//触发器组容器
			var opts=$arr[1];//显隐层组容器
			var parent=$arr[2]?$arr[2]:'';//切换卡外容器，参数无值时为单个切换卡
			tabs_default($(this),key,opts,parent);
			$(this).on("click",function(ev){
				tabs_click($(this),key,opts,parent,ev);
			});
		});
	});


	//.on对应index的层显示
	var tabs_default=function($this,key,opts,parent){
		var $parent=parent?$this.find(parent):$this;
		$parent.each(function(){
			var cur=$(this).find(key+" .on").index();
			cur=cur>=0?cur:0;
			$(this).find(opts).children().eq(cur).showMode().siblings().hideMode();
		});
	}


	//切换操作 __运用事件委托
	var tabs_click=function($this,key,opts,parent,ev){
		var target=ev.target;
		if(key.indexOf(".")>=0){
			var isKey=$(target).parent().attr("class").indexOf(key.substr(1))>=0?true:false;
		}else{
			var isKey=target.parentNode.nodeName.toLowerCase()==key?true:false;
		}
		if(isKey){
			var $key=$(target);
			if(!$key.hasClass("on")){
				var cur=$key.index();
				var $parent=parent?$key.closest(parent):$this;
				var $target=$parent.find(opts);
				$key.addClass("on").siblings().removeClass("on");
				$target.children().eq(cur).showMode().siblings().hideMode();			
			}
		}	
	}


})();
