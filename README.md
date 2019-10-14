Neff is simple express middleware for handling feature flags.


#### Usage

The standard way to use neff on the client & the server side is to check for enabled features using the `isEnabled()` API.

```javascript
var users = 500;
var moreUsers = neff.isEnabled("moreUsers");
if (moreUsers) {
    users++;
}
```


#### Argument-Based Config

To get started with neff you'll want to make sure you call neff, passing it an object with feature names and either `true` or `false` values. 

```
var neff = require("neff")({
	"feature1": true,
	"feature2": false
});
app.use(neff);
```

#### NConf-Based Config

If you'd like to utilize NConf for this, you can reference an NConf JSON file and my config looks like this:

```json
"features": {
    "feature1": true,
    "feature2": false
}
```


Then pass the config object for the features to neff:

```
var neff = require("neff")(nconf.get('features'));
app.use(neff);
```

#### Accessing in templates


The first thing it allows you to do is access feature flags directly in your template such as (dust syntax):

```
{?feature-feature1}
MY HIDDDEN CODE
{/feature-feature1}

```

#### Express Router Limiter


This route is only available when the feature flag is enabled. Otherwise the user would see a server error page.

```javascript
var neff = require("neff");
app.get("/myhidden/route", neff.limit("feature1"), function(req, res) {
   res.send("You have found feature1!");
});
```

### Client Side Usage


It also provides a string of class names you can insert into your `<body>` (dust syntax):

```html
<body class="{featureClasses}">
```

The output prepends `feature-` to the classname, so you might see something like `<body class="feature-feature1">` with the config above. Only enabled features show up in the string.

Make sure your features are declared on your DOM like so:

```
<body class="feature-feature1 feature-feature2">
```

Once you've done that you can take advantage of the flags in 2 ways.


#### CSS

```css
/* Create a block that's hidden by default */
.my-cool-block {
	display: none;
}

/* Display that block when your flag is present */
.feature-feature1 .my-cool-block {
	display: block;
}
```

#### JavaScript

```javascript
define(["neff"], function(neff) {
	if (neff.isEnabled("feature1")) {
		/* .. */
	}
});
```

### Thanks

Inspired heavily by https://npmjs.org/package/feature-gateway.

