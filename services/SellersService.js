import axios from 'axios';

export const getSelles = async (search) => {
    try {
        const response = await axios.get('http://localhost:8080/sellers?searcher='+search);
        const sellesData = response.data;
        console.log(sellesData)

        return sellesData
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const deleteSeller = async (id) => {
    try {
        await axios.delete("http://localhost:8080/sellers/"+id)
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}