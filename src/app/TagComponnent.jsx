'use client'
import React, { useState } from 'react';
import Button from "./ButtonComponnent";

const Tags = ({ buttons, renderView , setSelected, children}) => {
    const [activeView, setActiveView] = useState(buttons[0].name);

    const actionButton = (name) => {
        setActiveView(name)
        if (setSelected) setSelected(name)

    }

    return (
        <div >
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {buttons.map((bt, index) => (
                    <div key={index}>
                        <button style={{
                            width:100,
                            height:35,
                            margin:10,
                            backgroundColor: '#b3e2c6',
                            borderRadius:20,
                            borderColor:'lightgray',
                            borderWidth: 1,
                            fontSize:15,
                            color: "#475569"
                        }} value={bt.name} onClick={() => actionButton(bt.name)} >{bt.name}</button>
                    </div>

                ))}
                {children? children : ""}
            </div>

            {renderView(activeView)}
        </div>
    );
};

export default Tags;
