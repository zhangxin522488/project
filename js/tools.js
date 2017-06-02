"use strict";

function $a(id){
    return document.getElementById(id);
}

//已知dom元素，获取它的样式属性
function getStyleAtt(domObj,attributeName){
	var isIE = false;
	if(navigator.userAgent.indexOf("MSIE")>-1){
		isIE = true;
	}

	if(isIE){
		return domObj.currentStyle[attributeName];
	}else{
		var styles = window.getComputedStyle(domObj);
	    return styles[attributeName];
	}	
}

function addEvent(domObj,eventType,fun,isCatch){
	var isIE = (navigator.userAgent.indexOf("MSIE")>-1);
	if(isIE){
		domObj.attachEvent("on"+eventType,fun);
	}else{
		domObj.addEventListener(eventType,fun,isCatch);
		
	}
}