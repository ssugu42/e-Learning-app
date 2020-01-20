var page_3 = function(data){
	var currentScreenData = data;

	this.init = function(_this_){
		var _this = _this_;
		console.log("load page script completed and script data is",currentScreenData);
		
		loadImg(_this);
		loadHeaders(currentScreenData);
		loadListLi(currentScreenData);
	}
	function loadImg(_this){
		var currImg = document.getElementById('pageImage');
		console.log(currImg,_this.imgarray[2].src);
		currImg.src = _this.imgarray[2].src;
	}
	function loadHeaders(currentScreenData){
		var hdr =  document.getElementById('page_header'),
			subHdr = document.getElementById('sub_hdr');
		hdr.innerHTML = currentScreenData.page_header;
		subHdr.innerHTML = currentScreenData.sub_header;
	}
	function loadListLi(currentScreenData){
		var li = document.getElementsByClassName('li');
			for(let i=0;i<li.length; i++){
				li[i].innerHTML = currentScreenData.li[i];
			}
	}
}
