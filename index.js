"use strict";

var config = require("nconf");

/**
 * A connect middleware to limit access to routes based on flags.
 * Ex: app.get(feature.limit("your-feature"), doSomethingElse);
 */
function limit(feature) {
	return function(req, res, next) {
		if (!isEnabled(feature)) {
			return next(new Error("Not able to access this route."));
		}
		next();
	};
}

/**
 * A connect middleware to add a className string and put features in the view.
 * Ex: app.use(feature.helpers);
 */
function helpers(req, res, next) {
	var features = getEnabledFeatures();

	// make the features accessible to the view
	features.forEach(function(feature) {
		res.locals[feature] = true;
	});

	// create a string of CSS that we can append them to our template
	res.locals.featureClasses = features.join(" ");

	next();
}

/**
 * Read the feature list and return true/false
 * Ex: if (feature.isEnabled("your-feature") { ... }
 */
function isEnabled(feature) {
	return getFeatures()[feature];
}

/**
 * Returns an array of enabled features with the prefix "feature-" prepended
 */
function getEnabledFeatures() {
	var features = getFeatures();
	var enabled = [];
	for (var name in features) {
		if (features[name]) {
			enabled.push("feature-" + name);
		}
	}
	return enabled;
}

/**
 * Parse the features out of the config.
 * @Note this needs to be here, because nconf is not populated immediately
 */
function getFeatures() {
	return config.get("features") || {};
}

/**
 * Export a very basic API.
 */
module.exports = {
	isEnabled: isEnabled,
	helpers: helpers,
	limit: limit
};

