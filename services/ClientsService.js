import axios from 'axios';

export const getClients = async (search) => {
    try {
        const response = await axios.get('http://localhost:8080/clients?searcher='+search);
        const packageData = response.data;
        console.log(packageData)

        return packageData
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}
