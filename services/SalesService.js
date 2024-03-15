import axios from 'axios';

export const getSales = async (search, isPdf = false) => {
    try {
        const url = isPdf ? "http://localhost:8080/sales/pdf?searcher=": 'http://localhost:8080/sales?searcher='
        if (isPdf) {
            return await fetch(url+search)
        }
        const response = await axios.get(url+search);
        const salesData = response.data;
        console.log(salesData)

        return salesData.map(pack => {
            return {
                codigo: pack.numSale,
                cliente: `${pack.client.lastname} ${pack.client.name}`,
                metodo_de_pago: pack.paymentMethod,
                costo: `$ ${pack.cost}`
            }
        })
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const createSale = async (sale) => {
    try {
        await axios.post("http://localhost:8080/sales", sale)
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const calculate = async (services) => {
    try {
        const response = await axios.post("http://localhost:8080/sales/calculate", services)
        const calculateData = response.data;
        console.log("DATA CALCULADA: " + calculateData.totalPrice)
        return calculateData
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }


}