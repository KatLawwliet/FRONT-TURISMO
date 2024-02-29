import React, {useEffect, useState} from 'react';
import SearchInput from "./SearchInputComponnet";
import Button from "./ButtonComponnent";
import {FaRegCalendarAlt} from "react-icons/fa";
import Modal from "./Modal";

const Presentation = ({data, seachInput}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    useEffect(() => {

    }, [data]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'flex-start'}}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%'
            }}>
                <SearchInput seachInput={seachInput}/>
                <Button text={<FaRegCalendarAlt/>} clickAction={() => toggleModal()}/>
                <Modal isOpen={isModalOpen} onClose={toggleModal}>
                    <div style={{width: 700, height: 700, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <h1>Contenido</h1>
                    </div>
                </Modal>
            </div>
            <div style={styles.container}>
                {data.length != 0 ? data.map((pack, index) => (
                    <div key={index} style={styles.item}>
                        <h1 style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize:20, color: "#475569"}}>{pack.name ? pack.name : pack.description}</h1>
                        <h1 style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize:20, color: "#475569"}}>{pack.destination}</h1>
                    </div>
                )) :
                    <div style={styles.nothing}>
                        <h1 style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize:20, color: "#475569"}}>No se encontraron elementos</h1>
                    </div>
                }


            </div>
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

export default Presentation;