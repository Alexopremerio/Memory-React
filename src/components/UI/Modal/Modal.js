import React from 'react';
import styles from './Modal.css';

const modal = (props) => {
        return (
            <div className={styles.backdrop} >
            <div className={styles.Modal}>
                <span><h1 className={styles.Message}>Score: {props.message}</h1></span>
                <button onClick={props.playAgain}className={styles.PlayAgain}> Play Again </button>
            </div>
        </div>
       
     
        )
        
}

export default modal;
