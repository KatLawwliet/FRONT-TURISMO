import React from 'react';

const Package = ({packagee}) => {
    return (
        <div style={styles.item}>
            <div style={{width: "100%", height: "60%"}}>
                <img style={{width: "100%", height: "100%"}}
                     src={packagee.pic ? packagee.pic : "https://definicion.de/wp-content/uploads/2009/12/paisaje-1.jpg"}
                     alt={""}/>
            </div>
            <div style={{display: 'flex', flexDirection: "column", width: "100%"}}>
                <h1 style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 20, color: "#475569",margin:10}}>{packagee.name}</h1>
                <div style={{display: 'flex', height: '50%', margin:8}}>
                    {packagee.services.map(serv => {
                        return (<div style={{
                            fontSize: 9,
                            display: 'flex',
                            justifyContent: 'center',
                            margin:2,
                            fontFamily: 'Arial, Helvetica, sans-serif',
                            color: "#475569",
                            backgroundColor: "#c0c4c7",
                            padding: 5,
                            borderRadius: 10
                        }}><b>{serv.type}</b></div>)
                    })}
                </div>
                <p style={{
                    margin:10,
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: 15,
                    color: "#475569"
                }}>Desde <b>$ {packagee.cost}</b></p>
            </div>
        </div>
    );
};

const styles = {
    item: {
        backgroundColor: 'white',
        flexDirection: 'column',
        margin: '10px',
        width: '20%',
        height: 300,
        minWidth: 320,
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

export default Package;