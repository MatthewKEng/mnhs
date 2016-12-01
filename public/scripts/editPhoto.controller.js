angular.module('BrandImageManagerApp')
       .controller('EditPhotoController', EditPhotoController);

function EditPhotoController(Upload, AccessService, ImageService) {

  console.log('PhotoController loaded');
  var photo = this;


  //sets the image src onload based on the image clicked from the gallery.html
  photo.imageSrc = ImageService.image;
  console.log('did the image arrive from gallery', photo.imageSrc);


  var canvas = document.getElementById('canvas');
  photo.canvas = document.getElementById('canvas');

  // Uploads Image to S3 if one is selected.  Also sends image url to SQL db
  // with department_id.
    photo.downloadCanvas = function(canvas) {
        canvas = document.getElementById('canvas');

        // link.href = document.getElementById(canvasId).toDataURL();
        // link.download = filename;
        photo.submission = {};
        var theCanvas = canvas.toDataURL();
        console.log('so far so good');
        var blob = Upload.dataUrltoBlob(theCanvas, 'pic.png');
        // var blob = upload.dataUrltoBlob(dataurl, name);
        console.log('blob', blob);
        photo.submission.deptId = 1;
        Upload.upload({
            url: '/image/submissions',
            method: 'POST',
            data: {
                originalname : "ryan",
                file: blob
            }
        });
    }


//canvas and editing controls
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');


/**
 * Demonstrates how to download a canvas an image with a single
 * direct click on a link.
 */
var img = document.getElementById('hedgehog');

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

var maxWidth = 300;
var lineHeight = 40;
var x = 60;
var y = 60;
var text = 'BECOME A MEMBER OF THE MINNESOTA HISTORICAL SOCIETY AND GET THE BEST DEAL IN HISTORY, INCLUDING FREE REGULAR ADMISSION ALL YEAR LONG.';

ctx.font = '42px Gotham Condensed Book'
ctx.fillStyle = '#333';

function doCanvas() {
    img.onload = function (){
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
        ctx.font = '46px Gotham Condensed Book'


    }
    console.log('hedgehog img var made');
}

//this adds BLACK text which is bold and in the gotham font. it is filled with the filltext line which has an x and y axis at the end of it.
// function addTextLeft() {
//     ctx.fillStyle = 'black';
//     ctx.font = "bold 26px Gotham Condensed Book";
//     ctx.fillText("THIS IS SOME TEXT THAT HOPEFULLY WORKS", 0, 50);
// }
//
// function addTextRight() {
//     ctx.fillStyle = 'black';
//     ctx.font = "bold 26px Gotham Condensed Book";
//     ctx.fillText("THIS IS SOME TEXT THAT HOPEFULLY WORKS", img.naturalWidth * 0.7, 50);
// }
//
// function addTextBottom() {
//     ctx.fillStyle = 'black';
//     ctx.font = "bold 26px Gotham Condensed Book";
//     ctx.fillText("THIS IS SOME TEXT THAT HOPEFULLY WORKS", 0, 50);
// }
//change the image size by changing the img.naturalWidth or img.naturalHeight multiplier in the latter half of the drawImage functions


//functions to redraw the canvas for easy use, incomplete and most likely useless for a while.
function redrawCanvasFull() {
    var img = document.getElementById('hedgehog');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.font = '46px Gotham Condensed Book';
    wrapText(ctx, text, img.naturalWidth * 0.015, y, img.naturalWidth * 0.23, lineHeight);
}

function redrawCanvasFit() {
    var img = document.getElementById('hedgehog');
    canvas.width = img.naturalWidth * 0.8;
    canvas.height = img.naturalHeight * 0.8;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 0.8, img.naturalHeight * 0.8);
    ctx.font = '46px Gotham Condensed Book';
    wrapText(ctx, text, img.naturalWidth * 0.015, y, img.naturalWidth * 0.23, lineHeight);
}


//all of the left side stuff


function Left() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    // var text = 'This is an image of some Soldiers in a boat who are about to cross a river.';
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.naturalWidth * 0.3, img.naturalHeight * 1);
    ctx.globalAlpha=0.3;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 0.02, icon.naturalHeight * 0.88, icon.naturalWidth * 0.15, icon.naturalHeight * 0.15);
    ctx.fillStyle = 'black';
    ctx.font = "42px Gotham Condensed Book";
    wrapText(ctx, text, img.naturalWidth * 0.015, y, img.naturalWidth * 0.25, lineHeight)
}

function updateTextLeft() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.naturalWidth * 0.3, img.naturalHeight * 1);
    ctx.globalAlpha=0.3;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 0.02, icon.naturalHeight * 0.88, icon.naturalWidth * 0.15, icon.naturalHeight * 0.15);
    ctx.fillStyle = 'black';
    ctx.font = "normal 42px Gotham Condensed Book";
    var text = document.getElementById('buttonHtml').innerHTML;
    wrapText(ctx, text, img.naturalWidth * 0.015, y, img.naturalWidth * 0.25, lineHeight);
}

function htmlChangeOLeft() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.naturalWidth * 0.3, img.naturalHeight * 1);
    ctx.globalAlpha=0.3;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 0.02, icon.naturalHeight * 0.88, icon.naturalWidth * 0.15, icon.naturalHeight * 0.15);
    ctx.fillStyle = 'black';
    ctx.font = "42px Gotham Condensed Book";
    var text = document.getElementById('buttonHtml').innerHTML;
    document.getElementById('buttonHtml').innerHTML = text;
    wrapText(ctx, text, img.naturalWidth * 0.015, y, img.naturalWidth * 0.25, lineHeight);
}



function fitLeft() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    canvas.width = img.naturalWidth * 1.05;
    canvas.height = img.naturalHeight * 0.75;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, img.naturalWidth * 0.3, 0, img.naturalWidth * 0.75, img.naturalHeight * 0.75);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.naturalWidth * 0.3, img.naturalHeight * 1);
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 0.02, icon.naturalHeight * 0.65, icon.naturalWidth * 0.12, icon.naturalHeight * 0.12);
    ctx.fillStyle = 'black';
    ctx.font = "36px Gotham Condensed Book";
    var text = document.getElementById('buttonHtml').innerHTML;
    wrapText(ctx, text, img.naturalWidth * 0.015, img.naturalHeight * 0.075, img.naturalWidth * 0.25, lineHeight);
}

function updateTextFitLeft() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    canvas.width = img.naturalWidth * 1.05;
    canvas.height = img.naturalHeight * 0.75;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, img.naturalWidth * 0.3, 0, img.naturalWidth * 0.75, img.naturalHeight * 0.75);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.naturalWidth * 0.3, img.naturalHeight * 1);
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 0.02, icon.naturalHeight * 0.65, icon.naturalWidth * 0.12, icon.naturalHeight * 0.12);
    ctx.globalAlpha=1;
    ctx.fillStyle = 'black';
    ctx.font = "36px Gotham Condensed Book";
    var text = document.getElementById('buttonHtml').innerHTML;
    wrapText(ctx, text, img.naturalWidth * 0.015, img.naturalHeight * 0.075, img.naturalWidth * 0.25, lineHeight);
}






//all of the bottom stuff

function Bottom () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    // var text = 'This is an image of some Soldiers in a boat who are about to cross a river.';
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 1, img.naturalWidth * 1, img.naturalHeight * -0.3);
    ctx.globalAlpha=0.3;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 0.02, icon.naturalHeight * 0.84, icon.naturalWidth * 0.15, icon.naturalHeight * 0.15);
    ctx.fillStyle = 'black';
    ctx.font = "42px Gotham Condensed Book";
    // var text = document.getElementById('textHtmlBottom').innerHTML;
    wrapText(ctx, text, img.naturalWidth * 0.19, img.naturalHeight * 0.78, img.naturalWidth * 0.78, lineHeight)
}

function fitBottom() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    // var text = 'This is an image of some Soldiers in a boat who are about to cross a river.';
    canvas.width = img.naturalWidth * 0.75;
    canvas.height = img.naturalHeight * 1;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 0.75, img.naturalHeight * 0.75);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 1, img.naturalWidth * 0.75, img.naturalHeight * -0.25);
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 0.02, icon.naturalHeight * 0.875, icon.naturalWidth * 0.12, icon.naturalHeight * 0.12);
    ctx.globalAlpha=1;
    ctx.fillStyle = 'black';
    ctx.font = "36px Gotham Condensed Book";
    wrapText(ctx, text, img.naturalWidth * 0.1, img.naturalHeight * 0.82, img.naturalWidth * 0.61, lineHeight - 8)
}

function updateTextBottom() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 1, img.naturalWidth * 1, img.naturalHeight * -0.3);
    ctx.globalAlpha=0.3;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 0.02, icon.naturalHeight * 0.84, icon.naturalWidth * 0.15, icon.naturalHeight * 0.15);
    ctx.fillStyle = 'black';
    ctx.font = "42px Gotham Condensed Book";
    var text = document.getElementById('buttonHtml').innerHTML;
    wrapText(ctx, text, img.naturalWidth * 0.19, img.naturalHeight * 0.78, img.naturalWidth * 0.78, lineHeight)
}

function updateTextFitBottom() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    canvas.width = img.naturalWidth * 0.75;
    canvas.height = img.naturalHeight * 1;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 0.75, img.naturalHeight * 0.75);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 1, img.naturalWidth * 0.75, img.naturalHeight * -0.25);
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 0.02, icon.naturalHeight * 0.875, icon.naturalWidth * 0.12, icon.naturalHeight * 0.12);
    ctx.globalAlpha=1;
    ctx.fillStyle = 'black';
    ctx.font = "36px Gotham Condensed Book";
    var text = document.getElementById('buttonHtml').innerHTML;
    wrapText(ctx, text, img.naturalWidth * 0.1, img.naturalHeight * 0.82, img.naturalWidth * 0.61, lineHeight - 8)
}



//all of the right side stuff


function Right() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 1, img.naturalHeight * 0, img.naturalWidth * -0.3, img.naturalHeight * 1);
    ctx.globalAlpha=0.3;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 1.43, icon.naturalHeight * 0.88, icon.naturalWidth * 0.15, icon.naturalHeight * 0.15);
    ctx.textAlign="right";
    ctx.fillStyle = 'black';
    ctx.font = "42px Gotham Condensed Book";
    wrapText(ctx, text, img.naturalWidth * 0.99, y, img.naturalWidth * 0.25, lineHeight);
}


function fitRight() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    canvas.width = img.naturalWidth * 1.05;
    canvas.height = img.naturalHeight * 0.75;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 0.75, img.naturalHeight * 0.75);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 1.05, img.naturalHeight * 0, img.naturalWidth * -0.3, img.naturalHeight * 0.8);
    ctx.globalAlpha=1;
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 1.55, icon.naturalHeight * 0.67, icon.naturalWidth * 0.1, icon.naturalHeight * 0.1);
    ctx.textAlign="right";
    ctx.fillStyle = 'black';
    ctx.font = "36px Gotham Condensed Book";
    wrapText(ctx, text, img.naturalWidth * 1.03, y, img.naturalWidth * 0.26, lineHeight);
}

function updateTextRight() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 1, img.naturalHeight * 0, img.naturalWidth * -0.3, img.naturalHeight * 1);
    ctx.globalAlpha=0.3;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 1.43, icon.naturalHeight * 0.88, icon.naturalWidth * 0.15, icon.naturalHeight * 0.15);
    ctx.textAlign="right";
    ctx.fillStyle = 'black';
    ctx.font = "42px Gotham Condensed Book";
    var text = document.getElementById('buttonHtml').innerHTML;
    wrapText(ctx, text, img.naturalWidth * 0.99, y, img.naturalWidth * 0.25, lineHeight);
}

function updateTextFitRight() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    canvas.width = img.naturalWidth * 1.05;
    canvas.height = img.naturalHeight * 0.75;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 0.75, img.naturalHeight * 0.75);
    ctx.fillStyle = '#47589C';
    ctx.fillRect(img.naturalWidth * 1.05, img.naturalHeight * 0, img.naturalWidth * -0.3, img.naturalHeight * 0.8);
    ctx.globalAlpha=1;
    ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, icon.naturalWidth * 1.55, icon.naturalHeight * 0.67, icon.naturalWidth * 0.1, icon.naturalHeight * 0.1);
    ctx.textAlign="right";
    ctx.fillStyle = 'black';
    ctx.font = "36px Gotham Condensed Book";
    var text = document.getElementById('buttonHtml').innerHTML;
    wrapText(ctx, text, img.naturalWidth * 1.03, y, img.naturalWidth * 0.26, lineHeight);
}




//all of the ugly buttons i have created

document.getElementById('theButton').addEventListener('click', function() {
    htmlChangeOLeft();
}, false);

document.getElementById('Left').addEventListener('click', function() {
    Left();
}, false);

document.getElementById('Right').addEventListener('click', function() {
    Right();
}, false);

document.getElementById('Bottom').addEventListener('click', function() {
    Bottom();
}, false);

document.getElementById('fitLeft').addEventListener('click', function() {
    fitLeft();
}, false);

document.getElementById('fitRight').addEventListener('click', function() {
    fitRight();
}, false);

document.getElementById('fitBottom').addEventListener('click', function() {
    fitBottom();
}, false);

// document.getElementById('addTextLeft').addEventListener('click', function() {
//     addTextLeft();
// }, false);
//
// document.getElementById('addTextRight').addEventListener('click', function() {
//     addTextRight();
// }, false);
//
// document.getElementById('addTextBottom').addEventListener('click', function() {
//     addTextBottom();
// }, false);

document.getElementById('updateTextLeft').addEventListener('click', function() {
    updateTextLeft();
}, false);

document.getElementById('updateTextRight').addEventListener('click', function() {
    updateTextRight();
}, false);

document.getElementById('updateTextBottom').addEventListener('click', function() {
    updateTextBottom();
}, false);

document.getElementById('updateTextFitBottom').addEventListener('click', function(){
    updateTextFitBottom();
}, false);

document.getElementById('updateTextFitLeft').addEventListener('click', function(){
    updateTextFitLeft();
}, false);

document.getElementById('updateTextFitRight').addEventListener('click', function(){
    updateTextFitRight();
}, false);
/**
 * Draw something to canvas
 */
doCanvas();


}//end of EditPhotoController
