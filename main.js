let squares = [];
let isWhiteTurn = true;
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByName("name");
const piecesImg = document.getElementsByTagName("img");

setUpBoard();
setUpPieces();

function setUpBoard(){
    for(let i = 0; i < boardSquares.length; i++){
        
        boardSquares[i].addEventListener("dragover", allowDrop);
        boardSquares[i].addEventListener("drop", drop);
        let row = 8 - Math.floor(i / 8);
        let column = String.fromCharCode(97 + (i % 8));
        let square = boardSquares[i];
        square.id = column + row;
    }
}

function setUpPieces(){
    for(let i = 0; i < pieces.length; i++){
        pieces[i].addEventListener("dragstart", drag);
        pieces[i].setAttribute("draggable", true);
        pieces[i].id = pieces[i].className.split(" ")[i] + pieces[i].parentElement.id;
    }

    for(let i = 0; i < piecesImg.length; i++){
        pieces[i].setAttribute("draggable", false);
    }
}

function allowDrop(event){
    event.preventDefault();
}

function drag(event){
    const piece = event.target;
    const pieceColor = piece.getAttribute("color");

    if((isWhiteTurn && pieceColor == "white") || (!isWhiteTurn && pieceColor == "black")){
        event.dataTransfer.setData("text", piece.id);
    }
}

function drop(event){
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    const piece = document.getElementById(data);
    const destinationSquare = event.currentTarget;
    let destinationSquareID = destinationSquare.id;
    destinationSquare.appendChild(piece);
    isWhiteTurn = !isWhiteTurn;
}

//5.05

function isSquareOccupied(){

}