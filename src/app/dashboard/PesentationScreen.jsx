import React, { useEffect, useState } from 'react';
import SearchInput from "./SearchInputComponnet";
import Button from "./ButtonComponnent";
import { FaRegCalendarAlt } from "react-icons/fa";
import Modal from "./Modal";
import DatePicker from "./DatePickerComponnent";
import ExchangeRates from "./ExchangeRatesComponnent";

const Presentation = ({ data, seachInput, children , presentationMenu, isMenuVisible}) => {

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            height: '65vh',
            width: isMenuVisible ? '45%' : '100%',
            padding:10,
            overflowY: 'auto',
        }
    }

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
                    <div style={{width: '75%', display: 'flex', justifyContent: 'flex-end'}}>
                        <ExchangeRates />
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={toggleModal}>
                    <div style={{ width: 700, height: 700, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <DatePicker onSelect={handleDateSelect} />
                    </div>
                </Modal>
            </div>
            <div style={{display:'flex', flexDirection: 'row', width:'95%'}}>
                <div style={styles.container}>
                    {children}
                </div>

                {
                    isMenuVisible ? (
                        <div style={{
                            height: '65vh',
                            width: '55%',
                            overflowY: 'auto',
                        }}>
                            {presentationMenu}
                        </div>
                    ): ""
                }
            </div>
        </div>
    );
};

export default Presentation;
