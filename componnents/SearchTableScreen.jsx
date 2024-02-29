import React from 'react';
import SearchInput from "./SearchInputComponnet";
import Button from "./ButtonComponnent";
import {FaRegCalendarAlt} from "react-icons/fa";
import Table from "./TableComponnent";

const SearchTableScreen = ({data, seachInput}) => {
    return (
        <div >
            <div style={style.searchContainer}>
                <SearchInput seachInput={seachInput}/>
                <Button text={<FaRegCalendarAlt/>} clickAction={() => alert("caca")}/>
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