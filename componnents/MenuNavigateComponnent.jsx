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

const MenuNavigate = ({navigation}) => {

    const [activeView, setActiveView] = useState('Paquetes');
    const [packages, setPackages] = useState([])
    const [services, setServices] = useState([])
    const [seachInput, setSeachInput] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedPackages = await PackageBack.getPackages(seachInput)
                const loadedServices = await PackageBack.getServices(seachInput)
                setServices(loadedServices)
                setPackages(loadedPackages)
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
        }
        fetchData()
    },[seachInput])

    const renderView = () => {
        switch(activeView) {
            case 'Paquetes':
                return (
                    <PackagesScreen packages={packages} setSeachInput={setSeachInput}/>
                )
            case 'Servicios':
                return (
                    <Presentation data={services} seachInput={setSeachInput}>
                        {services.length != 0 ? services.map((pack, index) => (
                                <Service destination={pack.destination} description={pack.description}/>
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize:20, color: "#475569"}}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
            case 'Crear Paquete':
                return <CreatePackage />;
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