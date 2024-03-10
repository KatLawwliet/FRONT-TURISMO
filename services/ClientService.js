import axios from 'axios';

const getClients = async (search) => {
    const response = await axios.get('http://localhost:8080/clients?searcher='+search);
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

export default {getClients}