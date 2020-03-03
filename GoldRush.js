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
        super(rowNum,colNum, ' ')
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
            if(this.matrix[y][x] == ' '){
                this.alter(y,x,'c')
            } else {
                i--
            }
        }
    }

    validMove(playerNum,direction) {
        const otherPlayerNum = playerNum == 1 ? 2 : 1
        const currentPlayer = this[`player${playerNum}`].coords
        const otherPlayer = this[`player${otherPlayerNum}`].coords
        switch(direction) {
            case 'up':
                if(currentPlayer.y == 0 || 
                this.get(currentPlayer.y-1,currentPlayer.x) == otherPlayerNum) {
                    return false
                }
                return true
            case 'down':
                if(currentPlayer.y == this.bounds.y || 
                this.get(currentPlayer.y+1,currentPlayer.x) == otherPlayerNum){
                    return false
                }
                return true
            case 'left':
                if(currentPlayer.x == 0 ||
                this.get(currentPlayer.y,currentPlayer.x-1) == otherPlayerNum) {
                    return false
                }
                return true
            case 'right':
                if(currentPlayer.x == this.bounds.x ||
                this.get(currentPlayer.y,currentPlayer.x+1) == otherPlayerNum){
                    return false
                }
                return true
        }
    }

    moveUp(coords,playerNum) {
        this.alter(coords.y,coords.x,' ')
        if(this.get(coords.y-1,coords.x) == 'c'){
            this[`player${playerNum}`].score += 10
        }
        this.alter(coords.y-1,coords.x,playerNum)
        this[`player${playerNum}`].coords.y--
    }

    moveDown(coords,playerNum) {
        this.alter(coords.y,coords.x,' ')
        if(this.get(coords.y+1,coords.x) == 'c'){
            this[`player${playerNum}`].score += 10
        }
        this.alter(coords.y+1,coords.x,playerNum)
        this[`player${playerNum}`].coords.y++
    }

    moveLeft(coords,playerNum) {
        this.alter(coords.y,coords.x,' ')
        if(this.get(coords.y,coords.x-1) == 'c'){
            this[`player${playerNum}`].score += 10
        }
        this.alter(coords.y,coords.x-1,playerNum)
        this[`player${playerNum}`].coords.x--
    }

    moveRight(coords,playerNum) {
        this.alter(coords.y,coords.x,' ')
        if(this.get(coords.y,coords.x+1) == 'c'){
            this[`player${playerNum}`].score += 10
        }
        this.alter(coords.y,coords.x+1,playerNum)
        this[`player${playerNum}`].coords.x++
    }

    movePlayer(playerNum,direction) {
        if(!this.validMove(playerNum,direction)) {return}
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




