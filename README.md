# ImageMagick Dynamic Watermark

Dynamic Watermark is npm watermark module to add watermark over image. It can add image as well as text watermark on given positions. It does great job for adding watermarks.

```
npm install imagemagick-dynamic-watermark
```
### Getting started
First download and install [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/). In Mac OS X, you can simply use [Homebrew](http://mxcl.github.io/homebrew/) and do:

    brew install imagemagick
    brew install graphicsmagick

If you want WebP support with ImageMagick, you must add the WebP option:

    brew install imagemagick --with-webp

After successful installation of imagemagick-dynamic-watermark follow below steps:

### Step 1: include dynamic-watermark package:
```
var watermark = require('gimagemagick-dynamic-watermark');
```

### Step 2: Provide following options:
```
var optionsImageWatermark = {
    type: "image",
    source: "a.png",
    logo: "logo.png", // This is optional if you have provided text Watermark
    destination: "output.png",
    position: {
        logoX : 200,
        logoY : 200,
        logoHeight: 200,
        logoWidth: 200
    }
};

var optionsTextWatermark = {
    type: "text",
    text: "Watermark text", // This is optional if you have provided text Watermark
    destination: "output.png",
    source: "a.png",
    position: {
        logoX : 200,
        logoY : 200,
        logoHeight: 200,
        logoWidth: 200
    },
    textOption: {
        fontSize: 100, //In px default : 20
        color: '#AAF122' // Text color in hex default: #000000
    }
};
```

### Step 3: Final step is to call embed method by passing above options.
```
//optionsImageWatermark or optionsTextWatermark
watermark.embed(optionsImageWatermark, function(status) {
    //Do what you want to do here
    console.log(status);
});
```
this module is base on [Dynamic Watermark](https://github.com/navjotdhanawat/dynamic-watermark) with some fixing
[Open issues](https://github.com/sadeghmohebbi/imagemagick-dynamic-watermark/issues)
