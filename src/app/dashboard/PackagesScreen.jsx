import React, {useEffect, useState} from 'react';
import Package from "./PackageComponnent";
import Presentation from "./PesentationScreen";
import PackageBack from "../services/PackageBack";
import useLocalStorage from "./UseLocalStorage"

const PackagesScreen = () => {

    const [packages, setPackages] = useState([])
    const [seachInput, setSeachInput] = useState("")
    const [auth, setAuth] = useLocalStorage('auth', '');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedPackages = await PackageBack.getPackages(seachInput, auth)
                setPackages(loadedPackages)
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
        }
        fetchData()
    },[seachInput, auth])


    return (
        <div style={{height: '100%',}}>
            <Presentation data={packages} seachInput={setSeachInput} >
                {packages.length !== 0 ? packages.map((pack, index) => (
                        <Package key={pack.code} packagee={pack}/>
                    )) :
                    <div style={styles.nothing}>
                        <h1 style={{ fontSize:20, color: "#475569"}}>No se encontraron Paquetes</h1>
                    </div>
                }
            </Presentation>
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