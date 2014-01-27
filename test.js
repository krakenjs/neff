var neff = require("./");
var config = require("nconf");
var assert = require("assert");

config.use("memory");
config.set("features", {
	featureA: true,
	featureB: false
});

// test the basic stuff
assert.ok(neff.isEnabled("featureA"), "feature a should be enabled");
assert.ok(!neff.isEnabled("featureB"), "feature b should not be enbled");

// test the helpers
var req = {};
var res = {locals:{}};
neff.helpers(req, res, function() {
	assert.equal(res.locals.featureClasses, "feature-featureA", "we should have a correct CSS string");
	assert.ok(res.locals['feature-featureA'], "feature a should exist in locals");
	assert.ok(!res.locals['feature-featureB'], "feature b should not exist in locals");
});