import React, {useState} from 'react';
import './customCheckbox.css'
import Image from "next/image";

const Service = ({ service, onCheckChange, isChecked, isMenuVisible}) => {

    const handleCheckboxChange = (e) => {
        onCheckChange(service.code, e.target.checked);
    };

    const styles = {
        item: {
            backgroundColor: 'white',
            flexDirection: 'row',
            margin: '2px',
            width: isMenuVisible?'100%': "33%",
            height: 180,
            minWidth: 430,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        imageContainer: {
            margin: 10,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        },
        image: {
            objectFit: 'cover',
        }
    }


    return (
        <div style={styles.item}>
            <div style={styles.imageContainer}>
                <Image
                    width={150}
                    height={150}
                    style={styles.image}
                    alt={service.description}
                    src={service.pic !== "" ? service.pic : "https://img.freepik.com/free-vector/front-view-sketch-fuck-you-symbol_23-2148667363.jpg"}
                />
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
                    <div style={{height: "60%", padding: 10}}>
                        <div style={{height: '10%', display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                            <input id={"checkbox-" + service.code} className="hiddenCheckbox" type="checkbox"
                                   checked={isChecked} onChange={handleCheckboxChange}/>
                            <label htmlFor={"checkbox-" + service.code} className="customCheckbox"></label>
                        </div>
                        <h1 style={{
                            fontSize: 20,
                            color: "#475569",
                            marginBottom: 1,
                            padding: 1
                        }}>{service.description}</h1>
                        <h1 style={{
                            fontSize: 13,
                            color: "#475569",
                            marginTop: 1,
                            padding: 1
                        }}>{service.type}</h1>
                        <h1 style={{
                            fontSize: 15,
                            color: "#028035",
                            marginBottom: 1,
                            padding: 1
                        }}>{service.destination}</h1>
                        <h1 style={{
                            fontSize: 10,
                            color: "#028035",
                            marginBottom: 1,
                            padding: 1
                        }}>{service.date}</h1>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>

                        <h1 style={{
                            fontSize: 20,
                            color: "#475569"
                        }}>$ {service.cost}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Service;