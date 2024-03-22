'use client'
import React from "react";
import Menu from "./MenuComponnent";
import Business from "./BusinessScreen";
import PackagesScreen from "./PackagesScreen";
import ServiceScreen from "./ServiceScreen";
import AltasScreen from "./AltasScreen";
import {useState} from "react";

const MenuNavigate = ({navigation}) => {

    const [activeView, setActiveView] = useState('Paquetes');

    const renderView = () => {
        switch(activeView) {
            case 'Paquetes':
                return <PackagesScreen/>
            case 'Servicios':
                return <ServiceScreen/>
            case 'Negocio':
                return <Business />;
            case 'Altas':
                return <AltasScreen />;
        }
    };

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: "row"}}>
            <Menu setActiveView={setActiveView} activeView={activeView} navigation={navigation}/>
            <div style={{
                backgroundColor: '#f1f5f9',
                width: '100%',
                height: '100%',
                borderRadius: '0px 0px 0px 10px',
            }}>
                {renderView()}
            </div>
        </div>
    )
}

export default MenuNavigate