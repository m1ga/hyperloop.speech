var Speech = require("net.gotev.speech.Speech");
var SpeechDelegate = require("net.gotev.speech.SpeechDelegate");
var SpeechProgressView = require("net.gotev.speech.ui.SpeechProgressView");
var LinearLayout = require("android.widget.LinearLayout");
var Activity = require('android.app.Activity');
var activity = new Activity(Ti.Android.currentActivity);
var speechView = new SpeechProgressView(Ti.Android.currentActivity);
var layout = new LinearLayout(Ti.Android.currentActivity);

var speechDelegate = new SpeechDelegate({
	onStartOfSpeech: function() {
		console.log("Start");
	},
	onSpeechRmsChanged: function(value) {
		console.log("rms: " + value)
	},
	onSpeechPartialResults: function(results) {

	},
	onSpeechResult: function(result) {
		console.log("result: " + result);
		//speechView.stop();
		$.tf.value = result;
	}
});

Speech.init(Ti.Android.currentActivity);
//speechView.stop();
// Speech.getInstance().setStopListeningAfterInactivity(1000);

$.btn0.addEventListener("click", function(e) {
	Speech.getInstance().say($.tf.value);
})

$.btn1.addEventListener("click", function(e) {
	Speech.getInstance().startListening(speechView, speechDelegate);
	//speechView.play();
})
layout.addView(speechView);
$.index.add(layout);
$.index.addEventListener("close",function(e){
	Speech.getInstance().unregisterDelegate();
});
$.index.open();
