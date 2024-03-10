import React, {useState} from "react";
import Menu from "./MenuComponnent";
import Business from "./BusinessScreen";
import PackagesScreen from "./PackagesScreen";
import ServiceScreen from "./ServiceScreen";

const MenuNavigate = ({navigation}) => {

    const [activeView, setActiveView] = useState('Servicios');

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
        <div style={{height: '100%', maxHeight:869, width: '100%', display: 'flex', flexDirection: "row"}}>
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