import React, {useEffect, useState} from 'react';
import Button from "./ButtonComponnent";
import SearchInput from "./SearchInputComponnet";
import Table from "./TableComponnent";
import ClientsBack from "../services/ClientService";
import PackageBack from "../services/PackageBack";
import {calculate} from "../services/SalesService";
import {createSale} from "../services/SalesService";

const Sale = ({isServiceSelected, toggleModal, setSelectedServices, setServices, services, selectedServices}) => {

    const [clients, setClients] = useState([{caca: 'caca', pedo: 'pedo'}])
    const [seachInput, setSeachInput] = useState("")
    const [selectedClient, setSelectedClient] = useState(null);
    const [calc, setCalc] = useState({});

    const handleSelectItem = (item) => {
        setSelectedClient(item);
    };
    const handleClosedClick = () => {
        toggleModal()
        setSelectedServices([]);
        setServices(services.map(service => ({ ...service, isChecked: false })));
        localStorage.removeItem('selectedServices');
    }

    const handleCreateSaleClick = async () => {

        if(selectedServices.length > 1){
            const code = await PackageBack.createPackage("Un paquete", "La Plata")
            await createSale({
                paymentMethod: "Con la cola",
                client: selectedClient.id,
                packagee: code
            })
        }else {
            await createSale({
                paymentMethod: "Con la cola",
                client: selectedClient.id,
                service: selectedServices[0].codigo
            })
        }
        toggleModal()
        setSelectedServices([]);
        setServices(services.map(service => ({ ...service, isChecked: false })));
        localStorage.removeItem('selectedServices');
    }

    useEffect(() => {
        if (selectedClient) {
            console.log("Cliente seleccionado: ", selectedClient);
        }
        const fetchData = async () => {
            try {
                const loadedClients = await ClientsBack.getClients(seachInput);
                const servi = {
                    services: selectedServices.map(ss => {
                        return {
                            code: ss.codigo,
                            price: ss.costo
                        }
                    })
                }
                const calculates = await calculate(servi)
                setCalc(calculates)
                setClients(loadedClients)
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };
        fetchData();
    }, [seachInput,selectedClient]);


    return (
        <div >
            {
                isServiceSelected ?
                    (
                        <div style={styles.container}>
                            <h1 style={{
                                fontFamily: 'Arial, Helvetica, sans-serif',
                                fontSize: 30,
                                color: "#475569"
                            }}>Venta</h1>
                            <div style={styles.containerServices}>
                                {<Table data={selectedServices} ></Table>}
                                <SearchInput seachInput={setSeachInput}/>
                                {clients.length != 0 ? <Table
                                    data={clients}
                                    showCheckboxes={true}
                                    selectedItem={selectedClient}
                                    onSelectItem={handleSelectItem}
                                ></Table> : <h1 >No hay nada, gato, recatate</h1>}
                            </div>

                            <div style={{ width: '90%', height:'10%', minHeight: 100, padding: 30}}>
                                <h1 style={styles.text}>Servicios seleccionados: {calc.servicesCount}</h1>
                                <h1 style={styles.text}>Descuento: {calc.discoutn}</h1>
                                <h1 style={styles.text}>Precio Total: $ {calc.totalPrice}</h1>
                            </div>

                            <div style={{display: 'flex', height: '20%'}}>
                                <Button text={"Cerrar"} color={'#B32100'} clickAction={() => handleClosedClick()}></Button>
                                <Button text={"Enviar"}  clickAction={() => handleCreateSaleClick()}></Button>
                            </div>
                        </div>
                    )
                    : (
                        <div style={styles.container}>
                            <h1 style={styles.text}>Servicio no seleccionado</h1>
                            <Button text={"Cerrar"} color={'#B32100'} clickAction={() => handleClosedClick()}></Button>
                        </div>
                    )
            }
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: 400
    },

    containerServices: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '90%',
        height: '90%',
        minHeight: 400
    },
    text: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 20,
        color: "#475569"
    }
}

export default Sale;