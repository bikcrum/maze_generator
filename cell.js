function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.visited = false;
  this.walls = [true,true,true,true];

  this.checkNeighbors = function(){
    var neighbours = []

    var top,right,bottom,left;

    top = grid[index(i-1,j)];
    right = grid[index(i,j+1)];
    bottom = grid[index(i+1,j)]
    left = grid[index(i,j-1)];

    if(top && !top.visited){
      neighbours.push(top);
    }
    if(right && !right.visited){
      neighbours.push(right);
    }
    if(bottom && !bottom.visited){
      neighbours.push(bottom);
    }
    if(left && !left.visited){
      neighbours.push(left);
    }
    if(neighbours.length > 0){
      var r = floor(random(0,neighbours.length));
      return neighbours[r];
    }else{
      return undefined;
    }

  }

  this.highlight = function(){
    var x = this.j * cell_size;
    var y = this.i * cell_size;
    noStroke();
    fill(255,255,0,100);
    rect(x , y , cell_size, cell_size);
  }

  this.show = function() {
    stroke(255);
    var x = this.j * cell_size;
    var y = this.i * cell_size;

    strokeWeight(2);
    if(this.walls[0]) line(x ,y,x + cell_size,y);
    if(this.walls[1]) line(x + cell_size,y,x+ cell_size, y + cell_size);
    if(this.walls[2]) line(x + cell_size, y + cell_size, x, y + cell_size);
    if(this.walls[3]) line(x,y+cell_size,x,y);

    if(this.visited){
      noStroke();
      fill(0,255,255,80);
      rect(x , y , cell_size, cell_size);
    }
  }
}
