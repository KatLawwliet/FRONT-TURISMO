import React, {useEffect, useState} from 'react';
import Button from "./ButtonComponnent";
import SearchInput from "./SearchInputComponnet";
import Table from "./TableComponnent";
import PackageBack from "./services/PackageBack";
import {calculate} from "./services/SalesService";
import {createSale} from "./services/SalesService";
import {sendPaymentNotification} from './services/NotificationService'
import getClients from "./services/ClientService";
import Modal from "@/app/Modal";
import Input from "@/app/InputComponnet";

const Sale = ({isServiceSelected, toggleModal, setSelectedServices, setServices, services, selectedServices}) => {

    const [clients, setClients] = useState([])
    const [seachInput, setSeachInput] = useState("")
    const [selectedClient, setSelectedClient] = useState(null);
    const [calc, setCalc] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Mercado Pago');

    const toggleModalConfirmPayment = () => setIsModalOpen(!isModalOpen);

    useEffect(() => {
        if (selectedClient) {
            console.log("Cliente seleccionado: ", selectedClient);
        }
        const fetchData = async () => {
            try {
                const loadedClients = await getClients(seachInput);
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
    }, [seachInput,selectedClient, selectedServices]);

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
        const isConfirmed = window.confirm("¿Estás seguro de que decea prosesar la venta?");
        if (isConfirmed){
            const isPackage = selectedServices.length > 1
            const massage = () => {
                if (isPackage) {
                    return `Usted acaba de comprar los servicios: \n ${selectedServices.map(serv => {
                        return `${serv.codigo} ${serv.nombre} con destino a ${serv.destino} \n`
                    })}`
                }
                return `Usted acaba de comprar el servicio ${selectedServices[0].codigo} ${selectedServices[0].nombre} con destino a ${selectedServices[0].destino}`
            }
            if(isPackage){
                const code = await PackageBack.createPackage("Un paquete", "La Plata")
                await createSale({
                    paymentMethod: paymentMethod,
                    client: selectedClient.id,
                    packagee: code,
                    cost: calc.totalPrice
                })
            }else {
                await createSale({
                    paymentMethod: paymentMethod,
                    client: selectedClient.id,
                    service: selectedServices[0].codigo,
                    cost: calc.totalPrice
                })
            }
            await sendPaymentNotification({
                to: selectedClient.email,
                services: selectedServices,
                totalPrice: calc.totalPrice,
                discount: calc.discoutn
            })
            toggleModal()
            setSelectedServices([]);
            setServices(services.map(service => ({ ...service, isChecked: false })));
            localStorage.removeItem('selectedServices');
        }
    }

    const renderPaymentDetails = () => {
        return (
        <>
            <h4 style={{
                fontSize: 20,
                color: "#028035",
                marginBottom: 10,
            }}>Resumen</h4>
            <h1 style={styles.text}>Servicios seleccionados: {calc.servicesCount}</h1>
            <h1 style={styles.text}>Descuento: {calc.discoutn}</h1>
            <h1 style={styles.text}>Precio Total: $ {calc.totalPrice}</h1>
        </>
    )
    }


    return (
        <div>
            {
                isServiceSelected ?
                    (
                        <div style={styles.container}>
                            <div style={{
                                width: '70%',
                                margin: 10
                            }}>
                                <div style={{
                                    width: '90%',
                                    height: '10%',
                                    minHeight: 100,
                                    padding: 20,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end'
                                }}>
                                    {renderPaymentDetails()}
                                </div>
                            </div>

                            <div style={styles.containerServices}>
                                <h4 style={{
                                    fontSize: 20,
                                    color: "#028035",
                                    margin: 1
                                }}>Servicios</h4>
                                {<Table data={selectedServices}></Table>}
                                <h4 style={{
                                    fontSize: 20,
                                    color: "#028035",
                                    margin: 1
                                }}>Clientes</h4>
                                <SearchInput seachInput={setSeachInput}/>
                                {clients.length !== 0 ?
                                    <Table
                                        data={clients}
                                        showCheckboxes={true}
                                        selectedItem={selectedClient}
                                        onSelectItem={handleSelectItem}
                                    ></Table>
                                    : <h1>No se encuentra el cliente</h1>}
                            </div>


                            <div style={{display: 'flex', height: '20%', width: '75%', justifyContent: 'flex-end'}}>
                                <Button text={"Enviar"} clickAction={() => toggleModalConfirmPayment()}></Button>
                                <Button text={"Cerrar"} color={'#B32100'}
                                        clickAction={() => handleClosedClick()}></Button>
                            </div>
                            <Modal isOpen={isModalOpen} onClose={toggleModalConfirmPayment}>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}>
                                    <div>
                                        {renderPaymentDetails()}
                                    </div>
                                    <div style={styles.containerInput}>
                                        <div style={styles.text}>Medio de Pago :</div>
                                        <Input input={setPaymentMethod} isSelect={true} list={[
                                            {value: 'Mercado Pago', label: 'Mercado Pago'},
                                            {value: 'Efectivo', label: 'Efectivo'}
                                        ]}/>
                                    </div>
                                    <Button text={"Confirmar"} clickAction={() => handleCreateSaleClick()}></Button>
                                </div>
                            </Modal>

                        </div>
                    )
                    : (
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <h1>Debe seleccionar servicios</h1>
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
    containerInput:{
        width: '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
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
        fontSize: 20,
        color: "#475569"
    }
}

export default Sale;