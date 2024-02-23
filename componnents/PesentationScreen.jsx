import React from 'react';
import SearchInput from "./SearchInputComponnet";
import Button from "./ButtonComponnent";
import {FaRegCalendarAlt} from "react-icons/fa";

const Presentation = ({data}) => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'flex-start'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%'
            }}>
                <SearchInput/>
                <Button text={<FaRegCalendarAlt/>} clickAction={() => alert('Precionaste la otra caca!')}/>
            </div>
            <div style={styles.container}>
                {data.map((pack, index) => (
                    <div key={index} style={styles.item}>
                        <h1>{pack.name}</h1>
                    </div>
                ))}


            </div>
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '97%',
        overflowY: 'auto',
        maxHeight: '100vh',
    },
    item: {
        backgroundColor: 'white',
        margin: 10,
        width: '30%',
        height: '50%',
        minWidth: 300,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default Presentation;