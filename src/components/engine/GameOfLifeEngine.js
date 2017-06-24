import BoardMatrix from './BoardMatrix';


export default class GameOfLifeEngine {

    constructor(width, height) {
        this.states = [];
        ['DEAD', 'ALIVE', 'INDESTRUCTIBLE'].forEach(function (name, index) {
            this.states[name] = index;
            this.states.push(index);
        }.bind(this));

        if( height===undefined && typeof(width) === "object" ){
            const sourceMatrix = width;
            this.BoardMatrix = new BoardMatrix(sourceMatrix);
            this.matrix = this.BoardMatrix.matrix;
        }
        else if ( typeof(width) === "number" && typeof(height) === "number" ){   
            this.BoardMatrix = new BoardMatrix(width, height);
            this.BoardMatrix.reset(this.states.DEAD)
            this.matrix = this.BoardMatrix.matrix;
        }
        else {
            throw new Error(`Error de parametros en constructor. Arguments: ${arguments}`);
        }
        
    }

    insertMatrixAt( i, j, source) {
        this.BoardMatrix.copyMatrixAt (i, j, source);
    }

    evolve( i, j) {
        var state = this.BoardMatrix.getCell(i, j)
        // indestructible cells will always stay indestructible, so skip
        // calculating neighbour sum for them
        if (state === this.states.INDESTRUCTIBLE) {
            return state
        }
        var aliveNeighbours = this.aliveNeighbours(i, j) 
        switch (state) {
            case this.states.ALIVE:
            // death by under-population / over-population
            if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                return this.states.DEAD
            }
            // otherwise it stays alive
            return this.states.ALIVE
            case this.states.DEAD:
                // birth by reproduction
                if (aliveNeighbours === 3) {
                    return this.states.ALIVE
                }
                // otherwise stays dead
                return this.states.DEAD
            default:
            throw new Error('Invalid evolve state: ' + state)
        }
    }

    tick() {
        var nextGameState = this.BoardMatrix.clone()
        for (var i = 0; i < this.BoardMatrix.height; ++i) {
            for (var j = 0; j < this.BoardMatrix.width; ++j) {
                var nextCellState = this.evolve(i, j)
                nextGameState.setCell(i, j, nextCellState)
            }
        }
        this.matrix = nextGameState.matrix
    }

    aliveNeighbours( i, j) {
        var aliveNeighbours = 0
        for (var oi = -1; oi <= 1; ++oi) {
            for (var oj = -1; oj <= 1; ++oj) {
                if (oi === 0 && oj === 0) {
                    continue;
                }
                var neighbourState = this.BoardMatrix.getCell(i + oi, j + oj)
                if (neighbourState !== this.states.DEAD) {
                    ++aliveNeighbours
                }
            }
        }
        return aliveNeighbours
    }
}


