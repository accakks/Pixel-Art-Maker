$("#sizePicker").submit(function(event) {
    event.preventDefault();
    height = $("#inputHeight").val();
    width = $("#inputWidth").val();

    makeGrid(height, width);

});

function makeGrid(height, width) {
    // clears any previously created table
    $("tr").remove();

    //selects height & width to create grid
    for (var i = 1; i <= height; i++) {
        $("#pixelBoard").append("<tr id=table" + i + "></tr>");
        for (var j = 1; j <= width; j++) {
            $("#table" + i).append("<td style = \"background-color:white\" ></td>"); //need to add trasparency here 
            //and manage alpha in final image also
        }
    }
    //uses color to draw on cell(s)
    $("td").click(function addcolor() {
        color = $("#colorPicker").val();

        if ($(this).attr("style")) {
            $(this).removeAttr("style")
        } else {
            $(this).attr("style", "background-color:" + color);
        }
    });

    // draws by drag & drop
    $("#pixelBoard").on("mousedown", "td", function() {
        //event.preventDefault();
        mouseDrag = true;
    });

    $("#pixelBoard").on("mousemove", "td", function() {
        color = $("#colorPicker").val();
        if (mouseDrag) {
            $(this).css("background-color", color);
        }
    });
    $("#pixelBoard").on("mouseup mouseleave dragstart", function() {
        mouseDrag = false;
    });

    // erases canvas
    $("#erase").click(function eraseTable() {
        $("tr").remove();
    });

    //erases drawing when you click clear
    $("#clear").click(function eraseTable() {
        $("td").removeAttr("style");
    });

    //To show pic and also to download it 
    $("#export").click(function showPic() {
        makeImg(width, height);
    });
}

//setting up values of r g and b 
function setPixel(imageData, x, y, r, g, b, a) {

    var index = (x + y * imageData.width);
    imageData.data[index * 4 + 0] = r;
    imageData.data[index * 4 + 1] = g;
    imageData.data[index * 4 + 2] = b;
    imageData.data[index * 4 + 3] = a;
}

//obtaining colour information from table and storing in an array
function getPixel(width, height) {
    var pixelArray = new Array(height * width);
    var i = 0;
    $("#pixelBoard td").each(function() {
        pixelArray[i] = $(this).css("background-color");
        i++;
    });
    return pixelArray;
}
//to get RGB values in an array
//https://stackoverflow.com/questions/34980574/how-to-extract-color-values-from-rgb-string-in-javascript
function getRGB(str) {
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return match ? [match[1], match[2], match[3]] : [];
}

//function that does stuffs 
function makeImg(width, height) {
    var canvas = document.createElement('canvas');
    canvas.id = "thecanvas";
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    var imageData = canvas.getContext("2d").createImageData(canvas.clientWidth, canvas.clientHeight);

    var pixelArray = getPixel(width, height);
    //console.log(getPixel(width, height));
    var cellsize = width;
    for (var i = 0; i < imageData.width; i += 2 * cellsize) {
        for (var j = 0; j < imageData.height; j += cellsize) {
            var diff = ((j / cellsize) % 2) * cellsize;
            for (var x = i + diff;
                (x < i + diff + cellsize) && (x < imageData.width); x++) {
                for (var y = j; y < j + cellsize; y++) {
                    var colorVal = new Array(width * height);
                    colorVal = getRGB(pixelArray[x + y * width]);
                    //console.log(pixelArray[x + y * width]);
                    //console.log(colorVal[0]);
                    setPixel(imageData, x, y, colorVal[0], colorVal[1], colorVal[2], 255);

                }
            }
        }
    }

    canvas.getContext("2d").putImageData(imageData, 0, 0);

    //modify here to obtain image in proper format, currently exports in non compatible format (works in linux)
    //TO:DO Export in BMP format without compression
    canvas.toBlob(blob => {
        let file = new Blob([blob], { type: "application/octet-stream;base64" })
        let blobURL = URL.createObjectURL(file)
        window.location.href = blobURL;
    });
}