import PropTypes from "prop-types";
import styles from "./Controls.module.css";

function Controls({ backToStartMenu, reset }) {
  return (
    <div className={styles["button-container"]}>
      <button onClick={reset}>New Game</button>
      <button onClick={backToStartMenu}>Back to Menu</button>
    </div>
  );
}

Controls.propTypes = {
  backToStartMenu: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Controls;
