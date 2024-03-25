import React, {useEffect, useState} from 'react';
import Input from "@/app/dashboard/InputComponnet";
import PackageBack from "@/app/services/PackageBack";
import SearchInput from "@/app/dashboard/SearchInputComponnet";
import TableCheck from "@/app/dashboard/TableCkeck";
import Button from "@/app/dashboard/ButtonComponnent";
import {calculate} from "@/app/services/SalesService";
import Modal from "@/app/dashboard/Modal";
import FileUploader from "@/app/dashboard/UploadedComponent";

const CreatePackage = ({isModalOpen, setLoad}) => {

    const [name, setName] = useState("")
    const [pic, setPic] = useState("")
    const [destination, setDestination] = useState("")
    const [serviceType, setServiceType] = useState("Hotel")
    const [services, setServices] = useState([])
    const [seachInput, setSeachInput] = useState("")
    const [selectedServices, setSelectedServices] = useState([]);
    const [isSearch, setIsSearch] = useState(false)
    const [calc, setCalc] = useState({})
    const [auth, setAuth] = useState(null);

    const [isModalOpennn, setIsModalOpennn] = useState(false);

    const toggleModal = async () => {
        const calcul = await calculate({
            services: selectedServices.map(ss => {
                return {
                    code: ss.codigo,
                    price: ss.costo
                }
            })
        })
        setCalc(calcul)
        setIsModalOpennn(!isModalOpennn);
    }

    const styles = {
        container: {
            fontSize:20,
            width: '100%',
        },
        containerInput:{
            width: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 10
        },
        text: {
            color: '#475569'
        }
    }

    const handleCheckboxChange = (codigo) => {
        setSelectedServices(prev => {
            if (prev.some(service => service.codigo === codigo)) {

                return prev.filter(service => service.codigo !== codigo);
            } else {
                const addedService = services.find(service => service.codigo === codigo);
                return [...prev, addedService];
            }
        });
    };

    useEffect(() => {
        const authData = localStorage.getItem('auth');
        setAuth(authData);

        const fetchData = async () => {
            try {
                const loadedServices = await PackageBack.getServices(seachInput, serviceType, auth);
                setServices(loadedServices.map(service => ({
                    tipo: service.type,
                    codigo: service.code,
                    descripcion: service.description,
                    destino: service.destination,
                    costo: service.cost,
                    isChecked: selectedServices.some(s => s.code === service.code)
                })));




            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchData();
    }, [serviceType, seachInput, selectedServices, isModalOpennn, auth]);

    const searchService = () => {
        setIsSearch(!isSearch)
    }

    const handleClick = async () => {
        const isConfirmed = window.confirm("¿Estás seguro de que decea crear paquete?");
        if (isConfirmed){
            try {
                await PackageBack.createPackage(name, destination, calc.totalPrice, pic, true, selectedServices.map(s => {
                    return {
                        code: s.codigo
                    }
                }), auth)
            } catch (error){
                console.log(error.message)
            }
            setLoad(calc.totalPrice * 3)
            isModalOpen(false)
        }
    }

    const handleClose = () => {
        isModalOpen(false)
    }

    return (
        <div style={styles.container}>
            <div style={{
                fontSize: 15,
                display: "flex",
                flexDirection: 'column',
                width: '90%',
                height: '100%',
                alignItems: 'flex-start',
                margin: 30
            }}>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Nombre :</div>
                    <Input input={setName}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Destino :</div>
                    <Input input={setDestination}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Foto :</div>
                    <FileUploader setImage={setPic}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Tipo de Servicio :</div>
                    <Input input={setServiceType} isSelect={true} list={[
                        {value: "Hotel", label: "Hotel"},
                        {value: "Auto", label: "Auto"},
                        {value: "Colectivo", label: "Colectivo"},
                        {value: "Avion", label: "Avion"},
                        {value: "Tren", label: "Tren"},
                        {value: "Excursiones", label: "Excursiones"},
                        {value: "Eventos", label: "Eventos"},
                    ]}/>
                </div>
                <Button text={"Buscar servicio"} clickAction={() => searchService()}></Button>
                {isSearch ? (
                    <>
                        <SearchInput seachInput={setSeachInput}/>
                        <div style={{width: '100%', height: '20%'}}>
                            {services.length !== 0 ? <TableCheck data={services.map(service => ({
                                ...service,
                                costo:`$ ${service.costo}`,
                                isChecked: selectedServices.some(s => s.codigo === service.codigo)
                            }))} onCheckboxChange={handleCheckboxChange}></TableCheck> : <div>CACA</div>}
                        </div>
                    </>
                ) : ""}
                <div style={styles.text}>
                    {selectedServices.length !== 0 ? selectedServices.map(ser => {
                        return (
                            <div style={{margin: 10, display: "flex", justifyContent: 'space-between', width: '100%'}}>
                                <b style={{color: '#028035'}}>{`${ser.tipo} `}</b>
                                <div>
                                    {`${ser.descripcion}  /  ${ser.destino}`}
                                </div>

                            </div>
                        )
                    }) : <h4></h4>}
                </div>
                <div style={{height: '10%', display: "flex", justifyContent: 'flex-end'}}>
                    <Button text={'Crear'} clickAction={() => toggleModal()}></Button>
                    <Button text={'Cerrar'} color={'#B32100'} clickAction={() => handleClose()}></Button>
                </div>
                <Modal isOpen={isModalOpennn} onClose={toggleModal}>
                    <div style={{
                        height: '100%',
                        display: "flex",
                        flexDirection: "column",
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <h1 style={{fontSize: 20}}>Servicios seleccionados: {calc.servicesCount}</h1>
                        <h1 style={{fontSize: 20}}>Descuento: {calc.discoutn}</h1>
                        <h1 style={{fontSize: 20}}>Precio Total: $ {calc.totalPrice}</h1>
                        <div style={{height: '10%', display: "flex", justifyContent: 'flex-end'}}>
                            <Button text={'Crear'} clickAction={() => handleClick()}></Button>
                            <Button text={'Cerrar'} color={'#B32100'} clickAction={() => handleClose()}></Button>
                        </div>
                    </div>

                </Modal>
            </div>

        </div>
    );
};

export default CreatePackage;