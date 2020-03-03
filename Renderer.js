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
        $('#footer').empty();
        $('#footer').append(newHTML);
    }
}

// module.exports = Renderer