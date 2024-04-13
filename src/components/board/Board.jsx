
//import styles
import styles from './Board.module.css'

//import components to be used
import Instructions from '../instructions/Instructions';
import Overlay from '../overlay/Overlay';
import StartMenu from '../start-menu/StartMenu';
import Tile from '../tile/Tile';
import Controls from '../controls/Controls';
import Winner from '../winner/Winner';

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

    //State variable used for visibility of StartMenu
    const [isStartMenuVisible, setIsStartMenuVisible] = useState(true);

    //Update state variables
    function storeSelectedLevel(numberOfTiles, numberOfTilesPerRow) {

        //Update state variable
        setNrOfTiles(numberOfTiles);
        setNrOfTilesPerRow(numberOfTilesPerRow);

        //Toggle visibility of StartMenu
        setIsStartMenuVisible(!isStartMenuVisible);

        //Reset game
        reset();
    }

    function backToStartMenu() {

        //Toggle visibility of StartMenu
        setIsStartMenuVisible(!isStartMenuVisible);

    }



    /*========================*/
    /*===  TILE COMPONENT ====*/
    /*========================*/

    //Ensures current arrangement is updated
    //IMPORTANT for Tile component.
    useEffect(() => {
        // Generate numbers whenever nrOfTiles or nrOfTilesPerRow changes
        setCurrentArrangementOfNrs(generateNumbers());
    }, [nrOfTiles, nrOfTilesPerRow]);



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
            if (nrOfTiles === 9) {
                solvable = isSolvable9(newArray);
            } else if (nrOfTiles === 16) {
                solvable = isSolvable16(newArray);
            }
            else if (nrOfTiles === 25) {
                solvable = isSolvable25(newArray);
            }

        }

        // Map the array to contain keys with its values and indexes
        const arrayWithKeys = newArray.map((v, i) => ({ value: v, index: i }));

        return arrayWithKeys;
    }

    function isSolvable9(arrangement) {
        // Count the number of inversions considering the position of the empty slot
        let inversions = 0;

        for (let i = 0; i < arrangement.length - 1; i++) {
            for (let j = i + 1; j < arrangement.length; j++) {
                // Skip counting inversions involving the empty slot
                if (arrangement[i] === arrangement.length || arrangement[j] === arrangement.length) {
                    continue;
                }
                if (arrangement[i] > arrangement[j]) {
                    inversions++;
                }
            }
        }

        // The arrangement is solvable if the count of inversions is even
        return inversions % 2 === 0;
    }

    // Check if the arrangement is solvable
    function isSolvable16(arrangement) {
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

    function isSolvable25(arrangement) {
        // Count the number of inversions considering the position of the empty slot
        let inversions = 0;

        for (let i = 0; i < arrangement.length - 1; i++) {
            for (let j = i + 1; j < arrangement.length; j++) {
                // Skip counting inversions involving the empty slot
                if (arrangement[i] === arrangement.length || arrangement[j] === arrangement.length) {
                    continue;
                }
                if (arrangement[i] > arrangement[j]) {
                    inversions++;
                }
            }
        }

        // The arrangement is solvable if the count of inversions is even
        return inversions % 2 === 0;
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

    //Resets current arangement (game) by calling generateNumbers
    function reset() {
        setCurrentArrangementOfNrs(generateNumbers());
    }

    /*===========================*/
    /*===  KEYBOARD CONTROLS ====*/
    /*===========================*/

    // Enables keyboard presses for a game of 9 tiles (3x3 grid)
    function handleKeyDown9(e) {
        // Find the index of the empty tile in the current arrangement array
        const indexOfEmptyTile = currentArrangementOfNrs.find(n => n.value === nrOfTiles).index;

        // If left arrow key is pressed & empty tile is not in the rightmost column
        if (e.keyCode === 37 && indexOfEmptyTile % 3 !== 2)
            // Move the tile adjacent to the empty tile to the left
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfEmptyTile + 1))

        // If up arrow key is pressed & empty tile is not in the bottom row
        if (e.keyCode === 38 && !(indexOfEmptyTile > 5))
            // Move the tile adjacent to the empty tile upwards
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfEmptyTile + 3))

        // If right arrow key is pressed & empty tile is not in the leftmost column
        if (e.keyCode === 39 && indexOfEmptyTile % 3 !== 0)
            // Move the tile adjacent to the empty tile to the right
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfEmptyTile - 1))

        // If down arrow key is pressed & empty tile is not in the top row
        if (e.keyCode === 40 && !(indexOfEmptyTile < 3))
            // Move the tile adjacent to the empty tile downwards
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfEmptyTile - 3))
    }


    //Enables keyboard presses for a game of 16 tiles (4x4 grid)
    function handleKeyDown16(e) {
        // Find the index of last tile in the current arrangement array
        const indexOfLastTile = currentArrangementOfNrs.find(n => n.value === nrOfTiles).index;

        // If left arrow key is pressed & last tile is not in the rightmost column
        if (e.keyCode === 37 && !(indexOfLastTile % 4 === 3))
            // Move the tile adjacent to tile 16 to the left
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfLastTile + 1))

        // If up arrow key is pressed & last tile is not in the bottom row
        if (e.keyCode === 38 && !(indexOfLastTile > 11))
            // Move the tile adjacent to tile 16 upwards
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfLastTile + 4))

        // If right arrow key is pressed & last tile is not in the leftmost column
        if (e.keyCode === 39 && !(indexOfLastTile % 4 === 0))
            // Move the tile adjacent to tile 16 to the right
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfLastTile - 1))

        // If down arrow key is pressed & last tile is not in the top row
        if (e.keyCode === 40 && !(indexOfLastTile < 4))
            // Move the tile adjacent to tile 16 downwards
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfLastTile - 4))

    }

    // Enables keyboard presses for a game of 25 tiles (5x5 grid)
    function handleKeyDown25(e) {
        // Find the index of the empty tile in the current arrangement array
        const indexOfEmptyTile = currentArrangementOfNrs.find(n => n.value === nrOfTiles).index;

        // If left arrow key is pressed & empty tile is not in the rightmost column
        if (e.keyCode === 37 && indexOfEmptyTile % 5 !== 4)
            // Move the tile adjacent to the empty tile to the left
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfEmptyTile + 1));

        // If up arrow key is pressed & empty tile is not in the bottom row
        if (e.keyCode === 38 && !(indexOfEmptyTile > 19))
            // Move the tile adjacent to the empty tile upwards
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfEmptyTile + 5));

        // If right arrow key is pressed & empty tile is not in the leftmost column
        if (e.keyCode === 39 && indexOfEmptyTile % 5 !== 0)
            // Move the tile adjacent to the empty tile to the right
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfEmptyTile - 1));

        // If down arrow key is pressed & empty tile is not in the top row
        if (e.keyCode === 40 && !(indexOfEmptyTile < 5))
            // Move the tile adjacent to the empty tile downwards
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfEmptyTile - 5));
    }



    //useEffect that adds eventslistner keyboard keys, when Board mounts
    useEffect(() => {

        //Call handleKeyDown for any key press

        if (nrOfTiles === 9) {
            document.addEventListener('keydown', handleKeyDown9)
        }
        else if (nrOfTiles === 16) {
            document.addEventListener('keydown', handleKeyDown16)
        }
        else if (nrOfTiles === 25) {
            document.addEventListener('keydown', handleKeyDown25)
        }



        //Clean up code to remove eventlistener when unmounting component
        // Clean up code to remove event listeners when unmounting component
        return () => {
            document.removeEventListener('keydown', handleKeyDown9);
            document.removeEventListener('keydown', handleKeyDown16);
            document.removeEventListener('keydown', handleKeyDown25);
        };

    }) //Runs on every re-render of component


    return (

        <div className={`${styles['game-container']}`}>

            <a href="/">
                <h1>15 Puzzle Game</h1>
            </a>

            <div className={`${nrOfTiles === 9 ? styles['board-wrapper-easy'] :
                nrOfTiles === 16 ? styles['board-wrapper-classic'] :
                    nrOfTiles === 25 ? styles['board-wrapper-difficult'] : ''
                }`}
            >

                {isInstructionsRendering ? <Instructions handleRenderingOfInstructions={handleRenderingOfInstructions} /> : null}

                {isStartMenuVisible ? <StartMenu storeSelectedLevel={storeSelectedLevel} /> : null}



                <Overlay numberOfTiles={nrOfTiles} numberOfTilesPerRow={nrOfTilesPerRow} />

                {/*for each item in the numbers array, render a Tile component*/}
                {currentArrangementOfNrs.map((v, i) =>

                    //Pass all numbers (& their indexes), moveTile and nrOfTiles as props
                    <Tile key={i} number={v} moveTile={moveTile} numberOfTiles={nrOfTiles} />

                )}




            </div>


            <Controls backToStartMenu={backToStartMenu} reset={reset} />

            <Winner backToStartMenu={backToStartMenu} currentArrangementOfNrs={currentArrangementOfNrs} reset={reset} />

        </div>
    )
};

//export component for use
export default Board;
