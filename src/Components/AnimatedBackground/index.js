import React from "react";
import styles from "./styles.module.scss";

function AnimatedBackground(props) {
    return (
        <div className={styles.AnimatedBackground}>
            <div className={styles.AnimatedBackgroundGradient} />
        </div>
    );
}

export default AnimatedBackground;