import axios from 'axios';

export const getSales = async (search) => {
    try {
        const response = await axios.get('http://localhost:8080/sales?searcher='+search);
        const salesData = response.data;
        console.log(salesData)

        return salesData.map(pack => {
            return {
                codigo: pack.numSale,
                metodo_de_pago: pack.paymentMethod,
                cliente: `${pack.client.name} ${pack.client.lastname}`,
                nombre_de_paquete: `${pack.packagee.name}`,
                costo: `${pack.packagee.cost}`
            }
        })
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}