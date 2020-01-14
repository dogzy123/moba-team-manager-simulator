import React, {useState, useCallback, useEffect, useRef} from "react";
import styles from "./styles.module.scss";

let colorPicker;

const getMousePosition = e => {
    const cvsRect = e.target.getBoundingClientRect();

    return [e.pageX - cvsRect.left, e.pageY - cvsRect.top];
};

const drawLine = (currPos, newPos, ctx) => {
    ctx.beginPath();
    ctx.moveTo(currPos[0], currPos[1]);
    ctx.lineTo(newPos[0], newPos[1]);
    ctx.closePath();
    ctx.stroke();
};

function Canvas () {
    const [mousePosition, setMousePosition] = useState([null, null]);
    const [isPainting, setIsPainting] = useState(false);
    const [color, setColor] = useState("#000");

    const pickerRef = useRef(null);

    const handlePaint = useCallback( (e) => {
        const coords = getMousePosition(e);

        if (coords)
        {
            setIsPainting(true);
            setMousePosition( coords );
        }
    }, [] );

    const paint = useCallback( (e) => {
        if (isPainting)
        {
            const newCoords = getMousePosition(e);
            const ctx = e.target.getContext('2d');

            ctx.strokeStyle = color;
            ctx.lineJoin = 'round';
            ctx.lineWidth = 8;

            drawLine(mousePosition, newCoords, ctx);

            setMousePosition(newCoords);
        }
    }, [isPainting, mousePosition] );

    const exitPaint = useCallback( () => {
        setIsPainting(false);
        setMousePosition([null, null]);
    }, [] );

    useEffect( () => {
        colorPicker = new window.CP(pickerRef.current, "mouseup");
        colorPicker.set(color);
        colorPicker.on("change", pickerColor => {
            setColor(`#${pickerColor}`);
        });
    }, [] );

    return (
        <React.Fragment>
            <canvas
                className={styles.canvas}
                width={256}
                height={256}
                onMouseDown={handlePaint}
                onMouseMove={paint}
                onMouseLeave={exitPaint}
                onMouseUp={exitPaint}
            />
            <input
                ref={pickerRef}
                readOnly={true}
                className={styles.colorPickerInput}
                style={{background: color}}
            />
        </React.Fragment>
    );
}

export { Canvas as default };