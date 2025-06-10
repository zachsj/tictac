
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

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
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
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // Render the board with three rows of squares
  return (
    <>
      <div className="status">{status}</div>
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

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

   function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
  }

  //the squares argument goes through each element of history, and the move argument goes through each array index: 0, 1, 2
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
