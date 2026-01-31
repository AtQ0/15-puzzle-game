import styles from './Board.module.css'
import Instructions from '../instructions/Instructions';
import Overlay from '../overlay/Overlay';
import StartMenu from '../start-menu/StartMenu';
import Tile from '../tile/Tile';
import Controls from '../controls/Controls';
import Winner from '../winner/Winner';
import { useEffect, useState } from 'react';


function Board() {

    const [isInstructionsRendering, setIsInstructionsRendering] = useState(true);

    function handleRenderingOfInstructions() {
        setIsInstructionsRendering(!isInstructionsRendering);
    }

    const [nrOfTiles, setNrOfTiles] = useState(16);
    const [nrOfTilesPerRow, setNrOfTilesPerRow] = useState(4);
    const [isStartMenuVisible, setIsStartMenuVisible] = useState(true);

    function storeSelectedLevel(numberOfTiles, numberOfTilesPerRow) {
        setNrOfTiles(numberOfTiles);
        setNrOfTilesPerRow(numberOfTilesPerRow);
        setIsStartMenuVisible(!isStartMenuVisible);
        reset();
    }

    function backToStartMenu() {
        setIsStartMenuVisible(!isStartMenuVisible);
    }

    useEffect(() => {
        setCurrentArrangementOfNrs(generateNumbers());
    }, [nrOfTiles, nrOfTilesPerRow]);



    function generateNumbers() {
        let solvable = false;
        let newArray;

        while (!solvable) {
            newArray = Array.from({ length: nrOfTiles }, (_, i) => i + 1);

            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }

            if (nrOfTiles === 9) {
                solvable = isSolvable9(newArray);
            } else if (nrOfTiles === 16) {
                solvable = isSolvable16(newArray);
            }
            else if (nrOfTiles === 25) {
                solvable = isSolvable25(newArray);
            }

        }

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

    function isSolvable16(arrangement) {
        let inversions = 0;
        for (let i = 0; i < arrangement.length - 1; i++) {
            for (let j = i + 1; j < arrangement.length; j++) {
                if (arrangement[i] === nrOfTiles || arrangement[j] === nrOfTiles) {
                    continue;
                }
                if (arrangement[i] > arrangement[j]) {
                    inversions++;
                }
            }
        }

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

    function handleKeyDown25(e) {
        const indexOfEmptyTile = currentArrangementOfNrs.find(n => n.value === nrOfTiles).index;

        if (e.keyCode === 37 && indexOfEmptyTile % 5 !== 4)
            moveTile(currentArrangementOfNrs.find(n => n.index === indexOfEmptyTile + 1));
        if (e.keyCode === 38 && !(indexOfEmptyTile > 19))
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

            <a href="/15-puzzle-game/">
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
}

//export component for use
export default Board;
