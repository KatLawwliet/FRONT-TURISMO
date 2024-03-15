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
                <h3>Dólar Oficial:</h3>
                {officialRate ? <p>{officialRate}</p> : <p>Cargando...</p>}
            </div>
            <div style={styles.rateContainer}>
                <h3>Dólar Blue:</h3>
                {blueRate ? <p>{blueRate}</p> : <p>Cargando...</p>}
            </div>
            <div style={styles.rateContainer}>
                <h3>Euro:</h3>
                {euroRate ? <p>{euroRate}</p> : <p>Cargando...</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row', // Mostrar en línea
        alignItems: 'center',
        marginTop: 20,
    },
    rateContainer: {
        marginRight: 20, // Espacio entre cotizaciones
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
    },
};

export default ExchangeRates;
