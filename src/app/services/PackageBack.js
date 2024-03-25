import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL


const getPackages = async (search, auth) => {
    try {
        const response = await axios.get(baseURL+'/packages?searcher='+search, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });
        const packageData = response.data;

        console.log(`Código: ${packageData.code}`);
        console.log(`Nombre: ${packageData.name}`);
        console.log(`Destino: ${packageData.destination}`);
        console.log(`Costo: ${packageData.cost}`);
        return packageData
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

const getServices = async (search, typeId, auth) => {
    try {
        console.log(`RESPUESTAAAA: ${search} y tambien ${typeId} `);
        const response = await axios.get(baseURL+'/services?searcher='+search+'&typeId='+typeId, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        const serviceData = response.data;
        console.log(`RESPUESTAAAA: ${serviceData}`);
        return serviceData.map(servi => {
            console.log(servi.pic)
            return {
                code: servi.code,
                date: servi.date,
                description: servi.description,
                destination: servi.destination,
                pic: servi.pic,
                type: servi.type,
                cost: servi.cost
            }
        })
    } catch (error) {
        console.log('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

const createPackage = async (name, destination, costo, pic = "", isCustom = false, services, auth) => {

    try {
        const selectedServices = services || JSON.parse(auth);

        const request = {
            name: name,
            destination: destination,
            cost: costo,
            pic: pic,
            services: selectedServices.map(service => ({
                code: service.code,
            })),
            isCustom: isCustom
        }

        const resp = await axios.post(baseURL+"/packages", request, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        })
        return resp.data
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

const createService = async (service, auth) => {
    try {
        const resp = await axios.post(baseURL+"/services", service, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        })
        console.log("este es el tipo, genteee! " + service.type)
        return resp.data
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}
const updateService = async (service, code, auth) => {
    try {
        const resp = await axios.patch(baseURL+"/services/"+code, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });
        return resp.data;
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
};
const deleteService = async (code, auth) => {

    try {
        console.log("ESTOY ACAAA " + code)
        await axios.delete(baseURL+"/services/"+code, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        })
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const deletePackage = async (code) => {
    try {
        await axios.delete(baseURL+"/packages/"+code, {
            headers: {
                'Authorization': `Basic ${localStorage.getItem('auth')}`
            }
        })
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export default {getPackages, getServices,createPackage, createService, updateService, deleteService, deletePackage}