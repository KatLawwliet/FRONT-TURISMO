import React, {useEffect, useState} from 'react';
import SearchInput from "./SearchInputComponnet";
import Button from "./ButtonComponnent";
import {FaRegCalendarAlt} from "react-icons/fa";
import Modal from "./Modal";

const Presentation = ({data, seachInput, children}) => {

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
                {children}
            </div>
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'stretch', // O 'flex-start' si quieres que cada elemento mantenga su altura original.
        justifyContent: 'center',
        height: 'auto', // Cambiado de '100%' a 'auto'.
        width: '100%',
        overflowY: 'auto',
        alignContent: 'flex-start', // Asegurándonos de que los elementos estén alineados al inicio del contenedor.
    }
}

export default Presentation;