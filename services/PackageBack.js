import axios from 'axios';

const getPackages = async (search) => {
    try {
        const response = await axios.get('http://localhost:8080/packages?search='+search);
        const packageData = response.data;

        console.log(`Código: ${packageData.code}`);
        console.log(`Nombre: ${packageData.name}`);
        console.log(`Destino: ${packageData.destination}`);
        console.log(`Costo: ${packageData.cost}`);
        return packageData
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

const getServices = () => {
    return [
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
        {
            name: "Service"
        },
    ]
}

export default {getPackages, getServices}