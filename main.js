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

    return {resetBoard, placeMarker, getCurrentBoardState};
})();

const player = function(name, marker) {
    getPlayerName = () => {
        return name;
    }
    getPlayerMarker = () => {
        return marker;
    }
}