import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL+"/sellers"
export const getSelles = async (search) => {
    try {
        const response = await axios.get(baseURL+'?searcher='+search);
        const sellesData = response.data;
        console.log(sellesData)

        return sellesData
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const createSeller = async (seller) => {
    try {
        await axios.post(baseURL, seller)
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error.response ? error.response.data : error);
        throw error;
    }
}

export const deleteSeller = async (id) => {
    try {
        await axios.delete(baseURL+"/"+id)
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}