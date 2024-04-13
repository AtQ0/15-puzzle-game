//Import styles
import styles from './Winner.module.css'

//Import react hooks
import { useEffect, useState } from 'react';

//Import components
import Controls from '../controls/Controls';


function Winner({ backToStartMenu, currentArrangementOfNrs, reset }) {


    // Check if Tiles are in their correct slots, from incoming arrangement
    if (!currentArrangementOfNrs.every(n => n.value === n.index + 1)) {
        return null; // Don't render Winner if numbers are in the wrong order
    }

    // State variable used to toggle class .visible
    const [isVisible, setIsVisible] = useState(false);

    // State variable use to toggle class .remove
    const [isRemoved, setIsRemoved] = useState(false);


    // IMPORTANT!!!!
    // Create opacity transition by toggling .visible class during mount
    useEffect(() => {
        setIsVisible(true);

        // Cleanup function to set isVisible to false on unmount
        return () => {
            setIsVisible(false);
        };
    }, []);


    // Toggle isVisible to false by WinnerControls
    function winnerNotVisible() {

        //Remove visible class from Winner component
        setIsVisible(false);

        //Remove Winner by adding class .remove
        setIsRemoved(true);

        //Run function ToggleStartMenu in Board component
        //to bring forth StartMenu and close down Controls component
        backToStartMenu();
    }


    return (

        <div className={`${styles['winner-container']} ${isVisible ? styles.visible : ""} ${isRemoved ? styles.removed : ""}`}>

            <p>You won!</p>

            <div className={`${styles['controls-container']}`}>
                <button onClick={reset}>New Game</button>
                <button onClick={winnerNotVisible}>Back to Menu</button>
            </div>

        </div>

    );
}

//Export for use
export default Winner;
