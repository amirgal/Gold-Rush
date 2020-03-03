class Renderer {
    constructor() {
        this.matrixTemplate = Handlebars.compile($("#matrix-template").html())
        this.scoreTemplate = Handlebars.compile($("#score-template").html())
    }
    renderBoard(board) {
        const newHTML = this.matrixTemplate(board);
        $('#game-container').empty();
        $('#game-container').append(newHTML);
    }

    renderScores(board) {
        const newHTML = this.scoreTemplate(board);
        $('#scores').empty();
        $('#scores').append(newHTML);
    }

    renderGameOver(winner) {
        $('#game-container').append(`<div id="game-over">Game Over!<br>The winner is: ${winner}</div>`)
    }
}

// module.exports = Renderer