
const winningMessageDiv = document.querySelector("#winning-message")
const winningMessageText = document.querySelector("#winning-message-text")
const restartButton = document.querySelector("#restartButton")
const containor = document.querySelector(".containor")
let circleTurn
let board
let boxes
let box

const width = 6
const height = 5

setBoard(width, height)
startGame()

restartButton.addEventListener("click", startGame)

function startGame(){
    boxes = document.querySelectorAll(".box")
    circleTurn = false
    boxes.forEach(box=>{
        box.classList.remove('x')
        box.classList.remove('circle')
        box.addEventListener("click", handleClick, { once: true })
    })

    setBoardHoverClass()
    winningMessageDiv.classList.remove('show')
}

function setBoard(width, height, numPlayer){
    board = document.createElement('div')
    board.classList.add('board')
    board.style.gridTemplateColumns = `repeat(${width}, auto)`
    const numberBoxes = width*height
    for(let i =0; i< numberBoxes; i++){
        box = document.createElement('div')
        box.classList.add('box')
        board.appendChild(box)
    }

    containor.appendChild(board)
}



function handleClick(event){
    const box = event.target
    const currentClass = circleTurn ? "circle" : "x"

    placeMark(box, currentClass)
   console.log( checkWin(box, currentClass))
    if(checkWin(box, currentClass)){
        endGame(false)
    } else if(isDraw()){
        endGame(true)
    } else {
        switchTurns()
        setBoardHoverClass()
    }   
}

function placeMark(box, currentClass){
    box.classList.add(currentClass)
}

function switchTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove("x")
    board.classList.remove("circle")

    if(circleTurn){
        board.classList.add("circle")
    } else{
        board.classList.add("x")
    }
}

function checkWin(box, currentClass){
    const currentIndex = [...boxes].indexOf(box)
    console.log(currentIndex)

    //check horizontal conditions
    if(boxes[currentIndex + 1]?.classList.contains(currentClass) && boxes[currentIndex + 2]?.classList.contains(currentClass) ){
        return true
    }
    if(boxes[currentIndex - 1]?.classList.contains(currentClass) && boxes[currentIndex - 2]?.classList.contains(currentClass) ){
        return true
    }
    if(boxes[currentIndex - 1]?.classList.contains(currentClass) && boxes[currentIndex + 1]?.classList.contains(currentClass) ){
        return true
    }

    //check vertical conditions

    if(boxes[currentIndex + width]?.classList.contains(currentClass) && boxes[currentIndex + width * 2]?.classList.contains(currentClass) ){
        return true
    }

    if(boxes[currentIndex - width]?.classList.contains(currentClass) && boxes[currentIndex - width * 2]?.classList.contains(currentClass) ){
        return true
    }

    if(boxes[currentIndex - width]?.classList.contains(currentClass) && boxes[currentIndex + width]?.classList.contains(currentClass) ){
        return true
    }

    // check diognal conditions

    if(boxes[currentIndex + width + 1]?.classList.contains(currentClass) && boxes[currentIndex + width * 2 + 2]?.classList.contains(currentClass) ){
        return true
    }

    if(boxes[currentIndex - width - 1]?.classList.contains(currentClass) && boxes[currentIndex - width * 2 - 2]?.classList.contains(currentClass) ){
        return true
    }

    if(boxes[currentIndex + width + 1]?.classList.contains(currentClass) && boxes[currentIndex - width - 1]?.classList.contains(currentClass) ){
        return true
    }
}

function isDraw(){
    return [...boxes].every(box=>{
        return box.classList.contains("x") || box.classList.contains("circle")
    })
}

function endGame(draw){
    if(draw){
        winningMessageText.innerText = "Draw"
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }

    winningMessageDiv.classList.add("show")
}