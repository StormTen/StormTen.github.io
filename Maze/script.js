var canvas = document.getElementById('demo');
var ctx = canvas.getContext('2d');
var grid = [];
var mazeHeight = 35;
var mazeWidth = 95;
var mazeBlockSize = 10;

var maze = createMaze(mazeHeight, mazeWidth, mazeBlockSize);




function createMaze(heightDimension, widthDimension, blockSize) {
    var visited = [];
    var traceBack = [];
    var solution = [];
    var MAZE_WIDTH = widthDimension;
    var MAZE_HEIGHT = heightDimension;
    var BLOCK_SIZE = blockSize;
    var counter = 0;
    var tracebackLength = 0;
    var endPosition;

    createGrid();
    var currentPosistion = chooseStart();
    grid[start.X][start.Y] = 3;
    drawGrid();

    function createGrid() {
        for (var i = 0; i < MAZE_WIDTH; i++) {
            grid[i] = [];
            for (var j = 0; j < MAZE_HEIGHT; j++) {
                if (j % 2 != 0 && i % 2 != 0) {
                    grid[i][j] = 0;
                } else {
                    grid[i][j] = 1;
                }
            }
        }
    };

    function drawGrid() {
        for (var y = 0; y < MAZE_HEIGHT; y++) {
            for (var x = 0; x < MAZE_WIDTH; x++) {
                if (grid[x][y] == 1) {
                    drawSquare(x * BLOCK_SIZE, y * BLOCK_SIZE, 50, 200, 255);
                } else if (grid[x][y] == 0) {
                    drawSquare(x * BLOCK_SIZE, y * BLOCK_SIZE, 0, 0, 0);
                } else {
                    drawSquare(x * BLOCK_SIZE, y * BLOCK_SIZE, 0, 250, 0);
                }
            }
        }
    };
    function chooseStart() {
        var randomX = Math.floor(Math.random() * MAZE_WIDTH);
        var randomY = Math.floor(Math.random() * MAZE_HEIGHT);
        while (randomX % 2 == 0) {
            randomX = Math.floor(Math.random() * MAZE_WIDTH);
        }
        while (randomY % 2 == 0) {
            randomY = Math.floor(Math.random() * MAZE_HEIGHT);
        }
        start = {
            X: randomX,
            Y: randomY
        };
        visited.push(start);
        traceBack.push(start);
        return start;

    };
    var up = { X: currentPosistion.X, Y: currentPosistion.Y - 2 };
    var right = { X: currentPosistion.X + 2, Y: currentPosistion.Y };
    var down = { X: currentPosistion.X, Y: currentPosistion.Y + 2 };
    var left = { X: currentPosistion.X - 2, Y: currentPosistion.Y };
    var potentialDirs = [up, right, down, left];
    do {
        up = { X: currentPosistion.X, Y: currentPosistion.Y - 2 };
        right = { X: currentPosistion.X + 2, Y: currentPosistion.Y };
        down = { X: currentPosistion.X, Y: currentPosistion.Y + 2 };
        left = { X: currentPosistion.X - 2, Y: currentPosistion.Y };
        potentialDirs = [up, right, down, left];

        var neighbors = new Array();

        for (var i = 0; i < 4; i++) {
            if (potentialDirs[i].Y > 0 && potentialDirs[i].Y < (MAZE_HEIGHT - 1) &&
                potentialDirs[i].X > 0 && potentialDirs[i].X < (MAZE_WIDTH - 1)) {
                counter = 0;
                for (var w = 0; w < visited.length; w++) {

                    if (visited[w].X == potentialDirs[i].X && visited[w].Y == potentialDirs[i].Y) {
                        counter++;
                    };
                };
                if (counter == 0) {
                    neighbors.push(potentialDirs[i]);
                }

            };
        };

        if (neighbors.length) {
            var next = neighbors[Math.floor(Math.random() * neighbors.length)];
            drawSquare(((next.X + currentPosistion.X) / 2) * BLOCK_SIZE, ((next.Y + currentPosistion.Y) / 2) * BLOCK_SIZE, 0, 0, 0);
            grid[((next.X + currentPosistion.X) / 2)][((next.Y + currentPosistion.Y) / 2)] = 0;
            currentPosistion = next;
            visited.push(currentPosistion);
            traceBack.push(currentPosistion);

        } else {
            traceBack.pop();
            currentPosistion = traceBack[traceBack.length - 1];
        }
        if (traceBack.length > tracebackLength) {
            tracebackLength = traceBack.length;
            endPosition = traceBack[traceBack.length - 1];
            solution = [];
            for (var v = 0; v < traceBack.length; v++) {
                solution.push(traceBack[v]);
            }
        }
    } while (traceBack.length > 0);
    drawSquare(endPosition.X * BLOCK_SIZE, endPosition.Y * BLOCK_SIZE, 255, 0, 0);
    var mazeArrays = [];
    mazeArrays.push(visited);
    mazeArrays.push(solution);
    return mazeArrays;
}

function drawSquare(x, y, r, g, b) {
    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    ctx.fillRect(x, y, mazeBlockSize, mazeBlockSize);
};
function botSolve(speed) {
    var path = [];
    path = maze[1];


    setInterval(botDo, speed);

    function botDo() {
        var pathCurrent = path[0];
        var pathNext = path[1];

        if (path.length > 1) {

            drawSquare(pathNext.X * mazeBlockSize, pathNext.Y * mazeBlockSize, 255, 255, 0);
            drawSquare(((pathNext.X + pathCurrent.X) / 2) * mazeBlockSize, ((pathNext.Y + pathCurrent.Y) / 2) * mazeBlockSize, 255, 255, 0)
            path.shift();
        }
        if (path.length-1 ==  0) {
            document.getElementById('botsound').play();
        }

    }


}

function playerSolve() {
    var playerPath = [];
    playerPath = maze[0];

    var KEYCODE_LEFT = 37;
    var KEYCODE_UP = 38;
    var KEYCODE_RIGHT = 39;
    var KEYCODE_DOWN = 40;

    var left = false;
    var up = false;
    var right = false;
    var down = false;

    var time = 0;

    function handleKeyDown(evt) {
        if (!evt) { var evt = window.event; }  //browser compatibility
        switch (evt.keyCode) {
            case KEYCODE_LEFT: left = true; return false;
            case KEYCODE_RIGHT: right = true; return false;
            case KEYCODE_UP: up = true; return false;
            case KEYCODE_DOWN: down = true; return false;
        }
    }

    function handleKeyUp(evt) {
        if (!evt) { var evt = window.event; }  //browser compatibility
        switch (evt.keyCode) {
            case KEYCODE_LEFT: left = false; break;
            case KEYCODE_RIGHT: right = false; break;
            case KEYCODE_UP: up = false; break;
            case KEYCODE_DOWN: down = false; break;
        }
    }

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    playerX = playerPath[0].X;
    playerY = playerPath[0].Y;
    setInterval(playerDo, 50);
    setInterval(timer, 1000)
    function playerDo() {
        if (left) {
            if (grid[playerX - 1][playerY] == 0) {

                playerX -= 1;
            }
        }
        if (right) {
            if (grid[playerX + 1][playerY] == 0) {
                playerX += 1;
            }
        }
        if (up) {
            if (grid[playerX][playerY - 1] == 0) {
                playerY -= 1;
            }
        }
        if (down) {
            if (grid[playerX][playerY + 1] == 0) {
                playerY += 1;
            }
        }
        drawSquare(playerX * mazeBlockSize, playerY * mazeBlockSize, 255, 255, 255);
        if (playerX == maze[1][maze[1].length - 1].X && playerY == maze[1][maze[1].length - 1].Y) {
            document.getElementById('playerSound').play();
        }
    }
    function timer(){
        time++;
        document.getElementById('timer').innerHTML ='Timer: '+ time;

    }
}
