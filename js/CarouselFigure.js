// JavaScript Document
"use strict";
function Banner(json){
	this.boxId=json.boxId;
	this.imgArr=json.imgArr;
	this.width=json.width;
	this.height=json.height;
	this.inOutTime=json.inOutTime;
	this.pauseTime=json.pauseTime;
	this.btnWidth=json.btnWidth;
	this.btnHeight=json.btnHeight;
	this.btnSpace=json.btnSpace;
	this.btnColor=json.btnColor;
	this.btnHighColor=json.btnHighColor;
	this.bigBtnWidth=json.bigBtnWidth;
	this.bigBtnHeight=json.bigBtnHeight;
	this.bigBtnColor=json.bigBtnColor;
	this.bigBtnFontColor=json.bigBtnFontColor;
	this.btnTop=this.height-this.btnHeight-2*this.btnSpace;
	this.btnLeft=(this.width-(this.btnWidth+this.btnSpace)*this.imgArr.length-this.btnSpace)/2;
	this.bigBtnTop=(this.height-this.bigBtnHeight)/2;
	this.bigBtnLeft=2*this.btnSpace;
	this.bigBtnRight=2*this.btnSpace;
	this.bigBtnFontSize=this.bigBtnHeight-this.btnSpace;
	this.inOrd=1;
	this.outOrd=1;
	this.distance=this.width;
	this.inLeft=this.width;
	this.outLeft=0;
	this.increment=5;
	this.imgTime=null;
	this.bannerTime=null;
	if(typeof this.initUI!="function"){
		Banner.prototype.initUI=function(){
			$a(this.boxId).style.cssText="position:relative;height:"+this.height+"px;width:"+this.width+"px;overflow:hidden"
			for(var i=0;i<this.imgArr.length;++i){
				var imgObj=document.createElement('img');
				imgObj.src=this.imgArr[i];
				imgObj.style.cssText="position:absolute;height:"+this.height+"px;width:"+this.width+"px;left:-100%";
				$a(this.boxId).appendChild(imgObj)
			}
			$a(this.boxId).children[this.outOrd-1].style.left=0+"px";
			var listObj=document.createElement('ul');
			listObj.style.cssText="position:absolute;top:"+this.btnTop+"px;left:"+this.btnLeft+"px;z-index:10;padding:0";
			$a(this.boxId).appendChild(listObj);;
			for(var i=0;i<this.imgArr.length;++i){
				var liObj=document.createElement('li');
				liObj.style.cssText="list-style:none;float:left;height:"+this.btnHeight+"px;width:"+this.btnWidth+"px;background:"+this.btnColor+";margin-left:"+this.btnSpace+"px;border-radius:50%";
				$a(this.boxId).children[this.imgArr.length].appendChild(liObj)				
			}
			$a(this.boxId).children[this.imgArr.length].children[this.inOrd-1].style.backgroundColor=this.btnHighColor;
			var inputObj=document.createElement('input');
			inputObj.type="button";
			inputObj.style.cssText="position:absolute;height:"+this.bigBtnHeight+"px;width:"+this.bigBtnWidth+"px;background:"+this.bigBtnColor+";left:"+this.bigBtnLeft+"px;top:"+this.bigBtnTop+"px;color:"+this.bigBtnFontColor+";line-height:"+this.bigBtnHeight+"px;font-size:"+this.bigBtnFontSize+"px;border-radius:5%;z-index:10;opacity:.3;outline:none;text-aglin:center;display:none";
			inputObj.value="\<";
			$a(this.boxId).appendChild(inputObj);
			inputObj=document.createElement('input');
			inputObj.type="button";
			inputObj.style.cssText="position:absolute;height:"+this.bigBtnHeight+"px;width:"+this.bigBtnWidth+"px;background:"+this.bigBtnColor+";right:"+this.bigBtnRight+"px;top:"+this.bigBtnTop+"px;color:"+this.bigBtnFontColor+";line-height:"+this.bigBtnHeight+"px;font-size:"+this.bigBtnFontSize+"px;border-radius:5%;z-index:10;opacity:.3;outline:none;text-aglin:center;display:none";
			inputObj.value="\>";
			$a(this.boxId).appendChild(inputObj);
		}
		Banner.prototype.autoPlay=function(){
			this.inOrd++;
			this.outOrd=this.inOrd-1;
			this.check();
			this.inOutInit();
			this.imgTime=setInterval(this.inOut.bind(this),this.inOutTime*this.increment/this.width);
		}
		Banner.prototype.check=function(){
			if(this.inOrd>this.imgArr.length){
				this.inOrd=1
			}
			if(this.inOrd<1){
				this.inOrd=this.imgArr.length
			}
			if(this.outOrd>this.imgArr.length){
				this.outOrd=1
			}
			if(this.outOrd<1){
				this.outOrd=this.imgArr.length
			}
		}
		Banner.prototype.inOutInit=function(){
			this.distance=this.width;
			for(var i=0;i<this.imgArr.length;++i){
				$a(this.boxId).children[this.imgArr.length].children[i].style.backgroundColor=this.btnColor;
			}
			$a(this.boxId).children[this.imgArr.length].children[this.inOrd-1].style.backgroundColor=this.btnHighColor;
			for(var i=0;i<this.imgArr.length;++i){
				$a(this.boxId).children[i].style.left="-100%";
			}
			$a(this.boxId).children[this.inOrd-1].style.left=this.width+"px";
			$a(this.boxId).children[this.outOrd-1].style.left=0+"px";
		}
		Banner.prototype.inOut=function(){
			this.distance-=this.increment;
			if(this.outOrd==this.inOrd){
				clearInterval(this.imgTime);
				return;
			}
			if(this.distance<=0){
				this.distance=0;
				clearInterval(this.imgTime);
			}
			$a(this.boxId).children[this.outOrd-1].style.left=this.distance-this.width+"px";
			$a(this.boxId).children[this.inOrd-1].style.left=this.distance+"px";
			//inOrd和outOrd是同一张，里因为都是操作同一个元素节点inOutInit函数里最后的$a(this.boxId).children[this.outOrd-1].style.left会覆盖前边的
			//inOutInit不能放这里因为每次调用inOut都会初始化
		}
		Banner.prototype.goImg=function(ord){
			this.inOrd=ord;
			this.check();
			this.inOutInit();
			clearInterval(this.imgTime);
			this.imgTime=setInterval(this.inOut.bind(this),this.width/this.inOutTime);
		}
		Banner.prototype.nextImg=function(){
			this.inOrd++;
			this.outOrd=this.inOrd-1;
			this.check();
			this.inOutInit();
			clearInterval(this.imgTime);
			this.imgTime=setInterval(this.inOut.bind(this),this.width/this.inOutTime);
		}
		Banner.prototype.previousImg=function(){
			this.inOrd--;
			this.outOrd=this.inOrd+1;
			this.check();
			this.inOutInit();
			clearInterval(this.imgTime);
			this.imgTime=setInterval(this.inOut.bind(this),this.width/this.inOutTime);
		}
		Banner.prototype.bannerAddEvent=function(){
			var that=this;
			var list=$a(this.boxId).children[this.imgArr.length].children;
			for(var i=0;i<this.imgArr.length;++i){
				list[i].index=i+1;
				list[i].onmousedown=function(){
					that.goImg(this.index);
					//注意此时this指向被点击的点点，换成list[i]可不行因为触发事件早就跳出循环,i就是this.imgArr.length了
				}
			}
			$a(that.boxId).children[that.imgArr.length+1].onclick=function(){
				that.previousImg();
			}
			$a(that.boxId).children[that.imgArr.length+2].onclick=function(){
				that.nextImg();
			}
			addEvent($a(this.boxId),"mouseover",function(){
				clearInterval(that.bannerTime);
				$a(that.boxId).children[that.imgArr.length+1].style.display="block";
				$a(that.boxId).children[that.imgArr.length+2].style.display="block";
			},false)
			addEvent($a(this.boxId),"mouseout",function(){
				that.bannerTime=setInterval(that.autoPlay.bind(that),that.inOutTime+that.pauseTime);
				$a(that.boxId).children[that.imgArr.length+1].style.display="none";
			    $a(that.boxId).children[that.imgArr.length+2].style.display="none";
				//这里的that指向new出来实例对象
			},false)					
		}
		Banner.prototype.startMove=function(){
			this.bannerTime=setInterval(this.autoPlay.bind(this),this.inOutTime+this.pauseTime);
		}
	}
	
	
	
	
	
	
	
	this.initUI();
	this.bannerAddEvent();
	this.startMove();
}