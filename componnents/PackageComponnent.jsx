import React from 'react';

const Package = ({name, destination}) => {
    return (
        <div style={styles.item}>
            <h1 style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 20, color: "#475569"}}>{name}</h1>
            <h1 style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 20,
                color: "#475569"
            }}>{destination}</h1>
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

export default Package;