nconf & express based based feature flags.

### Server Side Usage

Coming soon....

### Client Side Usage


Make sure your features are declared on your DOM.

```
<body class="feature-your-feature1 feature-your-feature2">
```

Once you've done that you can take advantage of the flags in 2 ways.


**CSS**

```
/* Create a block that's hidden by default */
.my-cool-block {
	display: none;
}

/* Display that block when your flag is present */
.feature-your-feature .my-cool-block {
	display: block;
}
```

**JavaScript**

```
define(["feature"], function(feature) {
	if (feature.isEnabled("your-feature")) {
		/* .. */
	}
});
```

### Thanks

Inspired heavily by https://npmjs.org/package/feature-gateway.

