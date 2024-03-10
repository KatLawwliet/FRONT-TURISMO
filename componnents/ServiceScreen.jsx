import React, {useEffect, useState} from 'react';
import Service from "./ServiceComponnent";
import Presentation from "./PesentationScreen";
import Tags from "./TagComponnent";
import PackageBack from "../services/PackageBack";
import Button from "./ButtonComponnent";
import Modal from "./Modal";
import Sale from "./SaleComponnent";

const ServiceScreen = () => {
    const [selectedServices, setSelectedServices] = useState(() => {
        const savedServices = localStorage.getItem('selectedServices');
        const parsedServices = savedServices ? JSON.parse(savedServices) : [];

        const arrayService = Array.isArray(parsedServices) ? parsedServices : [];
        return arrayService
    });
    const [seachInput, setSeachInput] = useState("");
    const [services, setServices] = useState([]);
    const [tagSelected, setTagSelected] = useState("Alojamiento");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    };

    const handleServiceCheckChange = (serviceCode, isChecked) => {
        setSelectedServices(prevSelectedServices => {
            let newSelectedServices;
            if (isChecked) {
                const serviceToAdd = services.find(s => s.code === serviceCode);
                newSelectedServices = [...prevSelectedServices, serviceToAdd];
            } else {
                newSelectedServices = prevSelectedServices.filter(s => s.code !== serviceCode);
            }

            localStorage.setItem('selectedServices', JSON.stringify(newSelectedServices));
            return newSelectedServices;
        });
    };

    const handleCreatePackage = async () => {
        try {
            //await PackageBack.createPackage("name", "destination");
            toggleModal()


            console.log("Paquete creado con éxito");
        } catch (error) {
            console.error('Hubo un error al realizar la solicitud:', error);
        }
    }

    useEffect(() => {
        // No es necesario actualizar localStorage aquí porque ya lo hacemos en handleServiceCheckChange
        const fetchData = async () => {
            try {
                const loadedServices = await PackageBack.getServices(seachInput, tagSelected);
                setServices(loadedServices.map(service => ({
                    ...service,
                    // Verifica si el servicio está en el arreglo de seleccionados
                    isChecked: selectedServices.some(s => s.code === service.code)
                })));
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchData();
    }, [seachInput, tagSelected]);

    const renderView = (condition) => {
        switch (condition) {
            case 'Alojamiento':
                return(
                    <Presentation data={services} seachInput={setSeachInput}>
                        {services.length !== 0 ? services.map((serv, index) => (
                                <Service
                                    key={serv.code}
                                    service={serv}
                                    onCheckChange={(serviceCode, isChecked) => handleServiceCheckChange(serviceCode, isChecked)}
                                    isChecked={selectedServices.some(selectedService => selectedService.code === serv.code)}
                                />
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 20, color: "#475569" }}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
            case 'Transporte':
                return(
                    <Presentation data={services} seachInput={setSeachInput}>
                        {services.length !== 0 ? services.map((serv, index) => (
                                <Service
                                    key={serv.code}
                                    service={serv}
                                    onCheckChange={(serviceCode, isChecked) => handleServiceCheckChange(serviceCode, isChecked)}
                                    isChecked={selectedServices.some(selectedService => selectedService.code === serv.code)}
                                />
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 20, color: "#475569" }}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
            case 'Guía Turístico':
                return(
                    <Presentation data={services} seachInput={setSeachInput}>
                        {services.length !== 0 ? services.map((serv, index) => (
                                <Service
                                    key={serv.code}
                                    service={serv}
                                    onCheckChange={(serviceCode, isChecked) => handleServiceCheckChange(serviceCode, isChecked)}
                                    isChecked={selectedServices.some(selectedService => selectedService.code === serv.code)}
                                />
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 20, color: "#475569" }}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
            case 'Comida y Bebida':
                return(
                    <Presentation data={services} seachInput={setSeachInput}>
                        {services.length !== 0 ? services.map((serv, index) => (
                                <Service
                                    key={serv.code}
                                    service={serv}
                                    onCheckChange={(serviceCode, isChecked) => handleServiceCheckChange(serviceCode, isChecked)}
                                    isChecked={selectedServices.some(selectedService => selectedService.code === serv.code)}
                                />
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 20, color: "#475569" }}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
        }
    }

    return (
        <div style={{ maxHeight: 770,}}>

            <Modal
                isOpen={isModalOpen}
                onClose={toggleModal}
                width={'50%'}
                height={'80%'}
            >
                <Sale
                    isServiceSelected={selectedServices.length !== 0}
                    toggleModal={toggleModal}
                    services={services}
                    selectedServices={selectedServices.map( srv => {
                        return {
                            codigo: srv.code,
                            nombre: srv.description,
                            destino: srv.destination,
                            costo: srv.cost
                        }
                    })}
                    setSelectedServices={setSelectedServices}
                    setServices={setServices}
                />
            </Modal>
            <Tags renderView={renderView}
                  buttons={[{name: "Alojamiento"}, {name: "Transporte"}, {name: "Guía Turístico"}, {name: "Comida y Bebida"}]}
                  setSelected={setTagSelected}>
                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%'}}>
                    <Button text={"Vender"} clickAction={handleCreatePackage}></Button>
                </div>
            </Tags>
        </div>
    );
};


const styles = {

    nothing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '25%',
    }
}
export default ServiceScreen;