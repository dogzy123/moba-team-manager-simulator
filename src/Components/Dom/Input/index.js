import React from "react";
import styles from "./styles.module.scss";

function Input (props) {
    const { onChange, value, title } = props;

    return (
        <div className={styles.inputBlock}>
            <div className={styles.inputContainer}>
                {
                    title
                        ? (
                            <div className={styles.inputLabel}>
                                { title }
                            </div>
                        )
                        : null
                }
                <div className={styles.inputWrapper}>
                    <input
                        value={value || ''}
                        onChange={ e => onChange && typeof onChange === 'function' ? onChange(e) : () => {} }
                        className={styles.modalInput} type='text'
                    />
                </div>
            </div>
        </div>
    );
}

export { Input as default };