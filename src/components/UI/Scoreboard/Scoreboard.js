import React, { Component } from 'react';
import styles from './ScoreBoard.css';

const MEMORYPOINTS = 'MemoryPoints-'
class ScoreBoard extends Component {
    
    constructor(){
        super();
        this.state = {
            score: 0
        }
        this.setting = {
            4: false,
            6: false,
            8: false
        }
        this.storage = {}
        this.currentScore = 0;
        this.didUpdate = false; 
    }

    componentWillReceiveProps(){

        if(this.setting[this.props.nrOfPairs] !== true) {
            this.resetSetting();
            this.setting[this.props.nrOfPairs] = true;
            this.getScore();
        }
        if(typeof this.props.score !== 'undefined' && this.didUpdate == false) {
            this.didUpdate = true;
            this.updateScore()
        }
        
        
    }

    resetSetting() {
        this.setting = {
            4: false,
            6: false,
            8: false
        }
    }

    componentWillMount(){
        this.getScore();
        this.setting[this.props.nrOfPairs] = true;
    }

    getScore(){
        if(this.gotScore) return
        this.currentScore = localStorage.getItem(MEMORYPOINTS + this.props.nrOfPairs);
        if(this.currentScore === null) this.currentScore = 0;
        this.setState({score: this.currentScore});  
    }

    updateScore() {
        if(this.props.score > this.currentScore){
            console.log('new Highscore Update',this.props.score + ' > ' + this.currentScore);
            localStorage.setItem(MEMORYPOINTS + this.props.nrOfPairs ,this.props.score);
        }
        this.props.score > this.currentScore ? this.setState({score: this.props.score}) : this.setState({score: this.currentScore});
        this.didUpdate = false;
    }
    
    render (){
        return (
            <div className={styles.ScoreBoard}>
                <h2 style={{margin: '0'}}>Top Score </h2>
                <h3>{this.props.nrOfPairs} Pair: {this.state.score}</h3>
            </div>
        )
    }  
}

export default ScoreBoard;