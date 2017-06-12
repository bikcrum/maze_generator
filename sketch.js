var grid = [];
var rows = 10,cols = 10;
var cell_size;
var current;
var stack;
function setup() {

  var size = min(windowWidth,windowHeight);
  createCanvas(size,size);

  cell_size = floor(size / row);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var cell = new Cell(i, j);
       grid.push(cell);
    }
  }
  current = grid[0];

  current.walls[3] = false;
  stack = [];
}

function draw() {
  background(100);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;

  var next = current.checkNeighbors();
  if(next){
    current.highlight();
    //STEP 1
    next.visited = true;

    //STEP 2
    stack.push(current);

    //STEP 3
    removeWalls(current,next);

    //STEP 4
    current = next;
  }else if(stack.length > 0){
    current.highlight();
    current = stack.pop();
  }else{
    //console.log('completed');
    stroke(255);
    strokeWeight(3);

    makeArrow((cols-1)*cell_size,(rows-1)*cell_size);
    makeArrow(-cell_size * 0.6,0);

    grid[grid.length - 1].walls[1] = false;
  }


}

function makeArrow(x,y){
    line(x + cell_size / 2,
    y + cell_size / 2,
    x + cell_size * 1.1,
    y + cell_size / 2);

    line(x+  cell_size * 0.8,
    y + cell_size * 0.3,
    x + cell_size * 1.1,
    y+ cell_size / 2);

    line(x +  cell_size * 0.8,
    y + cell_size  * 0.7,
    x + cell_size * 1.1,
    y + cell_size / 2);
}

function removeWalls(a,b){
  var i = a.i - b.i;
  var j = a.j - b.j;
  if(i == -1){
    a.walls[2] = false;
    b.walls[0] = false;
  }else if(i == 1){
    a.walls[0] = false;
    b.walls[2] = false;
  }else if(j == -1){
    a.walls[1] = false;
    b.walls[3] = false;
  }else{
    a.walls[3] = false;
    b.walls[1] = false;
  }
}
function index(i,j){
  if(i < 0 || j < 0 || i > rows - 1 || j > cols - 1){
    return -1;
  }
  return i * cols + j;
}
