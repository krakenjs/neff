var neff = require("./");
var config = require("nconf");
var assert = require("assert");

config.use("memory");
config.set("features", {
	featureA: true,
	featureB: false
});

assert.ok(neff.isEnabled("featureA"), "feature a should be enabled");
assert.ok(!neff.isEnabled("featureB"), "feature b should not be enbled");
