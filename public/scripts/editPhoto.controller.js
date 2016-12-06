angular.module('BrandImageManagerApp')
       .controller('EditPhotoController', EditPhotoController);

function EditPhotoController(Upload, AccessService, ImageService, $timeout) {

  console.log('PhotoController loaded');
  var photo = this;


  //sets the image src onload based on the image clicked from the gallery.html
  photo.imageSrc = ImageService.image;
  photo.brandSrc = ImageService.brand;
  photo.hexSrc = ImageService.brandColor;
  console.log('HEX SOURCE', photo.hexSrc);
  console.log('photo dot brand source', photo.brandSrc);
  console.log('did the image arrive from gallery', photo.imageSrc);
  photo.canvasSaved = false;

  var hex = photo.hexSrc;

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
        Upload.upload({
            url: '/image/submissions',
            method: 'POST',
            data: {
                originalname : "ryan",
                file: blob,
                deptId: ImageService.deptId,
                userId: AccessService.user.id,
                imageId: ImageService.imageId,
            }
        }).then(function() {
          photo.canvasSaved = true;
          $timeout(function() {
            photo.canvasSaved = false;
          }, 2000);
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
        resizeImage();
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.font = '46px Gotham Condensed Book'
    }
    console.log('hedgehog img var made');
}



function resizeImage() {
    if (img.naturalWidth > img.naturalHeight){
        img.width = 850;
        img.height = 566;
        icon.height = 100;
        icon.width = (100 * (icon.naturalWidth / icon.naturalHeight));
    } else {
        img.width = 650;
        img.height = 850;
        icon.width = 100;
        icon.height = (100 * (icon.naturalHeight / icon.naturalWidth));
    }
}




//all of the left side stuff

function Left() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    resizeImage();

    if (img.naturalWidth > img.naturalHeight){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.fillStyle = hex;
        ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.width * 0.3, img.height * 1);
        ctx.globalAlpha=0.5;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.globalAlpha=1;
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.03, img.height * 0.82, img.width * 0.11, img.height * 0.16);
        ctx.fillStyle = 'white';
        ctx.font = "34px Gotham Condensed Book";
        var text = document.getElementById('buttonHtml').innerHTML;
        wrapText(ctx, text, img.width * 0.035, img.height * 0.1, img.width * 0.2, lineHeight * 0.85);
    } else {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.fillStyle = hex;
        ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.width * 0.3, img.height * 1);
        ctx.globalAlpha=0.5;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.globalAlpha=1;
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.04, img.height * 0.85, icon.width, icon.height);
        ctx.fillStyle = 'white';
        ctx.font = "42px Gotham Condensed Book";
        var text = document.getElementById('buttonHtml').innerHTML;
        wrapText(ctx, text, img.width * 0.035, img.height * 0.1, img.width * 0.24, lineHeight * 0.85);
}
}





function fitLeft() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    resizeImage();

    if (img.naturalWidth > img.naturalHeight){
        canvas.width = img.width * 1;
        canvas.height = img.height * 0.75;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, img.width * 0.25, 0, img.width * 0.75, img.height * 0.75);
        ctx.fillStyle = hex;
        ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.width * 0.25, img.height * 1);
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.03, img.height * 0.58, icon.width * 0.8, icon.height * 0.8);
        ctx.fillStyle = 'white';
        ctx.font = "28px Gotham Condensed Book";
        var text = document.getElementById('buttonHtml').innerHTML;
        wrapText(ctx, text, img.width * 0.02, img.height * 0.08, img.width * 0.23, lineHeight * 0.85);
} else {
        canvas.width = img.width * 1;
        canvas.height = img.height * 0.75;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, img.width * 0.25, 0, img.width * 0.75, img.height * 0.75);
        ctx.fillStyle = hex;
        ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.width * 0.25, img.height * 1);
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.03, img.height * 0.62, icon.width * 0.9, icon.height * 0.9);
        ctx.fillStyle = 'white';
        ctx.font = "28px Gotham Condensed Book";
        var text = document.getElementById('buttonHtml').innerHTML;
        wrapText(ctx, text, img.width * 0.03, img.height * 0.08, img.width * 0.23, lineHeight * 0.85);
}
}








//all of the bottom stuff

function Bottom () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    resizeImage();
    // var text = 'This is an image of some Soldiers in a boat who are about to cross a river.';
    if(img.naturalWidth > img.naturalHeight){
        canvas.width = img.width;
        canvas.height = img.height;
        var text = document.getElementById('buttonHtml').innerHTML;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.fillStyle = hex;
        ctx.fillRect(img.width * 0, img.height * 1, img.width * 1, img.height * -0.3);
        ctx.globalAlpha=0.5;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.globalAlpha=1;
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.03, img.height * 0.76, icon.width, icon.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(img.width * 0.18, img.height * 0.95, img.width * 0.001, img.height * -0.20);
        ctx.font = "34px Gotham Condensed Book";
        // var text = document.getElementById('textHtmlBottom').innerHTML;
        wrapText(ctx, text, img.width * 0.21, img.height * 0.79, img.width * 0.7, lineHeight * 0.83)
    } else {
        canvas.width = img.width;
        canvas.height = img.height;
        var text = document.getElementById('buttonHtml').innerHTML;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.fillStyle = hex;
        ctx.fillRect(img.width * 0, img.height * 1, img.width * 1, img.height * -0.25);
        ctx.globalAlpha=0.5;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.globalAlpha=1;
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.02, img.height * 0.82, icon.width, icon.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(img.width * 0.21, img.height * 0.98, img.width * 0.001, img.height * -0.20);
        ctx.font = "30px Gotham Condensed Book";
        // var text = document.getElementById('textHtmlBottom').innerHTML;
        wrapText(ctx, text, img.width * 0.24, img.height * 0.82, img.width * 0.7, lineHeight * 0.85)
    }
}






// ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 0.75, img.height * 0.75);

function fitBottom() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    resizeImage();
    // var text = 'This is an image of some Soldiers in a boat who are about to cross a river.';
    if (img.naturalWidth > img.naturalHeight){
        canvas.width = img.width * 0.75;
        canvas.height = img.height * 1;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 0.75, img.height * 0.75);
        ctx.fillStyle = hex;
        ctx.fillRect(img.width * 0, img.height * 1, img.width * 0.75, img.height * -0.25);
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.02, img.height * 0.81, icon.width * 0.8, icon.height * 0.8);
        ctx.globalAlpha=1;
        ctx.fillStyle = 'white';
        ctx.fillRect(img.width * 0.13, img.height * 0.97, img.width * 0.001, img.height * -0.19);
        ctx.font = "28px Gotham Condensed Book";
        var text = document.getElementById('buttonHtml').innerHTML;
        wrapText(ctx, text, img.width * 0.15, img.height * 0.82, img.width * 0.55, lineHeight * 0.83)
    } else {
        canvas.width = img.width * 0.75;
        canvas.height = img.height * 1;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 0.75, img.height * 0.75);
        ctx.fillStyle = hex;
        ctx.fillRect(img.width * 0, img.height * 1, img.width * 0.75, img.height * -0.26);
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.03, img.height * 0.82, icon.width * 0.9, icon.height * 0.9);
        ctx.globalAlpha=1;
        ctx.fillStyle = 'white';
        ctx.fillRect(img.width * 0.2, img.height * 0.97, img.width * 0.001, img.height * -0.19);
        ctx.font = "26px Gotham Condensed Book";
        var text = document.getElementById('buttonHtml').innerHTML;
        wrapText(ctx, text, img.width * 0.22, img.height * 0.805, img.width * 0.5, lineHeight * 0.84)
    }
}





//all of the right side stuff


function Right() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var img = document.getElementById('hedgehog');
        var icon = document.getElementById('icon');
        resizeImage();
    if(img.naturalWidth > img.naturalHeight){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.fillStyle = hex;
        ctx.fillRect(img.width * 1, img.naturalHeight * 0, img.width * -0.27, img.height * 1);
        ctx.globalAlpha=0.5;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.globalAlpha=1;
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.86, img.height * 0.82, img.width * 0.11, img.height * 0.16);
        ctx.textAlign="right";
        ctx.fillStyle = 'white';
        ctx.font = "34px Gotham Condensed Book";
        var text = document.getElementById('buttonHtml').innerHTML;
            wrapText(ctx, text, img.width * 0.99, img.height * 0.1, img.width * 0.2, lineHeight * 0.85);
    } else {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.fillStyle = hex;
        ctx.fillRect(img.width * 1, img.naturalHeight * 0, img.width * -0.3, img.height * 1);
        ctx.globalAlpha=0.5;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 1, img.height * 1);
        ctx.globalAlpha=1;
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.8, img.height * 0.85, icon.width, icon.height);
        ctx.textAlign="right";
        ctx.fillStyle = 'white';
        ctx.font = "42px Gotham Condensed Book";
        var text = document.getElementById('buttonHtml').innerHTML;
        wrapText(ctx, text, img.width * 0.99, img.height * 0.1, img.width * 0.2, lineHeight * 0.85);
    }
}




function fitRight() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    var icon = document.getElementById('icon');
    resizeImage();
    if (img.naturalWidth > img.naturalHeight){
        canvas.width = img.width * 1;
        canvas.height = img.height * 0.75;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 0.75, img.height * 0.75);
        ctx.fillStyle = hex;
        ctx.fillRect(img.width * 1, img.height * 0, img.width * -0.25, img.height * 0.75);
        ctx.globalAlpha=1;
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.88, img.height * 0.58, icon.width * 0.8, icon.height * 0.8);
        ctx.textAlign="right";
        ctx.fillStyle = 'white';
        ctx.font = "28px Gotham Condensed Book";
        var text = document.getElementById('buttonHtml').innerHTML;
        wrapText(ctx, text, img.width * 0.99, img.height * 0.081, img.width * 0.23, lineHeight * 0.85);
    } else {
        canvas.width = img.width * 1;
        canvas.height = img.height * 0.75;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.width * 0.75, img.height * 0.75);
        ctx.fillStyle = hex;
        ctx.fillRect(img.width * 1, img.height * 0, img.width * -0.25, img.height * 0.75);
        ctx.globalAlpha=1;
        ctx.drawImage(icon, 0, 0, icon.naturalWidth * 1, icon.naturalHeight * 1, img.width * 0.83, img.height * 0.62, icon.width * 0.9, icon.height * 0.9);
        ctx.textAlign="right";
        ctx.fillStyle = 'white';
        ctx.font = "28px Gotham Condensed Book";
        var text = document.getElementById('buttonHtml').innerHTML;
        wrapText(ctx, text, img.width * 0.98, img.height * 0.081, img.width * 0.23, lineHeight * 0.85);
}
}








//all of the ugly buttons i have created


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


/**
 * Draw something to canvas
 */
doCanvas();


}//end of EditPhotoController
