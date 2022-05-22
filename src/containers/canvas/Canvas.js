import React from 'react';
import './canvas.css';
import { Items } from '../../containers';

const Canvas = () => {
    return (
        <div className="canvas">
            <div className="canvas-container">
                <Items />
            </div>
        </div>
    )
}

export default Canvas;