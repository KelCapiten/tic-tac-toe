const gameBoardModule = (()=>{
    const board = ['', '', '', '', '', '', '', '', ''];

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

    return {resetBoard, placeMarker, getCurrentBoardState, winConditionMet, isCellActive};
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
    const player1 = player("player1", "X");
    const player2 = player("player2", "O");
    let roundNumber = 0;

    let currentPlayer = player1;
    const _switchPlayer = () => currentPlayer == player1? player2: player1;

    function _round(index) {
        gameBoardModule.placeMarker(currentPlayer.getPlayerMarker(), index);
        _switchPlayer();
        roundNumber++;
        return roundNumber;    
    }

    function _gameOver() {

    }

    const playRound = (index) => {
        if (gameBoardModule.isCellActive(index) && !(gameBoardModule.winConditionMet())) {
            _round(index);
        } else {
            _gameOver();
        }
    }

    return {playRound}
})();