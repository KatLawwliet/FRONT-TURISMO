import React from 'react';
import Tags from "./TagComponnent";
import Package from "./PackageComponnent";
import Presentation from "./PesentationScreen";

const PackagesScreen = ({packages, setSeachInput}) => {

    const renderView= (condition) => {
        switch (condition) {
            case "Package" :
                return (
                <Presentation data={packages} seachInput={setSeachInput} >
                    {packages.length !== 0 ? packages.map((pack, index) => (
                            <Package name={pack.name} destination={pack.destination}/>
                        )) :
                        <div style={styles.nothing}>
                            <h1 style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize:20, color: "#475569"}}>No se encontraron Paquetes</h1>
                        </div>
                    }
                </Presentation>
            )
        }
    }

    return (
        <div style={{height: '100%', maxHeight:770,}}>
            <Tags renderView={renderView} buttons={[{name: "Package"}]}/>
        </div>
    );
};


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

export default PackagesScreen;