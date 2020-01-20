var main_function = function(initializeObjects){
	console.log("Sub-Script loaded");

	var _this_ = this;
	_this_.preloadcon = initializeObjects.preLoader.preLoadContainer;
	_this_.imgarray = initializeObjects.preLoader.ImgArr;
	_this_.audioList = initializeObjects.preLoader.audioList;
	
	_this_.front_pg =  initializeObjects.front_page;
	_this_.load_frame = initializeObjects.load_frame;
	_this_.datapath = initializeObjects.main_data_Path;
	_this_.html_page_path = initializeObjects.html_Page_Path;
	_this_.page_content = initializeObjects.pg_content;
	_this_.page_data_path = initializeObjects.page_Data_Path;
	_this_.audio_path = initializeObjects.audio_path;
	_this_.currentPageNumber = 0;
	_this_.curTemplateObj="";
	_this_.imgcount = 0;
	
	_this_.start_button = initializeObjects.start.start_btn;
	_this_.next_btn = initializeObjects.next.next_btn;
	_this_.previous_btn = initializeObjects.pre.pre_btn;
	_this_.home_Btn = initializeObjects.home.home_;
	_this_.play_btn = initializeObjects.play_btn;
	_this_.mute_btn = initializeObjects.mute_;
	_this_.audio_state = "playing";
	_this_.audio_state1 = "playing1";
	
	this.init = function(){
		_this_.preloadcon.style.display = "block";
		_this_.load_frame.style.display = "none";
		_this_.front_pg.style.display = "none";
		
		_this_.preload();
	}
	
	this.preload = function(){
		_this_.loadMain_json_data();
		_this_.initImages();
		_this_.initAudio();
	}
	
	this.initImages = function(){
		for(let i=0; i<_this_.imgarray.length;i++){
			var img = new Image();
			img.src = _this_.imgarray[i].src;
			img.addEventListener("load",_this_.imgLoaded,false);
		}
	}
	
	this.imgLoaded = function(){
		_this_.imgcount +=1;
		if(_this_.imgcount == _this_.imgarray.length){
			_this_.preloadcon.style.display = "none";
			_this_.load_frame.style.display = "none";
			_this_.front_pg.style.display = "block";
			console.log("Images Loaded");
		}
	}
	
	this.initAudio = function(){
		var list_au = _this_.audioList;
		var auPath =_this_.audio_path;
		createjs.Sound.alternateExtensions = ["mp3"];
		//createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashAudioPlugin]);
		console.log("Audio : ", _this_.audio_path,list_au);
		
		createjs.Sound.addEventListener("fileload", onAudioLoaded);	
		createjs.Sound.registerSounds(list_au, auPath);		
	}
	
	function onAudioLoaded(event){
		console.log("Audios Load complte");
	}
	
	this.loadMain_json_data = function(){
		console.log("Loading Main Json FIle");
		_this_.dataPath = _this_.datapath;
		
		$.ajax({
			url : _this_.dataPath+"?version="+(new Date()).getTime(),
			dataType : "json",
			type : "get",
			success:function(data){
				load_json_datas(data);},
			error : function(){console.log("Problem occured by connecting json");}
		});
	}

		function load_json_datas(data){
			console.log("Json data is",data);
			_this_.dataa = data.data;
			_this_.pages = _this_.dataa.pages;
			_this_.no_of_page = _this_.dataa.pages.length;
			
			_this_.addEvents();
			_this_.createAudio();
		}
		this.createAudio = function(){
			_this_.audio_ = new Audio();
		}
		
	this.addEvents = function(){

		_this_.start_button.addEventListener("click",function(){onStartBtnClick();});

		_this_.next_btn.addEventListener("click",function(){next_btn_click();});

		_this_.previous_btn.addEventListener("click",function(){pre_btn_click();});

		_this_.home_Btn.addEventListener("click",function(){onHomeClick();});

		_this_.play_btn.addEventListener("click",function(){play_pus();});
		
		_this_.mute_btn.addEventListener("click",function(){mute();});
	}
		function mute(){
			console.log("Mute Button clicked");
			((_this_.audio_state1 == "playing1") ? audio_mute() : audio_unmute());
		}
		
		function audio_mute(){
			_this_.audio_.muted = true;
			_this_.audio_state1 = "playing2";
			_this_.mute_btn.innerHTML = "Unmute";
		}
		
		function audio_unmute(){
			_this_.audio_.muted = false;
			_this_.audio_state1 = "playing1";
			_this_.mute_btn.innerHTML = "Mute";
		}
		
		 function onStartBtnClick(){
			console.log("Start button clicked");
			let pageNo1 = 0;
			load_screen(pageNo1);
			updateNavButtons(pageNo1);
		}
		
		function next_btn_click(){
			console.log("Next Button Clicked");
			let pageNo = _this_.currentPageNumber+=1;
			load_screen(pageNo);
			updateNavButtons(pageNo);
		}
		function pre_btn_click(){
			console.log("Previous Button Clicked");
			let pageNo = _this_.currentPageNumber -=1;
			load_screen(pageNo);
			updateNavButtons(pageNo);
		}
		
		function onHomeClick(){
			console.log("Home Button Clicked");
			_this_.load_frame.style.display = "none";
			_this_.front_pg.style.display = "block";
			_this_.clearAudio();
		}
		
		function play_pus(){
			console.log("Play Button Clicked");
			((_this_.audio_state === "playing") ? audio_pause():audio_play()); 
		}
		function audio_pause(){
			_this_.audio_.pause();
			_this_.audio_state = "paused";
			_this_.play_btn.innerHTML = "Play";
		}
		function audio_play(){
			_this_.audio_.play();
			_this_.audio_state = "playing";
			_this_.play_btn.innerHTML = "Pause";
		}
		
		function load_screen(pageNo){
			_this_.front_pg.style.display = "none";
			_this_.load_frame.style.display = "block";
			//console.log("Page Path",_this_.html_page_path+_this_.pages[pageNo].template_name+".html?version="+(new Date()).getTime());
			_this_.page_content.innerHTML = "";
			
			
			//_this_.page_content.load(_this_.html_page_path+_this_.pages[pageNo].template_name+".html?version="+(new Date()).getTime(),_this_.load_page_datas(pageNo));
			//_this_.page_content.innerHTML = "<object type='text/html' style='width:100%;overflow:hidden;height:100%' data="+_this_.html_page_path+_this_.pages[pageNo].template_name+".html></object>",_this_.load_page_datas(pageNo);

			 var xhttp = new XMLHttpRequest();
			 xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				  _this_.page_content.innerHTML =
				  this.responseText;
				  _this_.load_page_datas(pageNo);
				}
			  };
			 xhttp.open("GET", _this_.html_page_path+_this_.pages[pageNo].template_name+".html", true);
			 xhttp.send();
		}
		
		function updateNavButtons(pageNo){
			console.log("CurrentPageNO : ",pageNo+1);
			console.log("TotalPage : ",_this_.no_of_page);
			let page_ = pageNo+1;
			((page_ == _this_.no_of_page)?disabe_nextBtn():enable_nextBtn());
			((page_ == "1")?disable_preButton():enablePreButton());
			
			function disabe_nextBtn(){
				console.log("disabed_nextBtn");
				_this_.next_btn.disabled = true;
				_this_.next_btn.style.opacity = "0.5";
			}
			function enable_nextBtn(){
				console.log("enabled_nextBtn");
				_this_.next_btn.disabled = false;
				_this_.next_btn.style.opacity = "1";
			}
			function disable_preButton(){
				console.log("disabed_PreBtn");
				_this_.previous_btn.disabled = true;
				_this_.previous_btn.style.opacity = "0.5";
			}
			function enablePreButton(){
				console.log("enabled_PreBtn");
				_this_.previous_btn.disabled  = false;
				_this_.previous_btn.style.opacity = "1";
			}
		}
		

		this.load_page_datas = function(pageNo){
			$.ajax({
				url : _this_.page_data_path+_this_.pages[pageNo].template_name+".json",
				type : "GET",
				cache : false,
				success : _this_.onPageLoadSuccess,
				error : _this_.onLoadError
			});
		}
		this.onPageLoadSuccess = function(data){
			console.log("Page Data is : ",data.data);
			_this_.loadAudio(data);
			_this_.loadPageScript(data);
		}
		this.onLoadError = function(){
			console.log("Error Occured by loading page datas");
		}
		this.loadAudio = function(data){
			_this_.clearAudio();
			console.log("Audio Src : ",_this_.audio_path+data.data.audio_src);
			_this_.audio_.src = _this_.audio_path+data.data.audio_src;
			_this_.audio_.play();
		}
		this.clearAudio = function(){
			_this_.audio_.src = "";
			_this_.audio_.pause();
		}
		
		this.loadPageScript = function(data){
			let screen_ = data.PageName;
			console.log("in switch case",screen_);
			switch(screen_){
				case "page_1":
				console.log("in Page 1 case");
				_this_.curTemplateObj = new page_1(data.data);
				_this_.curTemplateObj.init(_this_);
				break;
				
				case "page2":
				_this_.curTemplateObj = new page_2(data.data);
				_this_.curTemplateObj.init(_this_);
				break;
				
				case "page3":
				_this_.curTemplateObj = new page_3(data.data);
				_this_.curTemplateObj.init(_this_);
				break;
				
				case "page4":
				_this_.curTemplateObj = new page_4(data.data);
				_this_.curTemplateObj.init(_this_);
				break;
				
				default : 
				break;
			}
			//console.log(_this_.curTemplateObj)
			//_this_.curTemplateObj = new window["page_1"](data);
			//_this_.curTemplateObj.init(_this_);
		}
}