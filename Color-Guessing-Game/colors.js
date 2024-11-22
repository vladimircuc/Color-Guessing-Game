var colorDisplay = document.getElementById("colorDisplay");
var squares = document.querySelectorAll(".square");
var container = document.getElementById("container");
var header = document.querySelector("h1");
var message = document.getElementById("message");
var easyButton = document.querySelectorAll(".mode")[0];
var hardButton = document.querySelectorAll(".mode")[1];
var resetButton = document.getElementById("reset");
let currentPlayListener = null;

init();

// Reset button logic
resetButton.addEventListener("click", function(event) {
    resetGame();
});

// Mode button logic to toggle "selected" class
easyButton.addEventListener("click", function() {
    setMode(easyButton);
});

hardButton.addEventListener("click", function() {
    setMode(hardButton);
});

function init() {
    resetGame();
}

// Function to reset the game
function resetGame() {
    if (currentPlayListener) {
        // Remove the previous listener if it exists
        container.removeEventListener("click", currentPlayListener);
    }
    var guess = makeGame();
    enableSquares();
    resetButton.textContent = "New Colors";
    play(guess);
}

function setMode(button) {
    easyButton.classList.remove("selected");
    hardButton.classList.remove("selected");

    button.classList.add("selected");

    if (button === easyButton) {
        squares.forEach((square, index) => {
            if (index >= 3) {
                square.style.display = "none";
            }
        });
    } else {
        squares.forEach((square) => {
            square.style.display = "block";
        });
    }

    resetGame();
}


function makeGame() {
    var guess = getRandomColor();
    colorDisplay.textContent = guess;
    message.textContent = "Take a Guess!";
    
    var activeSquares = Array.from(squares).filter(square => square.style.display !== "none");
    var randomIndex = Math.floor(Math.random() * activeSquares.length);

    activeSquares.forEach((square, index) => {
        square.style.visibility = "visible"; // Ensure all squares are visible
        if (index === randomIndex) {
            square.style.backgroundColor = guess;
        } else {
            square.style.backgroundColor = getRandomColor();
        }
    });

    return guess;
}


function play(guess) {
    function handleSquareClick(event) {
        if (event.target.classList.contains("square")) {
            if (event.target.style.backgroundColor === guess) {
                win(guess);
                message.textContent = "CORRECT!";
            } else {
                event.target.style.visibility = "hidden";
                event.target.style.pointerEvents = "none";
                message.textContent = "Wrong!";
            }
        }
    }

    // Attach the listener and store the reference
    currentPlayListener = handleSquareClick;
    container.addEventListener("click", handleSquareClick);
}

function win(guess) {
    console.log("guessed!");
    header.style.backgroundColor = guess;
    disableSquares();
    makeAllSame(guess);
    resetButton.textContent = "Play Again?";
}

function disableSquares() {
    squares.forEach(function(square) {
        square.style.pointerEvents = "none";
    });
}

function makeAllSame(guess) {
    squares.forEach(function(square) {
        square.style.visibility = "visible"; // Make square visible
        square.style.backgroundColor = guess;
    });
}

function enableSquares() {
    squares.forEach(function(square) {
        square.style.pointerEvents = "auto"; 
        square.style.visibility = "visible"; // Make square visible
    });
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Return the color in RGB format
    return `rgb(${r}, ${g}, ${b})`;
}
