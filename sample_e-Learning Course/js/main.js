window.onload = function(){
		console.log("Main Script Loaded");
		var preLoadContainer = document.getElementById('PreContainer');
		
		var start_button = document.getElementById('start_btn');
		var front_pg = document.getElementsByClassName('front_pg');
		var frame_  = document.getElementsByClassName('frame_1');
		var content_container1 = document.getElementById('content_container');
		//var content_container1 = $('#content_container');
		var nxt = document.getElementById('next');
		var previe = document.getElementById('pre');
		var home_btn = document.getElementById('home_btn');
		var play_pase =document.getElementById('ply_btn');
		var mute_btn = document.getElementById('mute_btn');

var initializeObjects = {
		main_data_Path : "assets/data/main_data.json",
		html_Page_Path : "pages/html/",
		page_Data_Path : "pages/data/",
		audio_path : "assets/media/audio/",
		
		pg_content : content_container1,

		
		front_page : front_pg[0],
		load_frame : frame_[0],
		
		preLoader : {
			preLoadContainer : preLoadContainer,
			ImgArr : imgArray,
			audioList : soundArray
		},
		
		start:{
					start_btn : start_button,
					isRequired : true,
				},
		next : {
					next_btn : nxt,
		},
		pre :{
					pre_btn : previe,
					audio_arr : audio_array
		},
		play_btn : play_pase,
		
		mute_ : mute_btn,
		
		home : {
					home_ : home_btn,
		}
		
}

var trigger  = new main_function(initializeObjects);
trigger.init();
}

