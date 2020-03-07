/* Write your code below */
class Matrix {
    constructor(numRows,numColumns, constVal) {
        this.matrix = this.generateMatrix(numRows,numColumns, constVal)
    }

    getDimensions() {
        return {rows: this.matrix.length, cols: this.matrix[0].length}
    }

    generateMatrix(numRows, numColumns, constVal) {
        let matrix = []
        let num = 1

        for (let r = 0; r < numRows; r++) {
            matrix.push([])
            for (let c = 0; c < numColumns; c++) {
                constVal ? matrix[r].push(constVal) : matrix[r].push(num++)
            }
        }
        return matrix
    }

    get = function (rowNum, colNum) {
        return this.matrix[rowNum][colNum]
    }
    
    print() {
        for (let i = 0; i < this.matrix.length; i++) {
            let line = ""
            for (let j = 0; j < this.matrix[i].length; j++) {
                line += (this.matrix[i][j] + "\t")
            }
            console.log(line)
        }
    }

    printColumn(colNum) {
        for (let i = 0; i < this.matrix.length; i++) {
            console.log(this.matrix[i][colNum])
        }
    }

    printRow(rowNum) {
        for (let i = 0; i < this.matrix[rowNum].length; i++) {
            console.log(this.matrix[rowNum][i])
        }
    }

    alter(rowNum, colNum, value) {
        this.matrix[rowNum][colNum] = value
    }

    findCoordinate(value) {
        for (let i = 0; i < this.matrix.length; i++) {
            const row = this.matrix[i];
            for (let j = 0; j < row.length; j++) {
                if(this.matrix[i][j] == value){
                    return {x:j, y:i}
                }  
            }
        }
    }
}

// module.exports = Matrix