import React, {useState, useEffect, useRef} from "react";
import styles from "./Modal.module.scss";
import {useDispatch} from "react-redux";
import {setPause, setModalOpen} from "../../actions/main";

const Modal = ModalComponent => {
    return function Component(props) {
        const dispatch = useDispatch();
        const {open, setOpen, canClose} = props;
        const [closingEnabled, setClosingEnabled] = useState(props.hasOwnProperty('canClose') ? canClose : true);

        const closingEnabledRef = useRef(closingEnabled); //cuz simple state value doesnt update in listener

        const escListener = e => {
            if (e.keyCode === 27 && closingEnabledRef.current)
            {
                setOpen(false);
                dispatch(setPause(false));

                document.body.removeEventListener('keyup', escListener)
            }
        };

        useEffect( () => {
            if (open)
            {
                dispatch( setModalOpen(true) );
                if (closingEnabled)
                {
                    document.body.addEventListener('keyup', escListener);
                }
            }
            else
            {
                dispatch( setModalOpen(false) );
                document.body.removeEventListener('keyup', escListener);
            }

            return () => {
                document.body.removeEventListener('keyup', escListener);
            }
        }, [open]);

        useEffect( () => {
            closingEnabledRef.current = closingEnabled;
        }, [closingEnabled] );

        return (
            open
                ? (
                    <React.Fragment>
                        <div className={styles.backdrop} />
                        <div className={styles.modal}>
                            <div className={styles.modalContainer}>
                                <ModalComponent {...props} setClosingEnabled={setClosingEnabled} />
                            </div>
                        </div>
                    </React.Fragment>
                )
                : null
        );
    }
};

export default Modal;