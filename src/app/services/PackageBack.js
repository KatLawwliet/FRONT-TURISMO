import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

const base64Credentials = Buffer.from('martuto93@gmail.com:1234').toString('base64');

const getPackages = async (search) => {
    try {
        const response = await axios.get(baseURL+'/packages?searcher='+search, {
            headers: {
                'Authorization': `Basic ${base64Credentials}`
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

const getServices = async (search, typeId) => {
    try {
        console.log(`RESPUESTAAAA: ${search} y tambien ${typeId} `);
        const response = await axios.get(baseURL+'/services?searcher='+search+'&typeId='+typeId, {
            headers: {
                'Authorization': `Basic ${base64Credentials}`
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

const createPackage = async (name, destination, costo, pic = "", isCustom = false, services) => {

    try {
        const selectedServices = services || JSON.parse(localStorage.getItem('selectedServices'));

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
                'Authorization': `Basic ${base64Credentials}`
            }
        })
        return resp.data
    }catch (error){
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

const createService = async (service) => {
    try {
        const resp = await axios.post(baseURL+"/services", service, {
            headers: {
                'Authorization': `Basic ${base64Credentials}`
            }
        })
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
        await axios.delete(baseURL+"/services/"+code, {
            headers: {
                'Authorization': `Basic ${base64Credentials}`
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
                'Authorization': `Basic ${base64Credentials}`
            }
        })
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export default {getPackages, getServices,createPackage, createService, deleteService, deletePackage}