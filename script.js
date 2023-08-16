const gbRowOne = document.getElementById('boardRowOne');
const gbRowTwo = document.getElementById('boardRowTwo');
const gbRowThree = document.getElementById('boardRowThree');
const gbRows = [gbRowOne, gbRowTwo, gbRowThree];

const playerOWins = document.getElementById('playerOWins');
const playerOLosses = document.getElementById('playerOLosses');
const playerOTies = document.getElementById('playerOTies');
const playerXWins = document.getElementById('playerXWins');
const playerXLosses = document.getElementById('playerXLosses');
const playerXTies = document.getElementById('playerXTies');

const Game = function(PlayerOne, PlayerTwo) {
    this.playerOne = PlayerOne;
    this.playerTwo = PlayerTwo;
    this.rounds = 0;
    this.gameBoard = Gameboard();

    this.showGame = () => {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                gbRows[i].appendChild(this.gameBoard.board[i, j]);
            }
        }
    };

    this.endGame = () => {
        if(this.playerOne.wins > this.playerTwo.wins) {
            // Do something for when Player One wins
        } else if(this.playerOne.wins < this.playerTwo.wins) {
            // Do something for when Player Two wins
        } else {
            // Do something for when it's a tie
        }
    }

    this.incrementRounds = () => this.rounds++;
}

const Player = function(xOrO, name) {
    this.tile = xOrO;
    this.wins = 0;
    this.losses = 0;
    this.ties = 0;
    this.name = name;
    
    this.incrementWins = () => this.wins++;
    this.incrementLosses = () => this.losses++;
    this.incrementTies = () => this.ties++;
}

const Gameboard = function() {
    this.board = [
        [/* Three buttons as tiles */],
        [/* Three buttons as tiles */],
        [/* Three buttons as tiles */]
    ];
    this.winner = NaN; // 0 if O wins, 1 if X wins, 2 if tie
    this.gameState = "start";

    this.changeState = (state) => this.gameState = state;
    this.resetBoard = () => {
        // Reset this.board here

        this.winner = NaN;
        this.gameState = "start";
    };
}
