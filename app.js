const WINNING_COMBINATIONS = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
]

const boxes = document.querySelectorAll("[data-box]")
const board = document.querySelector("#board")
const winningMessageDiv = document.querySelector("#winning-message")
const winningMessageText = document.querySelector("#winning-message-text")
const restartButton = document.querySelector("#restartButton")
let circleTurn


startGame()

restartButton.addEventListener("click", startGame)

function startGame(){
    circleTurn = false
    boxes.forEach(box=>{
        box.classList.remove('x')
        box.classList.remove('circle')
        box.addEventListener("click", handleClick, { once: true })
    })

    setBoardHoverClass()
    winningMessageDiv.classList.remove('show')
}



function handleClick(event){
    const box = event.target
    const currentClass = circleTurn ? "circle" : "x"

    placeMark(box, currentClass)

    if(checkWin(currentClass)){
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

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return boxes[index].classList.contains(currentClass)
        })
    })
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