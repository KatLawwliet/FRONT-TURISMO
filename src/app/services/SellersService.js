import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
export const getSelles = async (search) => {
    try {
        const response = await axios.get(baseURL+'/sellers?searcher='+search);
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
        await axios.delete(baseURL+"/sellers/"+id)
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}