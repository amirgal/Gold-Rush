// const Matrix = module.require('./Matrix')

class player {
    constructor(playerNum) {
        this.playerNum = playerNum
        this.coords = {x:0, y:0}
        this.score = 0
    }
}

class GoldRush extends Matrix {
    constructor(rowNum,colNum) {
        super(rowNum,colNum, '.')
        this.bounds = {y: rowNum-1, x: colNum-1}
        this.player1 = new player(1)
        this.player2 = new player(2)
        this.player2.coords = {x: colNum-1, y: rowNum-1}
        this.alter(0,0,1)
        this.alter(rowNum-1,colNum-1,2)
        this.setCoins(rowNum,colNum)
    }

    setCoins(rowNum,colNum){
        const numOfCoins = Math.floor((rowNum*colNum)/2)
        for (let i = 0; i < numOfCoins; i++) {
            const y = Math.floor(Math.random()*rowNum)
            const x = Math.floor(Math.random()*colNum)
            if(this.matrix[y][x] == '.'){
                this.alter(y,x,'c')
            } else {
                i--
            }
        }
    }

    inBounds(playerNum,direction) {
        const otherPlayerNum = playerNum == 1 ? 2 : 1
        const currentPlayer = this[`player${playerNum}`].coords
        const otherPlayer = this[`player${otherPlayerNum}`].coords
        switch(direction) {
            case 'up':
                if(currentPlayer.y-1 == otherPlayer.y && currentPlayer.x == otherPlayer.x ) {
                    return false
                }
                return currentPlayer.y == 0 ? false : true
            case 'down':
                if(currentPlayer.y+1 == otherPlayer.y && currentPlayer.x == otherPlayer.x ){
                    return false
                }
                return currentPlayer.y == this.bounds.y ? false : true
            case 'left':
                if(currentPlayer.y == otherPlayer.y && currentPlayer.x-1 == otherPlayer.x ) {
                    return false
                }
                return currentPlayer.x == 0 ? false : true
            case 'right':
                if(currentPlayer.y == otherPlayer.y && currentPlayer.x+1 == otherPlayer.x ){
                    return false
                }
                return currentPlayer.x == this.bounds.x ? false : true
        }
    }

    moveUp(coords,playerNum) {
        this.alter(coords.y,coords.x,'.')
        if(this.get(coords.y-1,coords.x) == 'c'){
            this[`player${playerNum}`].score += 10
        }
        this.alter(coords.y-1,coords.x,playerNum)
        this[`player${playerNum}`].coords.y--
    }

    moveDown(coords,playerNum) {
        this.alter(coords.y,coords.x,'.')
        if(this.get(coords.y+1,coords.x) == 'c'){
            this[`player${playerNum}`].score += 10
        }
        this.alter(coords.y+1,coords.x,playerNum)
        this[`player${playerNum}`].coords.y++
    }

    moveLeft(coords,playerNum) {
        this.alter(coords.y,coords.x,'.')
        if(this.get(coords.y,coords.x-1) == 'c'){
            this[`player${playerNum}`].score += 10
        }
        this.alter(coords.y,coords.x-1,playerNum)
        this[`player${playerNum}`].coords.x--
    }

    moveRight(coords,playerNum) {
        this.alter(coords.y,coords.x,'.')
        if(this.get(coords.y,coords.x+1) == 'c'){
            this[`player${playerNum}`].score += 10
        }
        this.alter(coords.y,coords.x+1,playerNum)
        this[`player${playerNum}`].coords.x++
    }

    movePlayer(playerNum,direction) {
        if(!this.inBounds(playerNum,direction)) {return}
        const coords = this[`player${playerNum}`].coords
        switch(direction) {
            case 'up':
                this.moveUp(coords,playerNum)
                break
            case 'down':
                this.moveDown(coords,playerNum)
                break
            case 'left':
                this.moveLeft(coords,playerNum)
                break
            case 'right':
                this.moveRight(coords,playerNum)
                break
        }
        return
    }
}

// module.exports = GoldRush
// const board = new GoldRush(5,5)

// board.print()
// board.movePlayer(1,'right')
// board.movePlayer(1,'right')
// console.log('------------');

// board.print()
// console.log(board.player1.score);



