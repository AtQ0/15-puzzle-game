import { useState } from "react";
import styles from "./StartMenu.module.css";

function StartMenu({ storeSelectedLevel }) {
  // Set selected level as classic, by default
  const [selectedLevel, setSelectedLevel] = useState(1);

  // Create new array with 3 elements
  const levelsArray = ["Easy", "Classic", "Difficult"];

  // Create newLevelsArray by mapping a div for each element in levelsArray
  const newLevelsArray = levelsArray.map((level, i) => (
    <div
      key={i}
      className={`${styles["level-btns"]} ${selectedLevel === i ? `${styles["selected-level"]}` : ""}`}
      onClick={() => setSelectedLevel(i)}
    >
      {level}
    </div>
  ));

  //Forward data to Board, on click of Start Game btn
  function forwardDataToBoard() {
    //Send level easy to Board
    if (selectedLevel === 0) {
      storeSelectedLevel(9, 3);
    }
    //Send level classic to Board
    else if (selectedLevel === 1) {
      storeSelectedLevel(16, 4);
    }
    //Send level difficult to Board
    else if (selectedLevel === 2) {
      storeSelectedLevel(25, 5);
    }
  }

  return (
    <div className={`${styles["menu-container"]}`}>
      <h1>Choose your level</h1>

      <div className={`${styles["controls-wrapper"]}`}>
        <div className={styles.level}>{newLevelsArray}</div>

        <div className={styles.play}>
          <div className={styles.btn} onClick={forwardDataToBoard}>
            Start Game
          </div>
        </div>
      </div>
    </div>
  );
}

//Export component for use
export default StartMenu;
