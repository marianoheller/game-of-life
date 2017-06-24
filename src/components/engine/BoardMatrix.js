

export default class BoardMatrix {
    
    constructor (width, height) {
        if( height===undefined && typeof(width) === "object" ){
            const sourceMatrix = width;
            this.matrix = sourceMatrix.map( (r) => r.map( (e) => e ) );
            this.height = sourceMatrix.length;
            this.width = sourceMatrix[0].length;
        }
        else if ( typeof(width) === "number" && typeof(height) === "number" ){
            this.width = width
            this.height = height
            this.matrix = new Array(height)
            for (var i = 0; i < height; ++i) {
                var row = new Array(width)
                this.matrix[i] = row
            }
        }
        else {
            throw new Error(`Error de parametros en constructor. Arguments: ${arguments}`);
        }
    }

    
    reset (value) {
        for (var i = 0; i < this.height; ++i) {
            for (var j = 0; j < this.width; ++j) {
            this.matrix[i][j] = value
            }
        }
    }

    
    loopPosition (i, j) {
        if (i < 0) {
            i -= Math.floor(i / this.height) * this.height
        } else if (i >= this.height) {
            i %= this.height
        }
        if (j < 0) {
            j -= Math.floor(j / this.width) * this.width
        } else if (j >= this.width) {
            j %= this.width
        }
        return {i: i, j: j}
    }

    
    getCell (i, j) {
        var pos = this.loopPosition(i, j)
        return this.matrix[pos.i][pos.j]
    }

    
    setCell (i, j, val) {
        var pos = this.loopPosition(i, j)
        this.matrix[pos.i][pos.j] = val
    }

    
    copyMatrixAt (i, j, source) {
        for (var mi = 0; mi < source.length; ++mi) {
            var row = source[mi]
            for (var mj = 0; mj < row.length; ++mj) {
                this.setCell(i + mi, j + mj, row[mj])
            }
        }
    }

    
    clone () {
        var copy = new BoardMatrix(0, 0)
        copy.width = this.width
        copy.height = this.height
        copy.matrix = new Array(copy.height)
        for (var i = 0; i < copy.height; ++i) {
            copy.matrix[i] = this.matrix[i].slice(0)
        }
        return copy
    }
}
