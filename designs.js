$("#sizePicker").submit(function(event){
  event.preventDefault();
height = $("#inputHeight").val();
width = $("#inputWidth").val();
makeGrid (height, width);
});

function makeGrid (height, width){
// clears any previously created table
$("tr").remove();
  
//selects height & width to create grid
for(var i = 1; i <= height; i++){
  $("#pixelBoard").append("<tr id=table" + i + "></tr>");
  for(var j = 1; j <= width; j++){
    $("#table" + i).append("<td></td>");   
  }
}
//uses color to draw on cell(s)
$("td").click(function addcolor() {
color = $("#colorPicker").val(); 
  
  if($(this).attr("style")) {
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
$("#erase").click(function eraseTable(){
  $("tr").remove();
}); 
  
//erases drawing when you click clear
$("#clear").click(function eraseTable(){
  $("td").removeAttr("style");
});
}