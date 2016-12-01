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


function doCanvas() {
    img.onload = function (){
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    }
    console.log('hedgehog img var made');
}

//this adds BLACK text which is bold and in the gotham font. it is filled with the filltext line which has an x and y axis at the end of it.
function addTextLeft() {
    ctx.fillStyle = 'black';
    ctx.font = "bold 26px Gotham Condensed Book";
    ctx.fillText("THIS IS SOME TEXT THAT HOPEFULLY WORKS", 0, 50);
}

function addTextRight() {
    ctx.fillStyle = 'black';
    ctx.font = "bold 26px Gotham Condensed Book";
    ctx.fillText("THIS IS SOME TEXT THAT HOPEFULLY WORKS", img.naturalWidth * 0.7, 50);
}

function addTextBottom() {
    ctx.fillStyle = 'black';
    ctx.font = "bold 26px Gotham Condensed Book";
    ctx.fillText("THIS IS SOME TEXT THAT HOPEFULLY WORKS", 0, 50);
}
//change the image size by changing the img.naturalWidth or img.naturalHeight multiplier in the latter half of the drawImage functions


function Left() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.fillStyle = '#AC85C0';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.naturalWidth * 0.3, img.naturalHeight * 1);
    ctx.globalAlpha=0.3;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.fillStyle = 'black';
    ctx.font = "bold 26px Gotham Condensed Book";
    ctx.fillText("THIS IS SOME TEXT THAT HOPEFULLY WORKS", 0, 50);
}

function updateTextLeft() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);

    ctx.fillStyle = '#AC85C0';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.naturalWidth * 0.3, img.naturalHeight * 1);
    ctx.globalAlpha=0.3;

    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.fillStyle = 'black';
    ctx.font = "bold 26px Gotham Condensed Book";
    var text = document.getElementById('textHtmlLeft').innerHTML;
    ctx.fillText(text, 0, 50);
}

function fitLeft() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, img.naturalWidth * -0.38, 0, img.naturalWidth * 1.3, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 0.8);

    ctx.fillStyle = '#AC85C0';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.naturalWidth * 0.3, img.naturalHeight * 0.8);
}

function htmlChange() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.fillStyle = '#AC85C0';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.naturalWidth * 0.3, img.naturalHeight * 1);
    ctx.globalAlpha=0.3;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.fillStyle = 'black';
    ctx.font = "bold 26px Gotham Condensed Book";
    var text = document.getElementById('buttonHtml').innerHTML;
    document.getElementById('textHtmlLeft').innerHTML = text;
    ctx.fillText(text, img.naturalWidth * 0.02, 50);
}




function Bottom () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.fillStyle = '#AC85C0';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 1, img.naturalWidth * 1, img.naturalHeight * -0.3);
    ctx.globalAlpha=0.3;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
}

function fitBottom () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 0.8, img.naturalHeight * 0.7);
    ctx.fillStyle = '#AC85C0';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 1, img.naturalWidth * 0.8, img.naturalHeight * -0.3);
}

function updateTextBottom() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);

    ctx.fillStyle = '#AC85C0';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.naturalWidth * 0.3, img.naturalHeight * 1);
    ctx.globalAlpha=0.3;

    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.fillStyle = 'black';
    ctx.font = "bold 26px Gotham Condensed Book";
    var text = document.getElementById('textHtmlBottom').innerHTML;
    ctx.fillText(text, 0, 50);
}



function Right() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.fillStyle = '#AC85C0';
    ctx.fillRect(img.naturalWidth * 1, img.naturalHeight * 0, img.naturalWidth * -0.3, img.naturalHeight * 1);
    ctx.globalAlpha=0.3;
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
}

function fitRight() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 0.7, img.naturalHeight * 1);
    ctx.fillStyle = '#AC85C0';
    ctx.fillRect(img.naturalWidth * 1, img.naturalHeight * 0, img.naturalWidth * -0.3, img.naturalHeight * 1);
    ctx.globalAlpha=1;
}

function updateTextRight() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.getElementById('hedgehog');
    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);

    ctx.fillStyle = '#AC85C0';
    ctx.fillRect(img.naturalWidth * 0, img.naturalHeight * 0, img.naturalWidth * 0.3, img.naturalHeight * 1);
    ctx.globalAlpha=0.3;

    ctx.drawImage(img, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1, 0, 0, img.naturalWidth * 1, img.naturalHeight * 1);
    ctx.globalAlpha=1;
    ctx.fillStyle = 'black';
    ctx.font = "bold 26px Gotham Condensed Book";
    var text = document.getElementById('textHtmlRight').innerHTML;
    ctx.fillText(text, 0, 50);
}

document.getElementById('theButton').addEventListener('click', function() {
    htmlChange();
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

document.getElementById('addTextLeft').addEventListener('click', function() {
    addTextLeft();
}, false);

document.getElementById('addTextRight').addEventListener('click', function() {
    addTextRight();
}, false);

document.getElementById('addTextBottom').addEventListener('click', function() {
    addTextBottom();
}, false);

document.getElementById('updateTextLeft').addEventListener('click', function() {
    updateTextLeft();
}, false);

document.getElementById('updateTextRight').addEventListener('click', function() {
    updateTextRight();
}, false);

document.getElementById('updateTextBottom').addEventListener('click', function() {
    updateTextBottom();
}, false);

/**
 * Draw something to canvas
 */
doCanvas();


}//end of EditPhotoController
