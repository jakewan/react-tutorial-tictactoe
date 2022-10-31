import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(squareIndex) {
    return (
      <Square
        value={this.props.squares[squareIndex]}
        onClick={() => this.props.onClick(squareIndex)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
    }
  }

  handleClick(squareIndex) {
    const history = this.state.history
    const currentState = history[history.length - 1]
    const squares = currentState.squares.slice()
    if (calculateWinner(squares) || squares[squareIndex]) {
      // No need to update state if there's already a winner
      // or if the square is already chosen
      return
    }
    squares[squareIndex] = this.state.xIsNext ? "X" : "O"
    this.setState({
      history: history.concat([{ squares }]),
      xIsNext: !this.state.xIsNext,
    })
  }

  render() {
    const history = this.state.history
    const currentState = history[history.length - 1]
    const winner = calculateWinner(currentState.squares)
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? "X" : "O"}`
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentState.squares}
            onClick={(squareIndex) => this.handleClick(squareIndex)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Game />)

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
