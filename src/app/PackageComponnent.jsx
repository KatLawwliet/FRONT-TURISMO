import React, { useState } from 'react';
import Modal from './Modal';
import Image from "next/image";
import Button from './ButtonComponnent';

const Package = ({ packagee }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const salePackage = () => {
        alert("Paquete vendido!");
    };

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
            <div style={{ display: 'flex', flexDirection: "column", width: "100%" }}>
                <h1
                    style={{
                        fontSize: 20,
                        color: "#475569",
                        margin: 10,
                        cursor: 'pointer',
                        transition: 'color 0.3s',
                    }}
                    onClick={openModal}
                    onMouseEnter={e => e.target.style.color = '#028035'}
                    onMouseLeave={e => e.target.style.color = '#475569'}
                >
                    {packagee.name}
                </h1>
                <div style={{display: 'flex', height: '50%', margin: 8}}>
                    {packagee.services.map(serv => (
                        <div
                            key={serv.code}
                            style={{
                                fontSize: 9,
                                display: 'flex',
                                justifyContent: 'center',
                                margin: 2,
                                color: "#475569",
                                backgroundColor: "#c0c4c7",
                                padding: 5,
                                borderRadius: 10
                            }}
                        >
                            <b>{serv.type}</b>
                        </div>
                    ))}
                </div>
                <p
                    style={{
                        margin: 10,
                        fontSize: 15,
                        color: "#475569"
                    }}
                >
                    Desde <b>$ {packagee.cost}</b>
                </p>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div style={{textAlign: 'center'}}>
                    <h1>{packagee.name}</h1>
                    <div>
                        <h2>Servicios incluidos:</h2>
                        <ul style={{listStyleType: 'none', padding: 0}}>
                            {packagee.services.map(serv => (
                                <li key={serv.code} style={{
                                    fontSize: 12,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: 'auto',
                                    maxWidth: '5%',
                                    color: "#475569",
                                    backgroundColor: "#c0c4c7",
                                    padding: 5,
                                    borderRadius: 15,
                                }}>
                                    <b>{serv.type}</b>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{maxWidth: '80%', margin: 'auto'}}>
                        <Image
                            width={400}
                            height={250}
                            src={packagee.pic ? packagee.pic : "https://definicion.de/wp-content/uploads/2009/12/paisaje-1.jpg"}
                            alt={""}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', margin: 'auto'}}>
                        <Button text="Cerrar" clickAction={closeModal}/>
                        <Button text="Vender" color={'#B32100'} clickAction={salePackage}/>
                    </div>
                </div>
            </Modal>
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
};

export default Package;