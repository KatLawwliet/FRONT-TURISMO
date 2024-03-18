import axios from 'axios';

export const getClients = async (search, isPdf = false) => {
    try {
        const url = isPdf ? "https://turismo-back-k5g5kslg2a-rj.a.run.app/clients/pdf?searcher=" : 'https://turismo-back-k5g5kslg2a-rj.a.run.app/clients?searcher='
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
