import axios from 'axios';

const getPackages = async (search) => {
    try {
        const response = await axios.get('http://localhost:8080/packages?searcher='+search);
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
        const response = await axios.get('http://localhost:8080/services?searcher='+search+'&typeId='+typeId);
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

        const resp = await axios.post("http://localhost:8080/packages", request)
        return resp.data
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

const createService = async (service) => {
    try {
        const resp = await axios.post("http://localhost:8080/services", service)
        return resp.data
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

const deleteService = async (code) => {
    try {
        await axios.delete("http://localhost:8080/services/"+code)
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export default {getPackages, getServices,createPackage, createService, deleteService}