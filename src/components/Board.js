import React, { Component } from 'react';
import "./Board.css";

export default class BoardContainer extends Component {

   render() {
       const { board, onClickCell } = this.props;
        return (
            <Board 
            board={board}
            onClickCell={onClickCell}
            />
        );
    } 
}

export class Board extends Component {

    getTileClass(val) {
        let ret = "cell ";
        ret += val ? " cell-alive " : " cell-dead ";
        return ret;
    }

    render() {
        const { board, onClickCell } = this.props;

        const cells = board.map( (e, rowIndex) => {
            return (
                <div key={`row${rowIndex}`} className="my-row">
                    { e.map( (cell, cellIndex) => {
                        return  (
                            <div 
                            className={this.getTileClass(cell)} 
                            key={`cell-${rowIndex}-${cellIndex}`} 
                            onClick={onClickCell(rowIndex, cellIndex, cell)}>
                            </div>
                        )
                    })
                    }
                </div>
            )
        });

        return (
        <div className="board-container">
            {cells}
        </div>
        );
    }
}