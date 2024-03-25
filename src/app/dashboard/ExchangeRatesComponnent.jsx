import React, { useState, useEffect } from 'react';

const ExchangeRates = () => {
    const [officialRate, setOfficialRate] = useState(null);
    const [blueRate, setBlueRate] = useState(null);
    const [euroRate, setEuroRate] = useState(null);

    useEffect(() => {
        fetch('https://dolarapi.com/v1/dolares/oficial')
            .then(response => response.json())
            .then(data => {
                setOfficialRate(data.venta);
            })
            .catch(error => console.error('Error fetching official rate:', error));

        fetch('https://dolarapi.com/v1/dolares/blue')
            .then(response => response.json())
            .then(data => {
                setBlueRate(data.venta);
            })
            .catch(error => console.error('Error fetching blue rate:', error));

        fetch('https://dolarapi.com/v1/cotizaciones/eur')
            .then(response => response.json())
            .then(data => {
                setEuroRate(data.venta);
            })
            .catch(error => console.error('Error fetching euro rate:', error));
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.rateContainer}>
                <h3>Oficial: $</h3>
                {officialRate ? <div>{officialRate}</div> : <div>Cargando...</div>}
            </div>
            <div style={styles.rateContainer}>
                <h3>Blue: $</h3>
                {blueRate ? <div>{blueRate}</div> : <div>Cargando...</div>}
            </div>
            <div style={styles.rateContainer}>
                <h3>€: $</h3>
                {euroRate ? <div>{euroRate}</div> : <div>Cargando...</div>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    rateContainer: {
        marginRight: 10,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
    },
};

export default ExchangeRates;