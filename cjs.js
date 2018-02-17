// neff - feature flags
// https://github.com/xjamundx/neff

"use strict";

// grab the features off of the <body>
var features = {};

function getFeaturesFromClassNames() {
	var prefix = "feature-";
	var classes = document.body.className.split(/\s/);
	var f = []
	for (var i = 0; i < classes.length; i++) {
		if (classes[i].indexOf(prefix) === 0) {
			f.push(classes[i].replace(prefix, ""))
		}
	}
	return f
}

// a simple API for adding an array of features
function addFeatures(f) {
	for (var i = 0; i < features.length; i++) {
		features[f[i]] = true
	}
}

// a simple API that lets us determine if features are available
// Ex: if (feature.isEnabled("your-feature")) { /* ... */ }
function isEnabled(feature) {
	return features[feature] || false;
}

function init() {
	var classFeatures = getFeaturesFromClassNames()
	addFeatures(classFeatures)
}

module.exports = { init: init, isEnabled: isEnabled, addFeatures: addFeatures };

