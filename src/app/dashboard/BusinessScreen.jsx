'use client'
import React from 'react';
import Tags from "./TagComponnent";
import ClientTagB from './ClientTagB'
import  SalesTagB  from './SalesTagB';

const Business = () => {

    const renderView = (condition) => {
        switch(condition) {
            case 'Clientes':
                return (
                    <ClientTagB ></ClientTagB>
                );
            case 'Ventas':
                return (
                    <SalesTagB ></SalesTagB>
                );
        }
    };


    return (
        <div>
            <Tags renderView={renderView} buttons={[{name: "Clientes"}, {name: "Ventas"}]}></Tags>
        </div>
    );
};

export default Business;