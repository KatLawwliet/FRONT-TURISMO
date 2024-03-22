import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

const getPackages = async (search) => {
    try {
        const response = await axios.get(baseURL+'/packages?searcher='+search);
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

const getServices = async (search, typeId) => {
    try {
        console.log(`RESPUESTAAAA: ${search} y tambien ${typeId} `);
        const response = await axios.get(baseURL+'/services?searcher='+search+'&typeId='+typeId);

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

const createPackage = async (name, destination, costo) => {

    try {
        const selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];

        const request = {
            name: name,
            destination: destination,
            cost: costo,
            services: selectedServices.map(service => ({
                code: service.code,
            }))
        }

        const resp = await axios.post(baseURL+"/packages", request)
        return resp.data
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

const createService = async (service) => {
    try {
        const resp = await axios.post(baseURL+"/services", service)
        console.log("este es el tipo, genteee! " + service.type)
        return resp.data
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

const deleteService = async (code) => {
    try {
        console.log("ESTOY ACAAA " + code)
        await axios.delete(baseURL+"/services/"+code)
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const deletePackage = async (code) => {
    try {
        await axios.delete(baseURL+"/packages/"+code)
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export default {getPackages, getServices,createPackage, createService, deleteService, deletePackage}