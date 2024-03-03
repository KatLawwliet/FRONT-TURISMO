import axios from 'axios';

const getPackages = async (search) => {
    try {
        const response = await axios.get('http://localhost:8080/packages?searcher='+search);
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

const getServices = async (search) => {
    try {
        const response = await axios.get('http://localhost:8080/services?searcher='+search);
        const serviceData = response.data;

        console.log(`RESPUESTAAAA: ${serviceData}`);
        return serviceData.map(servi => {
            console.log(servi.pic)
            return {
                description: servi.description,
                destination: servi.destination,
                pic: servi.pic,
                type: servi.type,
                cost: servi.cost
            }
        })
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export default {getPackages, getServices}