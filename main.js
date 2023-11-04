const gameBoardModule = (()=>{
    let board = ['', '', '', '', '', '', '', '', ''];

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    }
    const placeMarker = (marker, index) => {
        board[index] = marker;
    }
    const getCurrentBoardState = () => {
        return board;
    }
    const isCellActive = (index) => board[index] == ''? true: false;
    const winConditionMet = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }
    const renderBoard = () => {
        let iteration = 0;
        const HTMLboard = document.querySelectorAll(".cell");
        HTMLboard.forEach((cell) => {
            cell.innerHTML = board[iteration];
            iteration++
        })
    }

    return {resetBoard, placeMarker, getCurrentBoardState, winConditionMet, isCellActive, renderBoard};
})();

const player = function(name, marker) {
    getPlayerName = () => {
        return name;
    }
    getPlayerMarker = () => {
        return marker;
    }

    return {getPlayerName, getPlayerMarker};
}

const gameController = (() => {

    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");

    let roundNumber = 0;
    let currentPlayer = player1;

    function resetGame() {
        gameBoardModule.renderBoard();
        document.querySelector(".cover").remove();
        document.querySelector(".p2").innerHTML = '';
        document.querySelector(".p1").innerHTML = player1.getPlayerName();
        document.querySelector(".p1wins").innerHTML = "";
        document.querySelector(".p2wins").innerHTML = "";
    }

    const _switchPlayer = () => {
        currentPlayer = currentPlayer == player1? player2: player1;
        if (currentPlayer == player2) {
            document.querySelector(".p1").innerHTML = '';
            document.querySelector(".p2").innerHTML = player2.getPlayerName();
            return
        } else {
            document.querySelector(".p2").innerHTML = '';
            document.querySelector(".p1").innerHTML = player1.getPlayerName();
            return
        }
    }
    function _gameOver() {
        const createEl = (element, innerText = "") => {
            let el = document.createElement(element);
            el.innerHTML = innerText;
            return el;
        }
        const btn = document.createElement("button");
        btn.innerText = "PLAY AGAIN";
        let h1_1 = createEl("h1", "GAME");
        let h1_2 = createEl("h1", "OVER");
        const div1 = createEl("div");
        const div2 = createEl("div");
        
        div1.appendChild(h1_1);
        div1.appendChild(btn);
        div1.appendChild(h1_2);
        div2.appendChild(div1);
        
        div2.classList.add('cover');
        div1.classList.add('textDiv');
        btn.addEventListener('click', resetGame);
        
        document.querySelector(".container").appendChild(div2);
        
        if (roundNumber >= 9) {
            h1_1.innerHTML = "DRAW";
            h1_2.innerHTML = "";
            document.querySelector(".p1").innerHTML = player1.getPlayerName();
            document.querySelector(".p2").innerHTML = player2.getPlayerName();
            roundNumber = 0;
            return;
        }
        
        if (currentPlayer == player1) {
            document.querySelector(".p1wins").innerHTML = "WON!";
        } else {
            document.querySelector(".p2wins").innerHTML = "WON!";
        }
        roundNumber = 0;
    }
    const playRound = (event) => {
        const index = parseInt(event.target.id);
        if (!gameBoardModule.isCellActive(index)) {return};

        gameBoardModule.placeMarker(currentPlayer.getPlayerMarker(), index);
        gameBoardModule.renderBoard();
        roundNumber++;
        if (gameBoardModule.winConditionMet() || roundNumber >= 9) {
            gameBoardModule.resetBoard();
            _gameOver();
            currentPlayer = player1;
            return;
        }
        _switchPlayer(); 
    }
    return {playRound, resetGame}
})();

document.querySelector(".board").addEventListener('click', gameController.playRound);