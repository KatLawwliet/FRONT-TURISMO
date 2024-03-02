import React, {useState} from 'react';
import SearchInput from "./SearchInputComponnet";
import Button from "./ButtonComponnent";
import {FaRegCalendarAlt} from "react-icons/fa";
import Table from "./TableComponnent";
import Modal from "./Modal";

const SearchTableScreen = ({data, seachInput}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div >
            <div style={style.searchContainer}>
                <SearchInput seachInput={seachInput}/>
                <Button text={<FaRegCalendarAlt/>} clickAction={() => alert("caca")}/>
            </div>
            <div>
                <Button text={"Puto el que apreta"} clickAction={() => toggleModal()}/>
                <Modal isOpen={isModalOpen} onClose={toggleModal}>
                    <div style={{width: "100%",maxWidth: 300 , height: '100%', minHeight: 300, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <h1>Contenido</h1>
                    </div>
                </Modal>
            </div>
            {data.length != 0 ? <Table data={data}></Table> : <h1>No hay nada, gato, recatate</h1>}
        </div>
    );
};

const style = {
    searchContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
}

export default SearchTableScreen;