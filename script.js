const playerOName = document.getElementById('playerOneName');
const playerXName = document.getElementById('playerTwoName');
const playButton = document.getElementById('startGameButton');

const playerO = document.getElementById('playerO');
const playerOWins = document.getElementById('playerOWins');
const playerOLosses = document.getElementById('playerOLosses');
const playerOTies = document.getElementById('playerOTies');
const roundNum = document.getElementById('roundNum');
const playerX = document.getElementById('playerX');
const playerXWins = document.getElementById('playerXWins');
const playerXLosses = document.getElementById('playerXLosses');
const playerXTies = document.getElementById('playerXTies');

const gbRowOne = document.getElementById('boardRowOne');
const gbRowTwo = document.getElementById('boardRowTwo');
const gbRowThree = document.getElementById('boardRowThree');
const gbRows = [gbRowOne, gbRowTwo, gbRowThree];

const Game = function(PlayerOne, PlayerTwo) {
    this.playerOne = PlayerOne;
    this.playerTwo = PlayerTwo;
    this.rounds = 0;
    this.gameBoard = Gameboard();

    this.showGame = () => {
        playerO.textContent = this.playerOne.name;
        playerOWins.textContent = this.playerOne.wins;
        playerOLosses.textContent = this.playerOne.losses;
        playerOTies.textContent = this.playerOne.ties;

        roundNum.textContent = this.rounds + 1;

        playerX.textContent = this.playerTwo.name;
        playerXWins.textContent = this.playerTwo.wins;
        playerXLosses.textContent = this.playerTwo.losses;
        playerXTies.textContent = this.playerTwo.ties;
        
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                gbRows[i].appendChild(this.gameBoard.board[i][j]);
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

    this.incrementRounds = () => {
        this.rounds++;
        this.board.resetBoard();
    }

    return {rounds, showGame, endGame, incrementRounds};
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

    return {wins, losses, ties, name, incrementWins, incrementLosses, incrementTies};
}

const Gameboard = function() {
    this.board = [
        [],
        [],
        []
    ];

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            const button = document.createElement('button');
            button.classList.add('tile');
            this.board[i].push(button);
        }
    }

    this.winner = NaN; // 0 if O wins, 1 if X wins, 2 if tie
    this.gameState = "start";

    this.changeState = (state) => this.gameState = state;
    this.resetBoard = () => {
        // Reset this.board here

        this.winner = NaN;
        this.gameState = "start";
    };

    return {board, changeState, resetBoard};
}

playButton.addEventListener('click', (event) => {
    let oName = `${playerOName.value}:`;
    playerOName.disabled = true;
    let xName = `${playerXName.value}:`;
    playerXName.disabled = true;
    let playerOTemp = Player('o', oName);
    let playerXTemp = Player('x', xName);
    let game = Game(playerOTemp, playerXTemp);
    game.showGame();

    event.stopPropagation();
});
