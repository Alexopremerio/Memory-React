import React, { Component } from 'react';
import styles from './Board.css';
import Card from '../../components/Cards/Card';
import shuffle from '../../Utils/Shuffle';
import Controls from '../../components/Controls/Controls';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';
import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Scoreboard from '../../components/UI/Scoreboard/Scoreboard';

const brickStyleWidth = {
    4: {
        width: '650px',
    },
    6: {
        width: '850px',
    },
    8: {
        width: '850px',
    }
}

class Board extends Component {

    constructor () {
        super();
        this.state = {
            pairs: [],
            selectedId: [],
            imagesLodead: false,
            gameComplete: false
        }
        this.selectedImage = [];
        this.turns = 0;
        this.nrOfPairs = 4;
        this.imgLinks = [];
        this.score = 0;
    }

    componentWillMount(){
        this.loadImageData();   
    }

    componentDidUpdate(){
        // check if game is complete
        if(this.state.pairs.length / 2 == this.nrOfPairs) this.gameComplete();  
    }

    setNumberOfCards = (e) => {
        this.nrOfPairs = e.target.value;
        this.reset();  
    }

    loadImageData () {
        this.imgLinks.length = 0;
        axios.get(`https://api.unsplash.com/photos/random?w=200&h=200&c=1531406785823&count=${this.nrOfPairs}&client_id=41d16043dca48c7ada693e3755ca7284cebaf028c71d5012c729947f77d2d147`)
            .then((res => {
                console.log(res.data);
                
                res.data.forEach(img => {
                    this.imgLinks.push(img.urls.thumb);  
                });
                this.loadCards();
            }))
            .catch((error) =>  console.log('Could not retrive Data',error.message)); 
       /* this.imgLinks = [0,1];
        this.loadCards();*/

    }

    

    /*
        Loads cards and add to array
    */
    loadCards () {
        if(this.imgLinks.length !== this.nrOfPairs) console.log('Images out of sync');
        let cards = [];
        for (let index = 0; index < 2; index++) {
            for (let j = 0; j < this.nrOfPairs; j++) {
                cards.push(this.imgLinks[j]);
            }  
        }
        cards = shuffle(cards);
        this.setState({cards :cards, imagesLodead : true}); 
    } 


    /*
        Game Logic
    */
    gameLogic = (cardIndex,image) =>{
       // First pick
        if(this.state.selectedId.length === 0){
            
            if(this.timeElapsed === null) this.startTimer();
            this.selectedImage.push(image);
            this.setState({selectedId: [cardIndex]});
        }
        
        // Second pick
        else if(this.state.selectedId.length === 1) {
            // Check for pair
            if(this.selectedImage[0] === image){
                let pairsArr = [...this.state.pairs];
                pairsArr.push(this.selectedImage[0]);
                pairsArr.push(image);
                this.setState({pairs: pairsArr,selectedId: []})
            }
            // No Pair, reset
            else {
                this.setState({selectedId: [this.state.selectedId[0], cardIndex]});
                setTimeout(() => {
                    this.setState({ selectedId: [] })
                  }, 1500);
            }
            this.turns++;
            this.selectedImage = []; 
        } 
        
    }

    /*
        All cards is turned = complete
    */
    gameComplete (){
        if(this.state.gameComplete) return;
        this.score = this.countScore();
        this.setState({gameComplete: true})
    }

    /*
        calculate score
    */
    countScore(){
        let pairPoints = this.state.pairs.length * 50;
        let turnsPoints = this.turns * 5;
        return pairPoints - turnsPoints;
    }

    /*
        Reset game
    */
    reset = () => {
        this.setState({
            pairs: [],
            selectedId: [],
            imagesLodead: false,
            gameComplete: false
        })
        this.selectedId = [];
        this.turns = 0;
        this.loadImageData();
    }

    renderControls(){
        return <Controls
        pairs={this.state.pairs.length}
        totalPairs={this.nrOfPairs}
        turns={this.turns}
        reset={this.reset}
        setNumberOfCards={this.setNumberOfCards} />
    }

    renderCards(){
        if(this.state.cards){
        return this.bricks = this.state.cards.map((card, index) => {
                return <Card
                            cardCorrect= {this.state.pairs.includes(card)}
                            cardSelected = {this.state.selectedId.includes(index)}
                            action={this.gameLogic} 
                            image={card} 
                            key={index} 
                            id={index}
                            nrOfPairs={this.nrOfPairs}
                            />
            })
        }
    }


    render = () => { 
        
        return (
            <Aux>
                <div className={styles.LeftClip}> </div>
                <div className={styles.RightClip}> </div>
                {this.state.gameComplete ? <Scoreboard score={this.score} nrOfPairs={this.nrOfPairs}/> : <Scoreboard nrOfPairs={this.nrOfPairs}/>}
          
                {this.renderControls()}
                <div className={styles.Board} style={brickStyleWidth[this.nrOfPairs]}>
                    {this.state.gameComplete ? <Modal playAgain={this.reset} show={true} message={this.score}/>  : this.renderCards() } 
                    {!this.state.imagesLodead ? <Loader /> : null}   
                </div>
            </Aux>
        )
    }
}

export default Board;