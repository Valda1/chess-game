const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let go = "cicrle";
infoDisplay.textContent = "Circle goes first!";

function createBoard(){
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addGo);
        gameBoard.append(cellElement);
    })
}

createBoard();

function addGo(event){
    //console.log(event.target);
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    event.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "It is now " + go + "'s go!";
    event.target.removeEventListener("click", addGo);
}
