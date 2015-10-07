// neff - feature flags
// https://github.com/xjamundx/neff

"use strict";

// grab the features off of the <body>
var prefix = "feature-";
var classes = document.body.className.split(/\s/);
var features = {};
for (var i = 0; i < classes.length; i++) {
	if (classes[i].indexOf(prefix) === 0) {
		features[classes[i].replace(prefix, "")] = true;
	}
}

// return a simple API that lets us determine if features are available
// Ex: if (feature.isEnabled("your-feature")) { /* ... */ }
module.exports = {
	isEnabled: function(feature) {
		return features[feature];
	}
};
