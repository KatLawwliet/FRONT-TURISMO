import axios from 'axios';


const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

export const getClients = async (search, isPdf = false) => {
    try {
        const url = isPdf ? baseURL+"/clients/pdf?searcher=" : baseURL+'/clients?searcher='
        if (isPdf) {
            return await fetch(url+search)
        }
        const response = await axios.get(url+search);
        const clientsData = response.data;
        console.log(clientsData)
        return clientsData.map(cli => {
            return {
                nombre_completo: `${cli.lastname} ${cli.name}`,
                dni: cli.dni,
                cumpleaños: cli.birthday,
                nacionalidad: cli.nationality,
                telefono: cli.cellPhone,
                email: cli.email
            }
        })
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}
