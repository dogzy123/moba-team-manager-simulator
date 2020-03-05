import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {setPause} from "../../actions/main";

function GameMenu (props) {
    const dispatch = useDispatch();
    const { paused, modalOpen } = useSelector( state => ({
        paused: state.paused,
        modalOpen: state.modalOpen,
    }) );
    const [gameMenuOpen, setGameMenuOpen] = useState(false);

    const escMenu = (e) => {
        if (e.keyCode === 27 && !modalOpen)
        {
            setGameMenuOpen(!gameMenuOpen);
            dispatch( setPause(!paused) );
        }
    };

    const handleExit = e => {
        window.remote.app.quit();
    };

    useEffect( () => {
        window.addEventListener('keydown', escMenu);

        return () => {
            window.removeEventListener('keydown', escMenu);
        };
    }, [gameMenuOpen, paused, modalOpen] );

    return (
        <React.Fragment>
            {
                gameMenuOpen
                    ? (
                        <div className={styles.gameMenu}>
                            <nav className={styles.gameMenuNav}>
                                <ul className={styles.gameMenuNavList}>
                                    <li className={styles.gameMenuNavListItem}>
                                        <div className={styles.gameMenuOptionContainer}>
                                            <span className={styles.gameMenuOptionCaption}>Continue</span>
                                        </div>
                                    </li>
                                    <li className={styles.gameMenuNavListItem}>
                                        <div
                                            className={styles.gameMenuOptionContainer}
                                            onClick={handleExit}
                                        >
                                            <span
                                                className={classNames(styles.gameMenuOptionCaption, styles.exit)}
                                            >
                                                Exit
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )
                    : null
            }
            <div className={classNames(styles.gameMenuBackdrop, gameMenuOpen ? styles.active : null)} />
        </React.Fragment>
    );
}

export { GameMenu as default };