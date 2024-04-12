
//import styles
import styles from './Controls.module.css'


function Controls({ backToStartMenu, reset }) {


    return (
        <div className={`${styles['button-container']}`}>
            <button onClick={reset}>New Game</button>
            <button onClick={backToStartMenu}>Back to Menu</button>
        </div>
    )
}

//Export for use
export default Controls;
