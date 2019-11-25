import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import {useDispatch} from "react-redux";
import {setPause} from "../actions/main";

function FindPlayerModal (props) {
    const dispatch = useDispatch();

    const [confirmed, setConfirmed] = useState(null);
    const [found, setFound] = useState(false);
    const [randomPlayers, setRandomPlayers] = useState([]);

    const handleConfirm = confirm => {
        setConfirmed(confirm);

        if (!confirm)
        {
            props.setOpen(false);
            dispatch(setPause(false));
        }
        else
        {
            props.setClosingEnabled(false);
        }
    };

    useEffect( () => {
        if (confirmed)
        {
            setRandomPlayers([
                Math.floor(Math.random() * props.players.length + 1),
                Math.floor(Math.random() * props.players.length + 1),
                Math.floor(Math.random() * props.players.length + 1),
            ]);

            setTimeout( () => {
                setFound(true);
            },3000);
        }
    }, [confirmed]);

    return (
        <div>
            {
                confirmed === null
                    ? (
                        <React.Fragment>
                            <div>
                                <h1>You going to spend 500$ to find a player. Are you sure?</h1>
                            </div>
                            <div>
                                <button onClick={ () => handleConfirm(true) }>Yes</button>
                                <button onClick={ () => handleConfirm(false) }>Cancel</button>
                            </div>
                        </React.Fragment>
                    )
                    : !confirmed
                        ? null
                        : found
                            ? (
                                <div>
                                    {
                                        randomPlayers.map( (index, i) => {
                                            return (
                                                <div>
                                                    <h4>Player {i + 1}</h4>
                                                    {
                                                        Object.keys(props.players[index]).map( key => {
                                                            return (
                                                                <span>{key}: {props.players[index][key]}  |   </span>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            );
                                        } )
                                    }
                                </div>
                            )
                            : (
                                <React.Fragment>
                                    finding players..
                                </React.Fragment>
                            )
            }
        </div>
    );
}

export default Modal(FindPlayerModal);