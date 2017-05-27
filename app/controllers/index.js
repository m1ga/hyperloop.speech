var TiSpeech = require("ti.speech");
TiSpeech.initialize("en_US"); // locale is optional on iOS ti.speech

var win = Ti.UI.createWindow({
	backgroundColor: "#fff",
	layout: "vertical"
});

var btn = Ti.UI.createButton({
	title: "Recognize real-time speech"
});

var lbl = Ti.UI.createLabel({
	text: "press the button",
	color: "#000"
});

if (!TiSpeech.isAvailable()) {
	alert("Speech recognition is not available on this device!");
	btn.setEnabled(false);
}

btn.addEventListener("click", function() {
	lbl.text = "Start talking...";

	TiSpeech.startRecognition({
		type: TiSpeech.SOURCE_TYPE_MICROPHONE, // iOS ti.speech
		progress: function(e) {
			Ti.API.info(e.value);
		},
		success: function(e) {
			Ti.API.info(e.result);
			lbl.text = e.result;
		}
	});
});

if (OS_ANDROID) {
	//win.add(TiSpeech.getView());
	var tf_talk = Ti.UI.createTextField({
		value: "Hyperloop is awesome",
		color: "#000"
	});
	var btn_talk = Ti.UI.createButton({
		title: "Text-to-speech"
	});
	win.add(tf_talk);
	win.add(btn_talk);
	btn_talk.addEventListener("click", function(e) {
		TiSpeech.say(tf_talk.value);
	});
}

win.addEventListener("close", function() {

});
win.add(btn);
win.add(lbl);
win.open();
