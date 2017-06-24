import React, { Component } from 'react';

import GameOfLifeEngine from './engine/GameOfLifeEngine';
import BoardContainer from './Board';

import { gameConfig } from '../config';
import './GameOfLife.css';

export default class GameOfLifeContainer extends Component {

    constructor(props) {
        super(props);

        const engine = new GameOfLifeEngine( gameConfig.width, gameConfig.heigth );
        engine.insertMatrixAt( 0, 0, (new Array(gameConfig.heigth)).fill(0).map( (r) => {
            return (new Array(gameConfig.width)).fill(0).map( (c) => {
                return Math.round(Math.random()*10) % 2;
            });
        }) );
        this.state = {
            contTicks: 0,
            board: engine.matrix,
            interval: null,
        };
    }

    onStart() {
        const interval = setInterval( this.tick.bind(this), gameConfig.timeoutMS );
        this.setState( {
            ...this.state,
            interval: interval,
        })
    }

    onPause() {
        const { interval } = this.state;
        clearInterval(interval);
        this.setState( {
            ...this.state,
            interval: null,
        })
    }

    onClear() {
        const engine = new GameOfLifeEngine( gameConfig.width, gameConfig.heigth );
        const { interval } = this.state;
        clearInterval(interval);
        this.setState( {
            board: engine.matrix,
            contTicks: 0,
            interval: null,
        });
    }

    tick() {
        const { board } = this.state;
        const engine = new GameOfLifeEngine( board );
        engine.tick();
        const newBoard = engine.matrix;
        this.setState( {
            ...this.state,
            board: newBoard,
            contTicks: this.state.contTicks + 1,
        });
    }

    onClickCell(row, column, currentValue) {
        return function () {
            const engine = new GameOfLifeEngine( this.state.board );
            engine.insertMatrixAt(row, column, [
                [currentValue===1 ? 0 : 1]
            ]);
            const newBoard = engine.matrix;
            this.setState( {
                ...this.state,
                board: newBoard,
            });
        }.bind(this)
    }

    render() {
        const { board, interval, contTicks } = this.state;
        return (
            <GameOfLife 
            board={board}
            onClickCell={this.onClickCell.bind(this)}
            onClear={this.onClear.bind(this)}
            onStart={this.onStart.bind(this)}
            onPause={this.onPause.bind(this)}
            isRunning={ interval ? true : false }
            contTicks={contTicks}
            />
        );
    }
}


export class GameOfLife extends Component {

    handleStartPauseClick() {
        const { isRunning, onPause, onStart } = this.props;
        isRunning ? onPause() : onStart();
    }

    render() {
        const { board, contTicks, isRunning ,onClickCell, onClear } = this.props;

        return (
            <div className="container">
                <div className="header">
                    <h1>Game of Life</h1>
                    <h6>Cycles: {contTicks}</h6>
                    <button onClick={this.handleStartPauseClick.bind(this)}>
                        {isRunning ? "Pause" : "Start"}
                    </button>
                    <button onClick={onClear}>
                        Clear
                    </button>
                </div>
                <BoardContainer 
                board={board}
                onClickCell={onClickCell}
                />
            </div>
        );
    } 
}