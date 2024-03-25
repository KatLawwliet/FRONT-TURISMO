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
                <div style={{color: '#028035'}}>Oficial</div>
                {officialRate ? <div style={{color: '#475569'}}>$ {officialRate}</div> : <div>Cargando...</div>}
            </div>
            <div style={styles.rateContainer}>
                <div style={{color: '#028035'}}>Blue</div>
                {blueRate ? <div style={{color: '#475569'}}>$ {blueRate}</div> : <div>Cargando...</div>}
            </div>
            <div style={styles.rateContainer}>
                <div style={{color: '#028035'}}>€</div>
                {euroRate ? <div style={{color: '#475569'}}>$ {euroRate}</div> : <div>Cargando...</div>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20
    },
    rateContainer: {
        margin: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'

    },
};

export default ExchangeRates;