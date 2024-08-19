import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  squares: ('X' | 'O' | null)[] = []; // Allow 'X', 'O', or null
  xIsNext: boolean;
  winner: string | null; // Allow null values

  constructor() {
    this.squares = Array(9).fill(null);  // Fix to 9 squares for a 3x3 board
    this.xIsNext = true;
    this.winner = null;
  }
  
  ngOnInit() {
    this.NewGame();
  }

  NewGame() {
    this.squares = Array(9).fill(null);  // Fix to 9 squares for a 3x3 board
    this.xIsNext = true;
    this.winner = null;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  MakeMove(idx: number) {
    if (!this.squares[idx] && !this.winner) {  // Check if the cell is empty and game is not won
      this.squares[idx] = this.player;  // Correct array access and assignment
      this.xIsNext = !this.xIsNext;  // Toggle the player
    }
    this.winner = this.CalculateWinner();
  }

  CalculateWinner() {
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
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

}
