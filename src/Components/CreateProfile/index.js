import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import Modal from "../Modal";
import Input from "../Dom/Input";
import Canvas from "./Canvas";
import {useDispatch} from "react-redux";
import {createProfile} from "../../actions/main";

function CreateProfile (props) {
    const dispatch = useDispatch();
    const [playerName, setPlayerName] = useState('');
    const [teamName, setTeamName] = useState('');

    const handlePlayerName = e => {
        setPlayerName(e.target.value);
    };

    const handleTeamName = e => {
        setTeamName(e.target.value);
    };

    const handleContinue = () => {
        dispatch( createProfile({managerName: playerName, teamName, teamLogo:''}) );
    };

    return (
        <React.Fragment>
            <div className={styles.newGameRow}>
                <h1 className={styles.modalTitle}>New Game</h1>
            </div>
            <div className={styles.newGameRow}>
                <Input
                    title={<span className={styles.label}>Player's name</span>}
                    onChange={handlePlayerName}
                    value={playerName}
                />
            </div>
            <div className={styles.newGameRow}>
                <Input
                    title={<span className={styles.label}>Team name</span>}
                    onChange={handleTeamName}
                    value={teamName}
                />
            </div>
            <div className={styles.newGameRow}>
                <Canvas/>
            </div>
            <div className={styles.newGameRow}>
                <button onClick={handleContinue}>continue</button>
            </div>
        </React.Fragment>
    );
}

export default Modal(CreateProfile);