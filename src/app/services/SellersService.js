import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL+"/sellers"
const register = process.env.NEXT_PUBLIC_BACKEND_URL+"/users/register"
const notification = process.env.NEXT_PUBLIC_BACKEND_URL+"/notification/send/seller"
let credentials

if (typeof window !== "undefined") {
    credentials = localStorage.getItem('auth');
}

export const getSelles = async (search) => {
    try {
        const response = await axios.get(baseURL+'?searcher='+search,{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });
        const sellesData = response.data;
        console.log(sellesData)

        return sellesData
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const getSelleByEmail = async (email) => {
    try {
        const response = await axios.get(baseURL+'/'+email,{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });
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
        await axios.post(baseURL, seller,{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
        await axios.post(register, {username: seller.email, password: '12345'},{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
        await axios.post(notification+'?email='+seller.email+'&password=12345', {},{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error.response ? error.response.data : error);
        throw error;
    }
}

export const deleteSeller = async (id) => {
    try {
        await axios.delete(baseURL+"/"+id,{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}