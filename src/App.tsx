import './App.css'; // Import the stylesheet for the app
import { useState } from "react"; // Import the useState hook from React

// Define an interface for the props that the Square component will receive
interface SquareProps {
  value: string | null; // The value of the square, which can be a string or null
  onSquareClick: () => void; // A function to handle square click events, with no parameters and no return value
}

// Define the Square component, which takes SquareProps as props
function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}> {/* Render a button with a click handler */}
      {value} {/* Display the value of the square */}
    </button>
  );
}

// Define an interface for the props that the Board component will receive
interface BoardProps {
  xIsNext: boolean; // Boolean indicating if it's X's turn
  squares: (string | null)[]; // Array representing the current state of the board
  onPlay: (nextSquares: (string | null)[]) => void; // Function to update the board state
}

// Define the Board component as the main game board
function Board({ xIsNext, squares, onPlay }: BoardProps) {

  // Function to handle clicks on the squares
  function handleClick(i: number) {
    // Return early if the square already has an "X" or "O"
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Create a copy of the current squares array
    const nextSquares = squares.slice();
    // Set the clicked square to "X" or "O" based on whose turn it is
    if (xIsNext) {
      nextSquares[i] = "X"; // Set to "X" if it's X's turn
    } else {
      nextSquares[i] = "O"; // Set to "O" if it's O's turn
    }
    onPlay(nextSquares); // Update the board state
  }

  const winner = calculateWinner(squares); // Determine if there is a winner
  let status; // Declare a variable for status text
  if (winner) {
    status = "Winner: " + winner; // Set status if there's a winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O"); // Set status for next player
  }

  // Render the board with three rows of squares
  return (
    <>
      <div className="status">{status}</div> {/* Display the current game status */}
      <div className="board-row"> {/* First row of squares */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row"> {/* Second row of squares */}
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row"> {/* Third row of squares */}
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Define the Game component which manages the entire game state
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // State to track history of board states
  const [currentMove, setCurrentMove] = useState(0); // State to track the current move index
  const xIsNext = currentMove % 2 === 0; // Determine if it's X's turn
  const currentSquares = history[currentMove]; // Get the current state of the board

  // Function to update the game state when a move is played
  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // Create new history
    setHistory(nextHistory); // Update history state
    setCurrentMove(nextHistory.length - 1); // Update current move index
  }

  // Function to jump to a previous move
  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove); // Set the current move index
  }

  // The squares argument goes through each element of history, and the move argument goes through each array index: 0, 1, 2...
  const moves = history.map((squares, move) => {
    let description; // Declare variable for button label
    if (move > 0) {
      description = 'Go to move #' + move; // Label for a specific move
    } else {
      description = 'Go to game start'; // Label for the start of the game
    }
    return (
      <li key={move}> {/* List item for each move */}
        <button onClick={() => jumpTo(move)}>{description}</button> {/* Button to jump to a specific move */}
      </li>
    );
  });

  // Render the game board and move history
  return (
    <div className="game"> {/* Container for the game */}
      <div className="game-board"> {/* Container for the board */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info"> {/* Container for the move history */}
        <ol>{moves}</ol> {/* Ordered list of moves */}
      </div>
    </div>
  );
}

// Function to calculate the winner of the game
function calculateWinner(squares: (string | null)[]) {
  const lines = [ // Possible winning combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) { // Loop through winning combinations
    const [a, b, c] = lines[i]; // Destructure indices
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ("X" or "O")
    }
  }
  return null; // Return null if there is no winner
}
