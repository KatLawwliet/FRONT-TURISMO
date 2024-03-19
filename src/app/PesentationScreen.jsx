'use client'
import React, { useEffect, useState } from 'react';
import SearchInput from "./SearchInputComponnet";
import Button from "./ButtonComponnent";
import { FaRegCalendarAlt } from "react-icons/fa";
import Modal from "./Modal";
import DatePicker from "./DatePickerComponnent";

const Presentation = ({ data, seachInput, children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    useEffect(() => {

    }, [data]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '75vh', alignItems: 'flex-start' }}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%'
            }}>

                <SearchInput seachInput={seachInput}/>
                <div style={{ width: '55%', display: 'flex', alignItems: 'center' }}>
                    <Button text={<FaRegCalendarAlt />} clickAction={() => toggleModal()}/>
                </div>
                <Modal isOpen={isModalOpen} onClose={toggleModal}>
                    <div style={{ width: 700, height: 700, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <DatePicker onSelect={handleDateSelect} />
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
        height: '70vh',
        width: '100%',
        padding:10,
        overflowY: 'auto',
    }
}

export default Presentation;