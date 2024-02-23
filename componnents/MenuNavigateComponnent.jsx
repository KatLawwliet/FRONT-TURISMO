import React, {useEffect, useState} from "react";
import Menu from "./MenuComponnent";
import CreatePackage from "./CreatePackageScreen";
import Business from "./BusinessScreen";
import PackageBack from "../services/PackageBack";
import Presentation from "./PesentationScreen";

const MenuNavigate = ({navigation}) => {

    const [activeView, setActiveView] = useState('Paquetes');
    const [packages, setPackages] = useState([])
    const [services, setServices] = useState([])

    useEffect(() => {
        const loadedPackages = PackageBack.getPackages()
        const loadedServices = PackageBack.getServices()
        setServices(loadedServices)
        setPackages(loadedPackages)
    },[])

    const renderView = () => {
        switch(activeView) {
            case 'Paquetes':
                return <Presentation data={packages} />;
            case 'Servicios':
                return <Presentation data={services} />;
            case 'Crear Paquete':
                return <CreatePackage />;
            case 'Negocio':
                return <Business />;
        }
    };

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: "row"}}>
            <Menu setActiveView={setActiveView} navigation={navigation}/>
            <div style={{
                backgroundColor: '#f1f5f9',
                width: '100%',
                height: '97%',
                borderRadius: '0px 0px 0px 10px',
                paddingTop: 30
            }}>
                {renderView()}
            </div>
        </div>
    )
}

export default MenuNavigate