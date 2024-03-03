import React, {useEffect, useState} from 'react';
import Tags from "./TagComponnent";
import Package from "./PackageComponnent";
import Presentation from "./PesentationScreen";
import PackageBack from "../services/PackageBack";

const PackagesScreen = () => {

    const [packages, setPackages] = useState([])
    const [seachInput, setSeachInput] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedPackages = await PackageBack.getPackages(seachInput)
                setPackages(loadedPackages)
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
        }
        fetchData()
    },[seachInput])

    const renderView= (condition) => {
        switch (condition) {
            case "Package" :
                return (
                <Presentation data={packages} seachInput={setSeachInput} >
                    {packages.length !== 0 ? packages.map((pack, index) => (
                            <Package packagee={pack}/>
                        )) :
                        <div style={styles.nothing}>
                            <h1 style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize:20, color: "#475569"}}>No se encontraron Paquetes</h1>
                        </div>
                    }
                </Presentation>
            )
            case "Crear Paquete":
                return (<h1>Pantalla para crear paquete</h1>)
        }
    }

    return (
        <div style={{height: '100%', maxHeight:770,}}>
            <Tags renderView={renderView} buttons={[{name: "Package"}, {name: "Crear Paquete"}]}/>
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

export default PackagesScreen;