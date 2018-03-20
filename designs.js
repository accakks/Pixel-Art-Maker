// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

function makeGrid() {

var height = $('#inputHeight').val();
var weight = $('#inputWidth').val();
var i,j;

  var grid = document.createElement('table');
  grid.className = 'grid';
  for (i=0; i<height;++i){
    var tr = grid.appendChild(document.createElement('tr'));
    for (j=0;j<width;++j){
      var cell = tr.appendChild(document.createElement('td'));
      cell.innerHTML = ++i;
      }
  return grid;
}
		
	

}




// print('This works'); Create a print button to print the canvas