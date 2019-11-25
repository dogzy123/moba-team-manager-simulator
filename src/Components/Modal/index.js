import React, {useState, useEffect, useRef} from "react";
import styles from "./Modal.module.scss";

const Modal = ModalComponent => {
    return function Component(props) {
        const {open, setOpen} = props;
        const [closingEnabled, setClosingEnabled] = useState(true);

        const closingEnabledRef = useRef(closingEnabled); //cuz simple state value doesnt update in listener

        const escListener = e => {
            if (e.keyCode === 27 && closingEnabledRef.current)
            {
                setOpen(false);
                document.body.removeEventListener('keyup', escListener)
            }
        };

        useEffect( () => {
            if (open)
            {
                document.body.addEventListener('keyup', escListener);
            }
            else
            {
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