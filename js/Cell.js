function Cell(i, j) {
    this.i = i;
    this.j = j;
    //top right bottom left
    this.walls = [true, true, true, true];
    this.visited = false;
    this.visitedByPlayer = false;

    this.checkNeighbors = function () {
        var neighbors = [];
        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];
        if(mazeIsDrawing){
            if (top && !top.visited) {
                neighbors.push(top);
            }
            if (right && !right.visited) {
                neighbors.push(right);
            }
            if (bottom && !bottom.visited) {
                neighbors.push(bottom);
            }
            if (left && !left.visited) {
                neighbors.push(left);
            }
            if (neighbors.length > 0) {
                var r = floor(random(0, neighbors.length))
                return neighbors[r]
            } else {
                return undefined;
            }
        }
    }
    this.checkNeighborsForPlayer = function () {
        var neighbors = [];
        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        if (top && !top.visitedByPlayer  && top.walls[2] === false) {
            neighbors.push(top);
        }
        if (right && !right.visitedByPlayer && right.walls[3] === false) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visitedByPlayer && bottom.walls[0] === false) {
            neighbors.push(bottom);
        }
        if (left && !left.visitedByPlayer && left.walls[1] === false) {
            neighbors.push(left);
        }
        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length))
            return neighbors[r]
        } else {
            return undefined;
        }
    }

    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;
       
        if (this.visited) {
            noStroke();
            fill(240);
            rect(x, y, w, w);
            strokeWeight(7);
            if (this.visitedByPlayer) {
                stroke(newRed, newBlue, newGreen);
            }else{
                stroke(currentR, currentB, currentG);
            }
            // noFill();
            strokeWeight(8);
            strokeJoin(ROUND);
            strokeCap(ROUND);
            // Walls origin, end , and rest
            if (x === 0 && y === 0) {
                if (this.walls[3]) { line(x, y + w, x, y); }
                if (this.walls[2]) { line(x + w, y + w, x, y + w); }
                if (this.walls[1]) { line(x + w, y, x + w, y + w); }
            }
            else if (this.i === cols - 1 && this.j === rows - 1) {
                if (this.walls[3]) { line(x, y + w, x, y); }
                if (this.walls[1]) { line(x + w, y, x + w, y + w); }
                if (this.walls[0]) { line(x, y, x + w, y); }
            } else {
                if (this.walls[0]) { line(x, y, x + w, y); }
                if (this.walls[1]) { line(x + w, y, x + w, y + w); }
                if (this.walls[2]) { line(x + w, y + w, x, y + w); }
                if (this.walls[3]) { line(x, y + w, x, y); }
            }
        }


    }
    this.highlight = function () {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(currentR, currentB, currentG);
        ellipseMode(CORNER)
        circle(x, y, w, w)
    }

    this.drawMario = function () {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(newRed, newBlue, newGreen);
        ellipseMode(CORNER)
        circle(x, y, w, w)
    }
}