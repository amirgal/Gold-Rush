// const Renderer = module.require('./Renderer')
// const GoldRush = module.require('./GoldRush')

const renderer = new Renderer()
const board = new GoldRush(5,5)

renderer.renderBoard(board)
renderer.renderScores(board)

$(document).keypress(function (e) {
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
    }
    renderer.renderBoard(board)
    renderer.renderScores(board)
})