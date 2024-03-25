import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL


export const getSales = async (search, isPdf = false, auth) => {
    try {
        const url = isPdf ? baseURL+"/sales/pdf?searcher=": baseURL+'/sales?searcher='
        if (isPdf) {
            return await fetch(url+search)
        }
        const response = await axios.get(url+search,{
            headers: {
                'Authorization': `Basic ${auth}`
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

export const createSale = async (sale, auth) => {
    try {
        await axios.post(baseURL+"/sales", sale,{
            headers: {
                'Authorization': `Basic ${auth}`
            }
        })
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const deleteSale = async (id, auth) => {
    try {
        await axios.delete(baseURL+"/sales/"+id,{
            headers: {
                'Authorization': `Basic ${auth}`
            }
        })
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const calculate = async (services, auth) => {
    try {
        const response = await axios.post(baseURL+"/sales/calculate", services,{
            headers: {
                'Authorization': `Basic ${auth}`
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