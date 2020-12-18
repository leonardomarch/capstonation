const players = {}

function onYouTubeIframeAPIReady() {
	$(".yt_player").each(function () {
		const player = $(this)

		players[player.data("id")] = new YT.Player(player[0], {
			height: '390',
			width: '640',
			videoId: player.data("id"),
			//videoId: videoObj.data(“id”),
			playerVars: {
				controls: 0,
				autoplay: 1,
				disablekb: 1,
				enablejsapi: 1,
				iv_load_policy: 3,
				modestbranding: 1,
				showinfo: 0,
				mute: 0,
				playsinline: 1,
				rel: 1,
				loop: 1,
			},

			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			},
		});
	});
}

function onPlayerReady(event) {
	console.log(event);
	console.log("The player is ready");
}

function onPlayerStateChange(event) {
	console.log("The player has changed");
}


// control for video players //
$("body").on("click", ".fa-play", function (e) {
	e.preventDefault();

	const this_play_button = $(this);
	const this_controls = this_play_button.closest(".controls");
	const player_id = this_controls.data("id");

	players[player_id].playVideo();
	players[player_id].unMute();

});

$("body").on("click", ".fa-pause", function (e) {
	e.preventDefault();

	const this_play_button = $(this);
	const this_controls = this_play_button.closest(".controls");
	const player_id = this_controls.data("id");

	players[player_id].pauseVideo()


});

$("body").on("click", ".fa-volume-off", function (e) {
	e.preventDefault();

	const this_play_button = $(this);
	const this_controls = this_play_button.closest(".controls");
	const player_id = this_controls.data("id");

	players[player_id].mute()


});

//java for apperaring ig videos and photos

$(() => {
	$("div[data-id]").each(function () {
		const $this_div = $(this);
		const $this_video = $this_div.find("video");

		new Watch($this_div, { threshold: .90 }).inView(() => {

			$this_video.addClass("active");
			console.log("Im alive")
		}).outView(() => {
			$this_video.removeClass("active");
			console.log("Nah, JK")
		});
	});
});

//image change

$(() => {
	$("p[data-id]").each(function () {
		const $this_paragraph = $(this);
		const id = $this_paragraph.data("id");
		const $img = $(`img[id='${id}']`);

		new Watch($this_paragraph).inView(() => {
			$("img.active").removeClass("active");
			$img.addClass("active");
		});
	});
});