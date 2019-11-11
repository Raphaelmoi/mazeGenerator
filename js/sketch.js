let loadingAnimation;
let readyToStart = true;
let rows, cols;
var w = 40;
var grid = [];
var current;
var stack = [];
var playerStack = [];
var lastCase = false;
let mazeIsDrawing = true;
let lastPosition;
let direction;

var newRed;
var newGreen;
var newBlue;

let currentR = 186;
let currentG = 0;
let currentB = 13;

function preload() {
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // background(200);
    // frameRate(1);
    cols = floor(width / w);
    rows = floor(height / w);
    //set up the grid
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell)
        }
    }
    current = grid[0];
    randomColor();
}

function draw() {
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    if(mazeIsDrawing){
        current.visited = true;
        var next = current.checkNeighbors();
        if (next) {
            current.highlight();
            // next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else if (stack.length > 0) {
            current.highlight();
            current = stack.pop();
        }
        else {
            mazeIsDrawing = !mazeIsDrawing;
        }
    }
    else{
        frameRate(12);
        current.visitedByPlayer = true;
        // current.visited = false;
        var next = current.checkNeighborsForPlayer();   
        if (next) {
            current.drawMario();
            next.visitedByPlayer = true;
            playerStack.push(current);
            current = next;
        } else if (playerStack.length > 0) {
            current.drawMario();
            current = playerStack.pop();
        }
        else{
            for (var i = 0; i < grid.length; i++) {
                grid[i].visitedByPlayer = false;
            }
            currentR = newRed;
            currentB = newBlue;
            currentG = newGreen;
            randomColor();
        }
    }
}

function randomColor(){
    newRed =  floor(random(0, 255));
    newGreen =  floor(random(0, 255));
    newBlue =  floor(random(0, 255));
}


function index(i, j) {
    //if invalid value
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1
    }
    return i + j * cols;
}



function removeWalls(a, b) {
    var x = a.i - b.i;
    var y = a.j - b.j;
    //left = 1 right -1
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    //TOP = 1 bottom -1
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}