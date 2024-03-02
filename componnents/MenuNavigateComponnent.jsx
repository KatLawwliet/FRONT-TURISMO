import React, {useEffect, useState} from "react";
import Menu from "./MenuComponnent";
import CreatePackage from "./CreatePackageScreen";
import Business from "./BusinessScreen";
import PackageBack from "../services/PackageBack";
import Presentation from "./PesentationScreen";
import Package from "./PackageComponnent";
import Service from "./ServiceComponnent";
import Button from "./ButtonComponnent";
import PackagesScreen from "./PackagesScreen";
import ServiceScreen from "./ServiceScreen";

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
        }
    };

    return (
        <div style={{height: '100%', maxHeight:890, width: '100%', display: 'flex', flexDirection: "row"}}>
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

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        maxHeight: '100vh',
    },
    item: {
        backgroundColor: 'white',
        flexDirection: 'column',
        margin: 10,
        width: '30%',
        height: '50%',
        minWidth: 300,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nothing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '25%',
    }
}

export default MenuNavigate