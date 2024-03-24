import axios from 'axios';


const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL+"/clients"
const credentials = localStorage.getItem('auth');

const getClients = async (search) => {
    const response = await axios.get(baseURL+'?searcher='+search,{
        headers: {
            'Authorization': `Basic ${credentials}`
        }
    });
    const clientsData = response.data;
    console.log(clientsData)

    return clientsData.map(cl => {
        return {
            id: cl.id,
            nombre_completo: cl.name + " " + cl.lastname,
            email: cl.email,
            telefono: cl.cellPhone
        }
    })
}

export const createClient = async (client) => {
    try {
        await axios.post(baseURL, client,{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error.response ? error.response.data : error);
        throw error;
    }
}

export const updateClient = async (client, id) => {
    try {
        await axios.patch(baseURL+'/'+id, client,{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error.response ? error.response.data : error);
        throw error;
    }
}

export const deleteClient = async (id) => {
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

export default getClients