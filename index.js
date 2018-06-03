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

imageMagick.prototype.overlayImage = function(image, resize) {
    return this.gravity(image.gravity)
        .out('(', image.path, ' ', '-resize', resize, ')')
        .out('-composite');
}

function resizeTo(width, height) {
    return width + 'x' + height + '>';
}

var embed = function (options, callback) {

    var source = options.source;   // Source file path
    var logo = options.logo;   // Logo file path
    var ext = source.split('.').pop();
    var destination = options.destination; // Destination file path

    /**
    * Left bottom: X = 10, Y = logoY
    * Right bottom: X = logoX, Y = logoY
    * Left Top: X = 10, Y = 10
    * Right Top: X = logoX, Y = 10
    */

    var position = options.position;   //'right-bottom';
    var type = options.type;    //'text';
    var text = options.text ? options.text : '';
    imageMagick(source).size(function (err, size) {

            if (!err) {
                var logoWidth = (size.width / 10);
                var logoHeight = (size.height / 10);
                // var logoX = size.width - (size.width / 8);
                // var logoY = size.height - (size.height / 8);
                var gravity = "NorthWest";

                if (position) {
                    switch (position) {
                        case 'left-top':
                            gravity = "NorthWest";
                            break;
    
                        case 'left-bottom':
                            gravity = "SouthWest";
                            break;
    
                        case 'right-top':
                            gravity = "NorthEast";
                            break;
    
                        default:
                            gravity = "NorthWest";
                            break;
                    }
                    logoWidth = position.logoWidth;
                    logoHeight = position.logoHeight;
                }

                if (type === 'text') {

                    var textColor = options.textOption ? options.textOption.color : '#000000';
                    var fontSize = options.textOption ? options.textOption.fontSize : 20;

                    imageMagick(source)
                        .fill(textColor)
                        .drawText(logoX, logoY, text)
                        .fontSize(fontSize + 'px')
                        .write(destination, function (e) {
                            console.log(e || 'Text Watermark Done. Path : ' + destination);
                            if (!e) {
                                callback(null, 1);
                            } else {
                                callback(String(e), 0);
                            }
                        });
                } else {
                    imageMagick(source)
                        .overlayImage({gravity: gravity, path: logo}, resizeTo(logoWidth, logoHeight))
                        .write(destination, function (e) {
                        console.log(e || 'Image Watermark Done. Path : ' + destination);
                        if (!e) {
                            callback(null, 1);
                        } else {
                            callback(String(e), 0);
                        }
                    });
                }
            } else {
                callback(String(err), 0);
            }
        });
};

module.exports.embed = embed;
