import React from 'react';

const Service = ({description, destination}) => {
    return (
        <div style={styles.item}>
            <h1 style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 20,
                color: "#475569"
            }}>{description}</h1>
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
        margin: '5px',
        width: '30%',
        height: 'auto',
        minWidth: 300,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default Service;