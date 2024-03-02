import React, { useState } from 'react';
import Button from "./ButtonComponnent";

const Tags = ({ buttons, renderView }) => {
    const [activeView, setActiveView] = useState(buttons[0].name);

    return (
        <div style={{height: '100%'}}>
            {buttons.map((bt, index) => (
                <div key={index}>
                    <Button  text={bt.name} clickAction={() => setActiveView(bt.name)} />
                </div>

            ))}
            {renderView(activeView)}
        </div>
    );
};

export default Tags;
