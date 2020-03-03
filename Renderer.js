class Renderer {
    constructor() {
        this.matrixTemplate = Handlebars.compile($("#matrix-template").html())

    }
    renderBoard(board) {
        const newHTML = this.matrixTemplate(board);
        $('#game-container').empty();
        $('#game-container').append(newHTML);
    }
}

// module.exports = Renderer