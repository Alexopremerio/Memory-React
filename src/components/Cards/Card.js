import React from 'react';
import styles from './Card.css';

const cardStyleSize = {
    4: {
        width: '200px',
        height: '200px',
        
    },
    
    6: {
        width: '200px',
        height: '200px',
        
    },
    
    8: {
        width: '150px',
        height: '150px',
        
    }
    
}

const card = (props) => {
    

    const brickClick = () => {
        if(props.cardPair || props.cardSelected ) return;
        props.action(props.id,props.image);
    }

    let imgElm = null;

    if(props.cardCorrect){
        imgElm = <img src={props.image} alt='card' />;
    } else if(props.cardSelected){
        imgElm = <img src={props.image} alt='card' />;
    }
    
    let cardStyle = [styles.Card,styles.Backside, styles.cardSize].join(' ');
    
    
    return (    
        <div 
            className={cardStyle}
            style={cardStyleSize[props.nrOfPairs]}
            onClick={brickClick}>
            {imgElm}
        </div>
    )
}


export default card;