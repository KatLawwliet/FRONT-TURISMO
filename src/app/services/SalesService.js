import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
let credentials

if (typeof window !== "undefined") {
    credentials = localStorage.getItem('auth');
}

export const getSales = async (search, isPdf = false) => {
    try {
        const url = isPdf ? baseURL+"/sales/pdf?searcher=": baseURL+'/sales?searcher='
        if (isPdf) {
            return await fetch(url+search)
        }
        const response = await axios.get(url+search,{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });
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
        await axios.post(baseURL+"/sales", sale,{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const deleteSale = async (id) => {
    try {
        await axios.delete(baseURL+"/sales/"+id,{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const calculate = async (services) => {
    try {
        const response = await axios.post(baseURL+"/sales/calculate", services,{
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
        const calculateData = response.data;
        console.log("DATA CALCULADA: " + calculateData.totalPrice)
        return calculateData
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }


}