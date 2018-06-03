/**
 * imagemagick-dynamic-watermark
 *
 *
 * Copyright (c) 2017 Sadegh Mohebbi
 * Licensed under the MIT license.
 */

/**
 * ImageMagick Dynamic Watermark is npm watermark module to add watermark over image.
 * It can add image as well as text watermark on given positions.
 * @param  {options}
 * @return {callback}
 */


const gm = require('gm');
const imageMagick = gm.subClass({imageMagick: true});

imageMagick.prototype.cropOnAspect = function(gravity, width, height) {
    return this.gravity(gravity)
        .crop(width, height);
}

imageMagick.prototype.overlayImage = function(logo, gravity, resize) {
    return this.gravity(gravity)
        .out('(', logo, ' ', '-resize', resize, ')')
        .out('-composite');
}

function resizeTo(width, height) {
    return width + 'x' + height + '>';
}

var apply = function (options, callback) {

    var source = options.source;   // Source file path
    var destination = options.destination; // Destination file path

    var type = options.type;//watermark, crop, crop_watermark
    
    if (source && destination && type) {
        if (type == "watermark") {
            var watermark_params = options.watermark;
            /*
            watermark: {
                logo: String -> logo file path
                gravity: String -> NorthWest | North | NorthEast | West | Center | East | SouthWest| South | SouthEast,
                logoWidth: Number,
                logoHeight: Number
            } 
             */
            imageMagick(source)
                .overlayImage(watermark_params.logo, watermark_params.gravity, resizeTo(watermark_params.logoWidth, watermark_params.logoHeight))
                .write(destination, function (e) {
                    console.log(e || 'Done. Path : ' + destination);
                    callback(null, true);
                });
        } else if (type == "crop") {
            /*
             crop: {
                 gravity: String -> NorthWest | North | NorthEast | West | Center | East | SouthWest| South | SouthEast,
                 width: Number,
                 height: Number
             } 
             */
            var crop_params = options.crop;
            imageMagick(source)
                .cropOnAspect(crop_params.gravity, crop_params.width, crop_params.height)
                .write(destination, function (e) {
                    console.log(e || 'Done. Path : ' + destination);
                    callback(null, true);
                });
        } else if (type == "crop_watermark") {
            var watermark_params = options.watermark;
            var crop_params = options.crop;
            imageMagick(source)
                .cropOnAspect(crop_params.gravity, crop_params.width, crop_params.height)
                .overlayImage(watermark_params.logo, watermark_params.gravity, resizeTo(watermark_params.logoWidth, watermark_params.logoHeight))
                .write(destination, function (e) {
                    console.log(e || 'Done. Path : ' + destination);
                    callback(null, true);
                });
        }
    } else {
        callback("source is "+source+", logo is "+logo+", destination is "+destination+", type is "+type, false);
    }
};

module.exports.apply = apply;
