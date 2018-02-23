var Speech = require("net.gotev.speech.Speech");
var SpeechDelegate = require("net.gotev.speech.SpeechDelegate");
var TextToSpeechCallback = require("net.gotev.speech.TextToSpeechCallback");
var SpeechProgressView = require("net.gotev.speech.ui.SpeechProgressView");
var LinearLayout = require("android.widget.LinearLayout");
var LayoutParams = require("android.widget.LinearLayout.LayoutParams");
var ViewGroupLayoutParams = require("android.view.ViewGroup.LayoutParams");
var Activity = require('android.app.Activity');
var activity = new Activity(Ti.Android.currentActivity);
var speechView = new SpeechProgressView(Ti.Android.currentActivity);
var layout = new LinearLayout(Ti.Android.currentActivity);

var success = null;
var progress = null;

layout.setLayoutParams(new LayoutParams(ViewGroupLayoutParams.WRAP_CONTENT, ViewGroupLayoutParams.WRAP_CONTENT));
layout.addView(speechView);
speechView.height = 100;
speechView.width = 100;

var speechDelegate = new SpeechDelegate({
	onStartOfSpeech: function() {
		console.log("Start");
	},
	onSpeechRmsChanged: function(value) {
		console.log("rms: " + value)
	},
	onSpeechPartialResults: function(results) {
		if (progress) {
			progress({
				value: results
			})
		}
	},
	onSpeechResult: function(result) {
		if (success) {
			success({
				result: result
			});
		}
	}
});

exports.initialize = function(str) {
	Speech.init(Ti.Android.currentActivity);
}
exports.isAvailable = function() {
	return true;
}
exports.startRecognition = function(opt) {
	success = opt.success;
	progress = opt.progress;
	Speech.getInstance().startListening(speechView, speechDelegate);
}
exports.say = function(txt) {
	Speech.getInstance().say(txt, new TextToSpeechCallback({
		onCompleted:function(){
			console.log("complete")
		}
	}));
}
exports.getView = function() {
	return layout;
}
//speechView.stop();
// Speech.getInstance().setStopListeningAfterInactivity(1000);
