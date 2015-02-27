var neff = require("./");
var assert = require("assert");

// test the helpers
var req = {};
var res = {locals:{}};

// test the factory
var middleware = neff({
	"featureA": false,
	"featureB": true
});
middleware(req, res, function() {
	assert.equal(res.locals.featureClasses, "feature-featureB", "we should have a correct CSS string");
	assert.ok(res.locals['feature-featureB'], "feature b should exist in locals");
	assert.ok(!res.locals['feature-featureA'], "feature a should not exist in locals");
});

// test the basic stuff
assert.ok(neff.isEnabled("featureB"), "feature a should be enabled");
assert.ok(!neff.isEnabled("featureA"), "feature b should not be enbled");
