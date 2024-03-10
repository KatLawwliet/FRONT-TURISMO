import React, { useState } from 'react';
import Button from "./ButtonComponnent";

const Tags = ({ buttons, renderView , setSelected}) => {
    const [activeView, setActiveView] = useState(buttons[0].name);

    const actionButton = (name) => {
        setActiveView(name)
        if (setSelected) setSelected(name)

    }

    return (
        <div style={{height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {buttons.map((bt, index) => (
                    <div key={index}>
                        <Button  text={bt.name} clickAction={() => actionButton(bt.name)} />
                    </div>

                ))}
            </div>

            {renderView(activeView)}
        </div>
    );
};

export default Tags;
