let boxes = document.querySelectorAll(".box"); // All game boxes
let resetBtn = document.querySelector("#reset-btn"); // Reset Game button
let newGameBtn = document.querySelector("#new-btn"); // New Game button
let msgContainer = document.querySelector(".msg-container"); // Message container for winner/draw
let msg = document.querySelector("#msg"); // Message text element

// Game state variables
let turnO = true; // true for Player O's turn, false for Player X's turn
let count = 0; // Tracks the number of moves made, used to detect a draw

// Winning patterns for Tic-Tac-Toe (indices of boxes)
const winPatterns = [
  [0, 1, 2], // Top row
  [0, 3, 6], // Left column
  [0, 4, 8], // Diagonal (top-left to bottom-right)
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [2, 4, 6], // Diagonal (top-right to bottom-left)
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
];

/**
 * Resets the game to its initial state.
 * Clears all boxes, enables them, hides the message container,
 * and sets the turn back to Player O.
 */
const resetGame = () => {
  turnO = true; // Player O starts
  count = 0; // Reset move count
  enableBoxes(); // Make all boxes clickable and empty
  msgContainer.classList.add("hide"); // Hide the winner/draw message
};

// Add event listeners to each game box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Check whose turn it is and place the corresponding mark
    if (turnO) {
      // Player O's turn
      box.innerText = "O";
      box.style.color = "#b0413e"; // Set color for 'O'
      turnO = false; // Switch turn to Player X
    } else {
      // Player X's turn
      box.innerText = "X";
      box.style.color = "#4a4a4a"; // Set color for 'X' (a dark grey)
      turnO = true; // Switch turn to Player O
    }
    box.disabled = true; // Disable the clicked box to prevent further clicks
    count++; // Increment move count

    let isWinner = checkWinner(); // Check if there's a winner

    // If all 9 boxes are filled and there's no winner, it's a draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

/**
 * Displays a draw message and disables all boxes.
 */
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`; // Set draw message
  msgContainer.classList.remove("hide"); // Show message container
  disableBoxes(); // Disable all boxes
};

/**
 * Disables all game boxes to prevent further moves.
 */
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

/**
 * Enables all game boxes and clears their text content.
 */
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false; // Enable box
    box.innerText = ""; // Clear text
    box.style.color = ""; // Reset color (optional, but good practice if colors are set dynamically)
  }
};

/**
 * Displays the winner message and disables all boxes.
 * @param {string} winner - The mark of the winning player ('X' or 'O').
 */
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}!`; // Set winner message
  msgContainer.classList.remove("hide"); // Show message container
  disableBoxes(); // Disable all boxes
};

/**
 * Checks if any winning pattern has been achieved.
 * Iterates through all win patterns and checks if the innerText of the
 * corresponding boxes matches.
 * @returns {boolean} - True if a winner is found, false otherwise.
 */
const checkWinner = () => {
  for (let pattern of winPatterns) {
    // Get the innerText of the three boxes in the current pattern
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // Ensure all three positions are not empty before checking for a match
    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      // Check if all three values are identical
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val); // Display the winner
        return true; // A winner is found
      }
    }
  }
  return false; // No winner found
};

// Add event listeners to the New Game and Reset Game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
