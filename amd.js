// client version.
define([], function() {

	"use strict";

	// grab the features off of the <body>
	var classes = document.body.className.split(/\s/);
	var features = {};
	for (var i = 0; i < classes.length; i++) {
		if (classes[i].indexOf("feature-") === 0) {
			features[classes[i]] = true;
		}
	}

	// return a simple API that lets us determine if features are available
	// Ex: if (feature.isEnabled("your-feature")) { /* ... */ }
	return {
		isEnabled: function(feature) {
			return features[feature];
		}
	};
});