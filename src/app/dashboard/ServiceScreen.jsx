import React, {useEffect, useState} from 'react';
import Service from "./ServiceComponnent";
import Presentation from "./PesentationScreen";
import Tags from "./TagComponnent";
import PackageBack from "../services/PackageBack";
import Sale from "./SaleComponnent";
import useLocalStorage from "./UseLocalStorage"

const ServiceScreen = () => {
    const [savedServices, setSavedServices] = useLocalStorage('selectedServices', '')
    const [selectedServices, setSelectedServices] = useState(() => {
        const parsedServices = savedServices ? savedServices : [];

        const arrayService = Array.isArray(parsedServices) ? parsedServices : [];
        return arrayService
    });
    const [seachInput, setSeachInput] = useState("");
    const [services, setServices] = useState([]);
    const [tagSelected, setTagSelected] = useState("Hotel");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    };
    const [auth, setAuth] = useLocalStorage('auth','');

    const handleServiceCheckChange = (serviceCode, isChecked) => {
        setSelectedServices(prevSelectedServices => {
            let newSelectedServices;
            if (isChecked) {
                const serviceToAdd = services.find(s => s.code === serviceCode);
                newSelectedServices = [...prevSelectedServices, serviceToAdd];
            } else {
                newSelectedServices = prevSelectedServices.filter(s => s.code !== serviceCode);
            }

            setSavedServices(newSelectedServices);
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
        const fetchData = async () => {
            try {
                const loadedServices = await PackageBack.getServices(seachInput, tagSelected, auth);
                setServices(loadedServices.map(service => ({
                    ...service,
                    isChecked: selectedServices.some(s => s.code === service.code)
                })));
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchData();
    }, [seachInput, tagSelected, selectedServices, auth]);


    const saleMenu = () => {
        return (
            <Sale
                isServiceSelected={selectedServices.length !== 0}
                toggleModal={toggleModal}
                services={services}
                selectedServices={selectedServices.map(srv => {
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
        )
    }


    const renderView = (condition) => {
        switch (condition) {
            case 'Hotel':
                return(
                    <Presentation data={services} seachInput={setSeachInput} presentationMenu={saleMenu()} isMenuVisible={selectedServices.length !== 0}>
                        {services.length !== 0 ? services.map((serv, index) => (
                                <Service
                                    key={serv.code}
                                    service={serv}
                                    onCheckChange={(serviceCode, isChecked) => handleServiceCheckChange(serviceCode, isChecked)}
                                    isChecked={selectedServices.some(selectedService => selectedService.code === serv.code)}
                                />
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{ fontSize: 20, color: "#475569" }}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
            case 'Auto':
                return(
                    <Presentation data={services} seachInput={setSeachInput} presentationMenu={saleMenu()} isMenuVisible={selectedServices.length !== 0}>
                        {services.length !== 0 ? services.map((serv, index) => (
                                <Service
                                    key={serv.code}
                                    service={serv}
                                    onCheckChange={(serviceCode, isChecked) => handleServiceCheckChange(serviceCode, isChecked)}
                                    isChecked={selectedServices.some(selectedService => selectedService.code === serv.code)}
                                />
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{ fontSize: 20, color: "#475569" }}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
            case 'Colectivo':
                return(
                    <Presentation data={services} seachInput={setSeachInput} presentationMenu={saleMenu()} isMenuVisible={selectedServices.length !== 0}>
                        {services.length !== 0 ? services.map((serv, index) => (
                                <Service
                                    key={serv.code}
                                    service={serv}
                                    onCheckChange={(serviceCode, isChecked) => handleServiceCheckChange(serviceCode, isChecked)}
                                    isChecked={selectedServices.some(selectedService => selectedService.code === serv.code)}
                                />
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{ fontSize: 20, color: "#475569" }}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
            case 'Avion':
                return(
                    <Presentation data={services} seachInput={setSeachInput} presentationMenu={saleMenu()} isMenuVisible={selectedServices.length !== 0}>
                        {services.length !== 0 ? services.map((serv, index) => (
                                <Service
                                    key={serv.code}
                                    service={serv}
                                    onCheckChange={(serviceCode, isChecked) => handleServiceCheckChange(serviceCode, isChecked)}
                                    isChecked={selectedServices.some(selectedService => selectedService.code === serv.code)}
                                />
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{ fontSize: 20, color: "#475569" }}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
            case 'Tren':
                return(
                    <Presentation data={services} seachInput={setSeachInput} presentationMenu={saleMenu()} isMenuVisible={selectedServices.length !== 0}>
                        {services.length !== 0 ? services.map((serv, index) => (
                                <Service
                                    key={serv.code}
                                    service={serv}
                                    onCheckChange={(serviceCode, isChecked) => handleServiceCheckChange(serviceCode, isChecked)}
                                    isChecked={selectedServices.some(selectedService => selectedService.code === serv.code)}
                                />
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{ fontSize: 20, color: "#475569" }}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
            case 'Excursiones':
                return(
                    <Presentation data={services} seachInput={setSeachInput} presentationMenu={saleMenu()} isMenuVisible={selectedServices.length !== 0}>
                        {services.length !== 0 ? services.map((serv, index) => (
                                <Service
                                    key={serv.code}
                                    service={serv}
                                    onCheckChange={(serviceCode, isChecked) => handleServiceCheckChange(serviceCode, isChecked)}
                                    isChecked={selectedServices.some(selectedService => selectedService.code === serv.code)}
                                />
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{ fontSize: 20, color: "#475569" }}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
            case 'Eventos':
                return(
                    <Presentation data={services} seachInput={setSeachInput} presentationMenu={saleMenu()} isMenuVisible={selectedServices.length !== 0}>
                        {services.length !== 0 ? services.map((serv, index) => (
                                <Service
                                    key={serv.code}
                                    service={serv}
                                    onCheckChange={(serviceCode, isChecked) => handleServiceCheckChange(serviceCode, isChecked)}
                                    isChecked={selectedServices.some(selectedService => selectedService.code === serv.code)}
                                />
                            )) :
                            <div style={styles.nothing}>
                                <h1 style={{ fontSize: 20, color: "#475569" }}>No se encontraron Servicios</h1>
                            </div>
                        }
                    </Presentation>
                )
        }
    }

    return (
        <div style={{ width:'98%'}}>


            <Tags renderView={renderView}
                  buttons={[
                      {name: "Hotel"},
                      {name: "Auto"},
                      {name: "Colectivo"},
                      {name: "Avion"},
                      {name: "Tren"},
                      {name: "Excursiones"},
                      {name: "Eventos"}
                  ]}
                  setSelected={setTagSelected}>
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