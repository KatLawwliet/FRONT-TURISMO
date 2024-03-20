import axios from 'axios';


const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
const getClients = async (search) => {
    const response = await axios.get(baseURL+'/clients?searcher='+search);
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

export const deleteSClient = async (id) => {
    try {
        await axios.delete(baseURL+"/clients/"+id)
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export default getClients