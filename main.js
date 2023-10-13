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
        const startingSquareID = piece.parentNode.id;
        getPossibleMoves(startingSquareID, piece);
    }
}

function drop(event){
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    const piece = document.getElementById(data);
    const destinationSquare = event.currentTarget;
    let destinationSquareID = destinationSquare.id;
    if(isSquareOccupied(destinationSquare) == "blank"){
        destinationSquare.appendChild(piece);
        isWhiteTurn = !isWhiteTurn;
        return;
    }

    if(isSquareOccupied(destinationSquare) !== "blank"){
        while(destinationSquare.firstChild){
            destinationSquare.removeChild(destinationSquare.firstChild);
        }
        destinationSquare.appendChild(piece);
        isWhiteTurn = !isWhiteTurn;
        return;
    }
    
}

function isSquareOccupied(square){
    if(square.querySelector(".piece")){
        const color = square.querySelector(".piece").getAttribute("color");
        return color;
    }else{
        return "blank";
    }
}