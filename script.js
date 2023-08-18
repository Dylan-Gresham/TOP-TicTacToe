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

const gbContainer = document.getElementById('boardContainer');
const gbRowOne = document.getElementById('boardRowOne');
const gbRowTwo = document.getElementById('boardRowTwo');
const gbRowThree = document.getElementById('boardRowThree');
const gbRows = [gbRowOne, gbRowTwo, gbRowThree];

currentTurn = 'o';

const Game = function(PlayerOne, PlayerTwo) {
    this.playerOne = PlayerOne;
    this.playerTwo = PlayerTwo;
    this.rounds = 0;
    this.gameBoard = Gameboard(this);

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

    this.endGame = (winnerStr) => {
        console.log('win! ' + winnerStr);
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

const Gameboard = function(game) {
    this.board = [
        [],
        [],
        []
    ];

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            const button = document.createElement('button');
            button.classList.add('tile');
            button.addEventListener('click', event => {
                if(button.textContent !== '') {
                    event.stopPropagation();
                    
                    return;
                } else if(currentTurn === 'o') {
                    button.textContent = 'O';
                } else {
                    button.textContent = 'X';
                }

                detectWin();
                switchTurns();
            });

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

function switchTurns() {
    if(currentTurn === 'o') {
        currentTurn = 'x';
    } else {
        currentTurn = 'o';
    }

    return;
}

playButton.addEventListener('click', (event) => {
    let oName = `${playerOName.value}:`;
    playerOName.disabled = true;
    let xName = `${playerXName.value}:`;
    playerXName.disabled = true;
    let playerOTemp = Player('o', oName);
    let playerXTemp = Player('x', xName);
    let game = Game(playerOTemp, playerXTemp);
    gbRowTwo.classList.toggle('addTiles');
    game.showGame();

    event.stopPropagation();
});

function detectWin() {
    let rowOne = [];
    let rowTwo = [];
    let rowThree = [];
    let rows = [rowOne, rowTwo, rowThree];

    // Get all the rows 
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            rows[i][j] = gbRows[i].childNodes[j + 1].textContent;
        }
    }

    // Check for horizontal wins
    for(let i = 0; i < 3; i++) {
        if(rows[i][0] !== '' && (rows[i][0] === rows[i][1] && rows[i][1] === rows[i][2])) {
            endGame(rows[i][0]);

            return;
        }
    }

    // Check for vertical wins
    if(rowOne[0] !== '' && (rowOne[0] === rowTwo[0] === rowThree[0])) {
        endGame(rowOne[0]);

        return;
    } else if(rowOne[1] !== '' && (rowOne[1] === rowTwo[1] === rowThree[1])) {
        endGame(rowOne[1]);

        return;
    } else if(rowOne[2] !== '' && (rowOne[2] === rowTwo[2] === rowThree[2])) {
        endGame(rowOne[2]);

        return;
    }

    // Check for diagonal wins
    if(rowOne[0] !== '' && (rowOne[0] === rowTwo[1] === rowThree[2])) {
        endGame(rowOne[0]);

        return;
    } else if(rowOne[2] !== '' && (rowOne[2] === rowTwo[1] === rowThree[0])) {
        endGame(rowOne[2]);

        return;
    }
};
