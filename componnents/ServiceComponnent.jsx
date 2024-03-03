import React from 'react';

const Service = ({service}) => {
    return (
        <div style={styles.item}>
            <div style={{width: "50%", height: "100%"}}>
                <img style={{width: "100%", height: "100%"}} alt={""} src={service.pic !== "" ? service.pic : "https://img.freepik.com/free-vector/front-view-sketch-fuck-you-symbol_23-2148667363.jpg"}/>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: "column",
                width: "100%",
                height: '100%',
                alignItems: 'flex-start',
                margin: 10,
                justifyContent: 'space-evenly'
            }}
            >
                <div style={{width: '100%', height: '100%'}}>
                    <div style={{height: "60%", padding:10}}>
                        <h1 style={{
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            fontSize: 20,
                            color: "#475569",
                            marginBottom: 1,
                            padding: 1
                        }}>{service.type}</h1>
                        <h1 style={{
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            fontSize: 10,
                            color: "#475569",
                            marginTop: 1,
                            padding: 1
                        }}>{service.description}</h1>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                        <h1 style={{
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            fontSize: 20,
                            color: "#475569"
                        }}>$ {service.cost}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    item: {
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: '5px',
        width: '30%',
        height: 'auto',
        minWidth: 300,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default Service;