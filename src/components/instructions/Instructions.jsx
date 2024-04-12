//import styles
import styles from './Instructions.module.css'

function Instructions({ handleRenderingOfInstructions }) {

    return (
        <div className={`${styles['instructions-container']}`}>
            <div className={`${styles['logo-wrapper']}`}>

                <svg className={`${styles['svg-logo']}`} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1642.13 1625.04">
                    <path className={`${styles['cls-1']}`} d="m1181.6,699.29c38.46-30.07,72.11-96.44-12.17-133.99-81.49-36.31-118.38,22.24-112.37,49.42,7.95,35.95-12.63,85.56-61.68,60.98-49.05-24.58-171.67-86.03-171.67-86.03l-6.48-3.41,1.01-1.88s61.45-122.62,86.03-171.67c24.58-49.05-25.03-69.64-60.98-61.68-27.18,6.01-85.72-30.88-49.42-112.37,37.55-84.28,103.92-50.63,133.99-12.17,37.78,48.32,70.26,4.53,70.26,4.53l102.32-204.18,491.7,246.41c26.81,13.44,37.66,46.07,24.22,72.88l-257.78,514.38-181.51-90.96s-43.8-32.47,4.53-70.26Z" />
                    <path className={`${styles['cls-1']}`} d="m552.5,617.27c-44.12-20.91-118.52-21.26-114.33,70.91,4.05,89.12,72.92,95.87,94.52,78.32,28.58-23.22,82.15-27.04,82.15,27.82v192.02l-.06,2.13-.89-.02h-192.02c-54.86,0-51.04,53.58-27.82,82.15,17.55,21.61,10.8,90.47-78.32,94.52-92.17,4.19-91.82-70.22-70.91-114.33,26.27-55.43-27.43-64.84-27.43-64.84H20V415.76c0-29.99,24.31-54.31,54.31-54.31h543.03v228.39s-9.41,53.7-64.84,27.43Z" />
                    <path className={`${styles['cls-1']}`} d="m217.38,985.97s53.7,9.41,27.43,64.84c-20.91,44.12-21.26,118.52,70.91,114.33,89.12-4.05,95.87-72.92,78.32-94.52-23.22-28.58-27.04-82.15,27.82-82.15h192.02l.89.02-.1,3.18v192.02c0,54.86,53.58,51.04,82.15,27.82,21.61-17.55,90.47-10.8,94.52,78.32,4.19,92.17-70.22,91.82-114.33,70.91-55.43-26.27-64.84,27.43-64.84,27.43v216.88H74.31c-29.99,0-54.31-24.31-54.31-54.31v-564.77h197.38Z" />
                    <path className={`${styles['cls-1']}`} d="m677.03,1360.73c44.12,20.91,118.52,21.26,114.33-70.91-4.05-89.12-72.92-95.87-94.52-78.32-28.58,23.22-82.15,27.04-82.15-27.82v-192.02l.1-3.18,7.32.14h192.02c54.86,0,51.04-53.58,27.82-82.15-17.55-21.61-10.8-90.47,78.32-94.52,92.17-4.19,91.82,70.22,70.91,114.33-26.27,55.43,27.43,64.84,27.43,64.84h203.03v559.62c0,29.99-24.31,54.31-54.31,54.31h-555.14v-216.88s9.41-53.7,64.84-27.43Z" />
                </svg>

            </div>

            <div className={`${styles['instructions-wrapper']}`}>
                <p className={styles.instructions}>
                    <span>Your objective is to rearrange numbered </span>
                    <span>tiles, aiming to organize them sequentially</span>
                    <span> from the smallest number to the largest,</span>
                    <span>with one space left empty. You can slide</span>
                    <span>tiles either by using arrow keys or by </span>
                    <span>clicking on adjacent tiles.</span>
                </p>
            </div>

            <div className={`${styles['btn-wrapper']}`}>


                <button className={`${styles['play-btn']}`} onClick={handleRenderingOfInstructions}>PLAY</button>
            </div>
        </div>
    )
}

//export component for use
export default Instructions;
