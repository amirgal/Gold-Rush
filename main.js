// const Renderer = module.require('./Renderer')
// const GoldRush = module.require('./GoldRush')
const renderer = new Renderer()
let board
let gameActive = false

const startGame = function(rowNum,colNum) {
    gameActive = true
    board = new GoldRush(rowNum,colNum)
    $('#game-container').css({"grid-template-rows": `repeat(${rowNum},1fr)`,
    "grid-template-columns": `repeat(${colNum},1fr)`})
    renderer.renderBoard(board)
    renderer.renderScores(board)
    setTimeout(function(){
        endGame()
    }, 10000)
}

const endGame = function() {
    gameActive = false
    const winner = board.player1.score > board.player2.score ? 'player 1' : 'player 2'
    renderer.renderGameOver(winner)
}

$('#start-button').on('click', function() {
    const [rowNum,colNum] = [$('#row-input').val(),$('#col-input').val()]
    rowNum && colNum ? startGame(rowNum,colNum) : alert('Must enter rows and columns')
})

$(document).keypress(function (e) {
    if(!gameActive) {return}
    switch (e.which) {
        case 119:           //w
            board.movePlayer(1, "up")
            break
        case 100:           //d
            board.movePlayer(1, "right")
            break
        case 115:           //s
            board.movePlayer(1, "down")
            break 
        case 97:           //a
            board.movePlayer(1, "left")
            break
        case 105:           //i
            board.movePlayer(2, "up")
            break
        case 108:           //j
            board.movePlayer(2, "right")
            break
        case 107:           //k
            board.movePlayer(2, "down")
            break 
        case 106:           //l
            board.movePlayer(2, "left")
            break 
        default: 
            return   
    }
    renderer.renderBoard(board)
    renderer.renderScores(board)
})