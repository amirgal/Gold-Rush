const renderer = new Renderer()
let board
let gameActive = false
const socket = io();
     

const startGame = function(rowNum,colNum) {
    gameActive = true
    socket.emit('game start',new GoldRush(rowNum,colNum))
    
    // setTimeout(function(){
    //     endGame()
    // }, 10000)
}

const endGame = function() {
    gameActive = false
    const winner = board.player1.score > board.player2.score ? 'player 1' : 'player 2'
    renderer.renderGameOver(winner)
}

$('#start-button').on('click', function() {
    const [rowNum,colNum] = [$('#row-input').val(),$('#col-input').val()]
    rowNum > 1 && colNum > 1 ?  startGame(rowNum,colNum) : alert('Must enter rows and columns larger then 1')
})

socket.on('game start', function(newBoard){
    const dimensions = newBoard.dimensions  
    board = new GoldRush(dimensions.rows,dimensions.cols)
    board.matrix = newBoard.matrix
    $('#game-container').css({"grid-template-rows": `repeat(${dimensions.rows},1fr)`,
    "grid-template-columns": `repeat(${dimensions.cols},1fr)`})
    renderer.renderBoard(board)
    renderer.renderScores(board)
})

$(document).keypress(function (e) {
    if(!gameActive) {return}
    socket.emit('keypress', e.key)
})

socket.on('key press', function(key){
    switch (key) {
        case 'w':           //w
            board.movePlayer(1, "up")
            break
        case 'd':           //d
            board.movePlayer(1, "right")
            break
        case 's':           //s
            board.movePlayer(1, "down")
            break 
        case 'a':           //a
            board.movePlayer(1, "left")
            break
        case 'i':           //i
            board.movePlayer(2, "up")
            break
        case 'l':           //l
            board.movePlayer(2, "right")
            break
        case 'k':           //k
            board.movePlayer(2, "down")
            break 
        case 'j':           //j
            board.movePlayer(2, "left")
            break 
        default: 
            return   
    }
    renderer.renderBoard(board)
    renderer.renderScores(board)
})

Handlebars.registerHelper('isWall', function (value) {
    return value === 'w';
  });

  Handlebars.registerHelper('isCoin', function (value) {
    return value === 'c';
  });

  Handlebars.registerHelper('isPlayer1', function (value) {
    return value === 1;
  });

  Handlebars.registerHelper('isPlayer2', function (value) {
    return value === 2;
  });