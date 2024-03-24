'use client'
import React, { useState } from 'react';

const Tags = ({ buttons, renderView, setSelected, children }) => {
    const [activeView, setActiveView] = useState(buttons[0].name);

    const actionButton = (name) => {
        setActiveView(name);
        if (setSelected) setSelected(name);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {buttons.map((bt, index) => (
                    <div key={index}>
                        <button
                            style={{
                                width: 100,
                                height: 35,
                                margin: 10,
                                backgroundColor: activeView === bt.name ? '#028035' : '#b3e2c6',
                                borderRadius: 20,
                                borderColor: 'lightgray',
                                borderWidth: 1,
                                fontSize: 15,
                                color: activeView === bt.name ? "white": "#475569",
                                fontWeight: activeView === bt.name ? 'bold' : 'normal',
                            }}
                            onClick={() => actionButton(bt.name)}
                        >
                            {bt.name}
                        </button>
                    </div>
                ))}
                {children ? children : ""}
            </div>

            {renderView(activeView)}
        </div>
    );
};

export default Tags;
