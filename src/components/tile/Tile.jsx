// Import styles
import { useEffect } from 'react';
import styles from './Tile.module.css';

function Tile({ number, moveTile, numberOfTiles }) {

    // Define getSlotPrefix function inside Tile component
    function getClassPrefix(numberOfTiles) {
        if (numberOfTiles === 9) {
            return 'easy';
        }
        if (numberOfTiles === 16) {
            return 'classic';
        }
        if (numberOfTiles === 25) {
            return 'difficult';
        }
        return 'default'; // Change this to a default prefix if needed
    }

    // Determine the class prefix for the number class based on the value of numberOfTiles
    const classPrefix = getClassPrefix(numberOfTiles);




    return (
        <div
            className={`${styles[`number-${classPrefix}`]} ${number.value === numberOfTiles ? styles.disabled : ''}

            ${styles[`slot-${classPrefix}-${number.index}`]}



            ${number.value === number.index + 1 ? styles.correct : ''}`}
            // Pass number to moveTile in Board
            onClick={() => moveTile(number)}
        >
            {/* Render incoming value from number in props */}
            <div className={`${styles[`number-wrapper-${classPrefix}`]}`}>
                {number.value}
            </div>

        </div>
    );
}

// Export component for use
export default Tile;
