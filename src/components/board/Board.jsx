import styles from "./Board.module.css";

import Instructions from "../instructions/Instructions";
import Overlay from "../overlay/Overlay";
import StartMenu from "../start-menu/StartMenu";
import Tile from "../tile/Tile";
import Controls from "../controls/Controls";
import Winner from "../winner/Winner";

import { useCallback, useEffect, useState } from "react";

function Board() {
  const [isInstructionsRendering, setIsInstructionsRendering] = useState(true);
  const [nrOfTiles, setNrOfTiles] = useState(16);
  const [nrOfTilesPerRow, setNrOfTilesPerRow] = useState(4);
  const [isStartMenuVisible, setIsStartMenuVisible] = useState(true);

  const handleRenderingOfInstructions = useCallback(() => {
    setIsInstructionsRendering((prev) => !prev);
  }, []);

  const isSolvableOddGrid = useCallback((arrangement) => {
    let inversions = 0;

    for (let i = 0; i < arrangement.length - 1; i++) {
      for (let j = i + 1; j < arrangement.length; j++) {
        if (
          arrangement[i] === arrangement.length ||
          arrangement[j] === arrangement.length
        ) {
          continue;
        }
        if (arrangement[i] > arrangement[j]) inversions++;
      }
    }

    return inversions % 2 === 0;
  }, []);

  const isSolvableEvenGrid = useCallback(
    (arrangement) => {
      let inversions = 0;

      for (let i = 0; i < arrangement.length - 1; i++) {
        for (let j = i + 1; j < arrangement.length; j++) {
          if (arrangement[i] === nrOfTiles || arrangement[j] === nrOfTiles) {
            continue;
          }
          if (arrangement[i] > arrangement[j]) inversions++;
        }
      }

      const emptySlotRow =
        Math.floor(arrangement.indexOf(nrOfTiles) / nrOfTilesPerRow) + 1;

      return (inversions + emptySlotRow) % 2 === 0;
    },
    [nrOfTiles, nrOfTilesPerRow],
  );

  const generateNumbers = useCallback(() => {
    let solvable = false;
    let newArray = [];

    while (!solvable) {
      newArray = Array.from({ length: nrOfTiles }, (_, i) => i + 1);

      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }

      if (nrOfTilesPerRow % 2 === 1) {
        solvable = isSolvableOddGrid(newArray);
      } else {
        solvable = isSolvableEvenGrid(newArray);
      }
    }

    return newArray.map((value, index) => ({ value, index }));
  }, [nrOfTiles, nrOfTilesPerRow, isSolvableOddGrid, isSolvableEvenGrid]);

  const [currentArrangementOfNrs, setCurrentArrangementOfNrs] = useState(() =>
    generateNumbers(),
  );

  const reset = useCallback(() => {
    setCurrentArrangementOfNrs(generateNumbers());
  }, [generateNumbers]);

  const storeSelectedLevel = useCallback(
    (numberOfTiles, numberOfTilesPerRow) => {
      setNrOfTiles(numberOfTiles);
      setNrOfTilesPerRow(numberOfTilesPerRow);
      setIsStartMenuVisible((prev) => !prev);
    },
    [],
  );

  const backToStartMenu = useCallback(() => {
    setIsStartMenuVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    setCurrentArrangementOfNrs(generateNumbers());
  }, [nrOfTiles, nrOfTilesPerRow, generateNumbers]);

  const moveTile = useCallback(
    (tile) => {
      const emptyTile = currentArrangementOfNrs.find(
        (n) => n.value === nrOfTiles,
      );
      if (!emptyTile) return;

      const indexOfLastTile = emptyTile.index;
      const possibleIndexes = [
        indexOfLastTile - 1,
        indexOfLastTile + 1,
        indexOfLastTile - nrOfTilesPerRow,
        indexOfLastTile + nrOfTilesPerRow,
      ];

      if (!possibleIndexes.includes(tile.index)) return;

      const newArrangementOfNrs = currentArrangementOfNrs.map((number) => {
        if (number.index !== indexOfLastTile && number.index !== tile.index) {
          return number;
        }
        if (number.value === nrOfTiles) {
          return { value: nrOfTiles, index: tile.index };
        }
        return { value: tile.value, index: indexOfLastTile };
      });

      setCurrentArrangementOfNrs(newArrangementOfNrs);
    },
    [currentArrangementOfNrs, nrOfTiles, nrOfTilesPerRow],
  );

  const handleArrowMove = useCallback(
    (key) => {
      const empty = currentArrangementOfNrs.find((n) => n.value === nrOfTiles);
      if (!empty) return;

      const col = empty.index % nrOfTilesPerRow;
      const bottomRowStart = nrOfTiles - nrOfTilesPerRow;

      let targetIndex = null;

      if (key === "ArrowLeft" && col < nrOfTilesPerRow - 1) {
        targetIndex = empty.index + 1;
      } else if (key === "ArrowUp" && empty.index < bottomRowStart) {
        targetIndex = empty.index + nrOfTilesPerRow;
      } else if (key === "ArrowRight" && col > 0) {
        targetIndex = empty.index - 1;
      } else if (key === "ArrowDown" && empty.index >= nrOfTilesPerRow) {
        targetIndex = empty.index - nrOfTilesPerRow;
      }

      if (targetIndex == null) return;
      const targetTile = currentArrangementOfNrs.find(
        (n) => n.index === targetIndex,
      );
      if (targetTile) moveTile(targetTile);
    },
    [currentArrangementOfNrs, moveTile, nrOfTiles, nrOfTilesPerRow],
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "ArrowUp" &&
        e.key !== "ArrowDown"
      ) {
        return;
      }
      e.preventDefault();
      handleArrowMove(e.key);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleArrowMove]);

  return (
    <div className={styles["game-container"]}>
      <a href="/15-puzzle-game/">
        <h1>15 Puzzle Game</h1>
      </a>

      <div
        className={
          nrOfTiles === 9
            ? styles["board-wrapper-easy"]
            : nrOfTiles === 16
              ? styles["board-wrapper-classic"]
              : nrOfTiles === 25
                ? styles["board-wrapper-difficult"]
                : ""
        }
      >
        {isInstructionsRendering && (
          <Instructions
            handleRenderingOfInstructions={handleRenderingOfInstructions}
          />
        )}

        {isStartMenuVisible && (
          <StartMenu storeSelectedLevel={storeSelectedLevel} />
        )}

        <Overlay
          numberOfTiles={nrOfTiles}
          numberOfTilesPerRow={nrOfTilesPerRow}
        />

        {currentArrangementOfNrs.map((v, i) => (
          <Tile
            key={i}
            number={v}
            moveTile={moveTile}
            numberOfTiles={nrOfTiles}
          />
        ))}
      </div>

      <Controls backToStartMenu={backToStartMenu} reset={reset} />

      <Winner
        backToStartMenu={backToStartMenu}
        currentArrangementOfNrs={currentArrangementOfNrs}
        reset={reset}
      />
    </div>
  );
}

export default Board;
