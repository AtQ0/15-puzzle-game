
//import styles
import styles from './Board.module.css'

//import components to be used
import Instructions from '../instructions/Instructions';
import Overlay from '../overlay/Overlay';
import StartMenu from '../start-menu/StartMenu';

//Import hooks from react
import { useEffect, useState } from 'react';


function Board() {

    /*================================*/
    /*===  INSTRUCTIONS COMPONENT ====*/
    /*================================*/

    //State variable used for toggling the rendering of Instructions component
    const [isInstructionsRendering, setIsInstructionsRendering] = useState(true);

    //Toggle rendering of Instructions component
    function handleRenderingOfInstructions() {
        setIsInstructionsRendering(!isInstructionsRendering);
    }

    /*=============================*/
    /*===  STARTMENU COMPONENT ====*/
    /*=============================*/

    //State variable used for tracking nr of tiles
    const [nrOfTiles, setNrOfTiles] = useState(16);
    const [nrOfTilesPerRow, setNrOfTilesPerRow] = useState(4);

    //Update state variables
    function storeSelectedLevel(numberOfTiles, numberOfTilesPerRow) {
        setNrOfTiles(numberOfTiles);
        setNrOfTilesPerRow(numberOfTilesPerRow);
    }


    /*===========================*/
    /*===  OVERLAY COMPONENT ====*/
    /*===========================*/


    return (

        <div className={`${styles['game-container']} `}>

            <a href="/">
                <h1>15 Puzzle Game</h1>
            </a>

            <div className={`${nrOfTiles === 9 ? styles['board-wrapper-easy'] :
                    nrOfTiles === 16 ? styles['board-wrapper-classic'] :
                        nrOfTiles === 25 ? styles['board-wrapper-difficult'] : ''
                }`}
            >

                {isInstructionsRendering ? <Instructions handleRenderingOfInstructions={handleRenderingOfInstructions} /> : null}

                <StartMenu storeSelectedLevel={storeSelectedLevel} />

                <Overlay numberOfTiles={nrOfTiles} numberOfTilesPerRow={nrOfTilesPerRow} />








            </div>

        </div>
    )
};

//export component for use
export default Board;
