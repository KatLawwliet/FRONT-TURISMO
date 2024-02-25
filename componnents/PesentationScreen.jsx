import React, {useEffect, useState} from 'react';
import SearchInput from "./SearchInputComponnet";
import Button from "./ButtonComponnent";
import {FaRegCalendarAlt} from "react-icons/fa";

const Presentation = ({data, seachInput}) => {

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
                <Button text={<FaRegCalendarAlt/>} clickAction={() => alert('Precionaste la otra caca!')}/>
            </div>
            <div style={styles.container}>
                {data.length != 0 ? data.map((pack, index) => (
                    <div key={index} style={styles.item}>
                        <h1>{pack.name}</h1>
                        <h1>{pack.destination}</h1>
                    </div>
                )) :
                    <div style={styles.nothing}>
                        <h1 style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize:20}}>No se encontraron elementos</h1>
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
        minWidth: 400,
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