
import './App.css';
import { useState } from "react";

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

// Define the Board component as the main game board
export default function Board() {
  // State to track whose turn it is (true for X, false for O)
  const [xIsNext, setXIsNext] = useState(true); //X player goes first
  // State to track the squares, initialized with an array of 9 null values
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Function to handle clicks on the squares
  function handleClick(i: number) {
    // Return early if the square already has an "X" or "O"
    if (squares[i]) {
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
    
    // Update the squares state with the new squares array
    setSquares(nextSquares);
    // Toggle the turn
    setXIsNext(!xIsNext);
  }

  // Render the board with three rows of squares
  return (
    <>
      <div className="board-row">
        {/* Render squares for the first row */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        {/* Render squares for the second row */}
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        {/* Render squares for the third row */}
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


