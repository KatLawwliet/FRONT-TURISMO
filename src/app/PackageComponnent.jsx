import React from 'react';
import Image from "next/image";

const Package = ({packagee}) => {
    return (
        <div style={styles.item}>
            <div style={{
                margin: 10,
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <Image
                    width={300}
                    height={150}
                     src={packagee.pic ? packagee.pic : "https://definicion.de/wp-content/uploads/2009/12/paisaje-1.jpg"}
                     alt={""}/>
            </div>
            <div style={{display: 'flex', flexDirection: "column", width: "100%"}}>
                <h1 style={{ fontSize: 20, color: "#475569",margin:10}}>{packagee.name}</h1>
                <div style={{display: 'flex', height: '50%', margin:8}}>
                    {packagee.services.map(serv => {
                        return (<div key={serv.code} style={{
                            fontSize: 9,
                            display: 'flex',
                            justifyContent: 'center',
                            margin:2,
                            color: "#475569",
                            backgroundColor: "#c0c4c7",
                            padding: 5,
                            borderRadius: 10
                        }}><b>{serv.type}</b></div>)
                    })}
                </div>
                <p style={{
                    margin:10,
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