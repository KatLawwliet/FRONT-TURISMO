import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

let credentials

if (typeof window !== "undefined") {
    credentials = localStorage.getItem('auth');
}

const getPackages = async (search) => {
    try {
        console.log("CREDENCIALES: " + credentials)
        const response = await axios.get(baseURL+'/packages?searcher='+search, {
            headers: {
                'Authorization': `Basic ${credentials}`
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
                'Authorization': `Basic ${credentials}`
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
                'Authorization': `Basic ${credentials}`
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
                'Authorization': `Basic ${credentials}`
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
                'Authorization': `Basic ${credentials}`
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
                'Authorization': `Basic ${credentials}`
            }
        })
    }catch (error) {
        console.error('Hubo un error al realizar la solicitud:', error);
        throw error;
    }
}

export default {getPackages, getServices,createPackage, createService, deleteService, deletePackage}