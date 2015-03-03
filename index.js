"use strict";

var _ = require("lodash");
var features = {};

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
	var enabledFeatures = getEnabledFeatures();

	// make the features accessible to the view
	enabledFeatures.forEach(function(feature) {
		res.locals[feature] = true;
	});

	// create a string of CSS that we can append them to our template
	res.locals.featureClasses = enabledFeatures.join(" ");

	next();
}

/**
 * Read the feature list and return true/false
 * Ex: if (feature.isEnabled("your-feature") { ... }
 */
function isEnabled(feature) {
	return features[feature];
}

/**
 * Returns an array of enabled features with the prefix "feature-" prepended
 */
function getEnabledFeatures() {
	var enabled = [];
	for (var name in features) {
		if (features[name]) {
			enabled.push("feature-" + name);
		}
	}
	return enabled;
}

/**
 * Pass in a features object, returns the middleware
 */
module.exports = function neff(options) {
	features = _.extend(features, options);
	return helpers;
}

exports.limit = limit;
exports.isEnabled = isEnabled;
