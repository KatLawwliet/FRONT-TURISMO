import axios from 'axios';

const getPackages = async (search) => {
    try {
        const response = await axios.get('https://turismo-back-k5g5kslg2a-rj.a.run.app/packages?searcher='+search);
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
        const response = await axios.get('https://turismo-back-k5g5kslg2a-rj.a.run.app/services?searcher='+search+'&typeId='+typeId);
        const serviceData = response.data;

        console.log(`RESPUESTAAAA: ${serviceData}`);
        return serviceData.map(servi => {
            console.log(servi.pic)
            return {
                code: servi.code,
                description: servi.description,
                destination: servi.destination,
                pic: servi.pic,
                type: servi.type,
                cost: servi.cost
            }
        })
    } catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
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

        const resp = await axios.post("https://turismo-back-k5g5kslg2a-rj.a.run.app/packages", request)
        return resp.data
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

const createService = async (service) => {
    try {
        const resp = await axios.post("https://turismo-back-k5g5kslg2a-rj.a.run.app/services", service)
        return resp.data
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

const deleteService = async (code) => {
    try {
        console.log("ESTOY ACAAA " + code)
        await axios.delete("https://turismo-back-k5g5kslg2a-rj.a.run.app/services/"+code)
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export const deletePackage = async (code) => {
    try {
        await axios.delete("https://turismo-back-k5g5kslg2a-rj.a.run.app/packages/"+code)
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export default {getPackages, getServices,createPackage, createService, deleteService, deletePackage}