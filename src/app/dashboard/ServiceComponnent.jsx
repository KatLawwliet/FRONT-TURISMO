import React, { useState } from 'react';
import Modal from './Modal';
import Image from "next/image";
import './customCheckbox.css'
import Button from './ButtonComponnent';

const Service = ({ service, onCheckChange, isChecked, isMenuVisible }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleCheckboxChange = (e) => {
        onCheckChange(service.code, e.target.checked);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
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
                    <div style={{ width: '100%', height: '100%', padding: 10 }}>
                        <div style={{ height: "60%", padding: 10 }}>
                            <div style={{ height: '10%', display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                                <input id={"checkbox-" + service.code} className="hiddenCheckbox" type="checkbox"
                                       checked={isChecked} onChange={handleCheckboxChange} />
                                <label htmlFor={"checkbox-" + service.code} className="customCheckbox"></label>
                            </div>
                            <h1
                                style={{
                                    fontSize: 20,
                                    color: isHovered ? "#028035" : "#475569", 
                                    marginBottom: 1,
                                    padding: 1,
                                    width: '50%',
                                    cursor: 'pointer', 
                                    transition: 'color 0.3s', 
                                }}
                                onMouseEnter={handleMouseEnter} 
                                onMouseLeave={handleMouseLeave} 
                                onClick={openModal} 
                            >
                                {service.description}
                            </h1>
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

            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal}
                width={'50%'}
                height={'50%'}
            >
                <div style={{ display:'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                        <div>
                            <h2 style={{color: '#475569'}}>{service.description}</h2>
                            <Image
                                width={400}
                                height={250}
                                style={{borderRadius: 10}}
                                src={service.pic ? service.pic : "https://snxhqkypetprgogliayo.supabase.co/storage/v1/object/public/turismo/uploads/cataratas_fondo.jpg"}
                                alt={""}
                            />
                        </div>
                        <div style={{width: '50%'}}>
                            <div style={{height: '50%', display: 'flex', justifyContent: 'center'}}>
                                <p style={{color: '#475569', fontSize: 20}}>Detalles del servicio:</p>
                                <p style={{color: '#475569'}}>{service.details}</p>
                                
                            </div>
                            <div style={{height: '50%', display: 'flex', justifyContent:'flex-end', alignItems:'flex-end'}}>
                                <p style={{color: '#028035', fontSize: 30}}><b style={{fontSize: 25}}>Costo: </b>${service.cost}</p>
                            </div>
                        </div>
                    </div>
                    
                    
                    <Button clickAction={closeModal} text={'Cerrar'}/>
                </div>
            </Modal>
        </>
    );
};

const styles = {
    item: {
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: '2px',
        width: "33%",
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
};

export default Service;