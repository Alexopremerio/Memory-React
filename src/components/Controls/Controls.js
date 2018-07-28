import React from 'react';
import styles from './Controls.css';


const controls = (props) => {

    return (
        
        <div className={styles.controlsWrapper}>
            <div className={styles.controlsDiv}>
            <select className={styles.list} onChange={props.setNumberOfCards}>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                
            </select>
            </div>
           
            <span className={styles.turns}> Turns : {props.turns}</span>
            <span className={styles.turns}> Paris : {props.pairs / 2 + '/' + props.totalPairs}</span>
            
            <div className={styles.restartDiv}>
            <button color="success" className={styles.restartBtn} onClick={props.reset}>Restart</button>
            </div>
        </div>
    )
}

export default controls;