
//import styles
import styles from './Board.module.css'

//import components to be used
import Instructions from '../instructions/Instructions';
import Overlay from '../overlay/Overlay';
import StartMenu from '../start-menu/StartMenu';
import Tile from '../tile/Tile';

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





    /*=========================*/
    /*===  BOARD COMPONENT ====*/
    /*=========================*/

    //Generate array with numbers for tiles
    function generateNumbers() {
        let solvable = false;
        let newArray;

        // Generating arrangements until solvable
        while (!solvable) {
            // Create the goal state: numbers from 1 to 9, 16, 23
            newArray = Array.from({ length: nrOfTiles }, (_, i) => i + 1);

            // Shuffle the array using valid moves to ensure solvability
            for (let i = newArray.length - 1; i > 0; i--) {
                // Perform valid moves by swapping tiles adjacent to the empty slot
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }

            // Check if the arrangement is solvable
            solvable = isSolvable(newArray);
        }

        // Map the array to contain keys with its values and indexes
        const arrayWithKeys = newArray.map((v, i) => ({ value: v, index: i }));

        return arrayWithKeys;
    }


    // Check if the arrangement is solvable
    function isSolvable(arrangement) {
        // Count number of inversions considering the position of the empty slot
        let inversions = 0;
        for (let i = 0; i < arrangement.length - 1; i++) {
            for (let j = i + 1; j < arrangement.length; j++) {
                if (arrangement[i] === nrOfTiles || arrangement[j] === nrOfTiles) {
                    // Skip counting inversions involving the empty slot
                    continue;
                }
                if (arrangement[i] > arrangement[j]) {
                    inversions++;
                }
            }
        }

        // If nr of inversions + row number of the empty slot is even, the arrangement is solvable
        const emptySlotRow = Math.floor(arrangement.indexOf(nrOfTiles) / nrOfTilesPerRow) + 1;
        return (inversions + emptySlotRow) % 2 === 0;
    }

    //Track current arrangement of numbers in the game
    const [currentArrangementOfNrs, setCurrentArrangementOfNrs] = useState(generateNumbers());

    //Manage movement of tiles
    function moveTile(tile) {

        // Find the index of empty/last tile in the current arrangement
        const indexOfLastTile = currentArrangementOfNrs.find(n => n.value === nrOfTiles).index;

        //Check if index of provided tile is adjacent to index of empty/last tile
        if (![indexOfLastTile - 1, indexOfLastTile + 1, indexOfLastTile - nrOfTilesPerRow, indexOfLastTile + nrOfTilesPerRow].includes(tile.index)) {
            // Exit function if provided tile is not adjacent to empty/last tile
            return;
        }

        // If clicked tile is adjacent to empty/last tile, swap positions
        const newArrangementOfNrs = currentArrangementOfNrs.map(number => {
            if (number.index !== indexOfLastTile && number.index !== tile.index) {
                // Return unchanged, if not empty/last tile & not clicked tile
                return number;
            } else if (number.value === nrOfTiles) {
                // Update the position of last tile to index of clicked tile
                return { value: nrOfTiles, index: tile.index };
            }
            // Update the position of clicked tile to index of last tile
            return { value: tile.value, index: indexOfLastTile };
        });

        // Update the current arrangement with new arrangement
        setCurrentArrangementOfNrs(newArrangementOfNrs);
    }





    console.log(generateNumbers())


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

                {/*for each item in the numbers array, render a Tile component*/}
                {currentArrangementOfNrs.map((v, i) =>

                    //Pass all numbers (& their indexes), moveTile and nrOfTiles as props
                    <Tile key={i} number={v} moveTile={moveTile} numberOfTiles={nrOfTiles} />

                )}






            </div>

        </div>
    )
};

//export component for use
export default Board;
