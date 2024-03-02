import React, {useEffect, useState} from 'react';
import Service from "./ServiceComponnent";
import Presentation from "./PesentationScreen";
import Tags from "./TagComponnent";
import PackageBack from "../services/PackageBack";

const ServiceScreen = () => {

    const [seachInput, setSeachInput] = useState("")
    const [services, setServices] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedServices = await PackageBack.getServices(seachInput)
                setServices(loadedServices)
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
        }
        fetchData()
    },[seachInput])

    const renderView = (condition) => {
        switch (condition) {
            case 'Sarasa':
                return(
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
        }
    }

    return (
        <div style={{height: '100%', maxHeight:770,}}>
            <Tags renderView={renderView} buttons={[{name: "Sarasa"}]}/>
        </div>
    );
};


const styles = {

    nothing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '25%',
    }
}
export default ServiceScreen;