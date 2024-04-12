

//import styles
import styles from './Overlay.module.css'

function Overlay({ numberOfTiles, numberOfTilesPerRow }) {

    //Create new array with n-elements
    const array = new Array(numberOfTiles);

    //Populate all elements in array with undefined
    array.fill();

    //Create newArray by mapping a div for each element in array
    const newArray = array.map((_, i) => <div className={styles.overlay} key={i}></div>)

    return (
        newArray
    );
}

//export component for use
export default Overlay;
