import axios from 'axios';

export const getSales = async (search) => {
    try {
        const response = await axios.get('http://localhost:8080/sales?searcher='+search);
        const salesData = response.data;
        console.log(salesData)

        return salesData.map(pack => {
            return {
                codigo: pack.numSale,
                cliente: `${pack.client.name} ${pack.client.lastname}`,
                nombre_de_paquete: `${pack.packagee.name}`,
                metodo_de_pago: pack.paymentMethod,
                costo: `$ ${pack.packagee.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
            }
        })
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}