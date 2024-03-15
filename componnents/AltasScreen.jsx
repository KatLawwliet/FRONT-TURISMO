import React, {useEffect, useState} from 'react';
import Presentation from "./PesentationScreen";
import Table from "./TableComponnent";
import Tags from "./TagComponnent";
import PackageBack from '../services/PackageBack'
import {getSelles} from '../services/SellersService'
import Button from "./ButtonComponnent";
import Modal from "./Modal";
import CreateService from "./CreateServiceComponnent";

const AltasScreen = () => {

    const [packages, setPackages] = useState([]);
    const [services, setServices] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [seachInput, setSeachInput] = useState("")
    const [isModalAddOpen, setIsModalAddOpen] = useState(true);
    const [selectedService, setSelectedService] = useState(null);

    const handleSelectItem = (item) => {
        setSelectedService(item);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedPackages = await PackageBack.getPackages(seachInput)
                const loadedServices = await PackageBack.getServices(seachInput, "")
                const loadedSellers = await getSelles(seachInput)
                setPackages(loadedPackages.map(lp => {
                    return {
                        codigo: lp.code,
                        nombre: lp.name,
                        destino: lp.destination
                    }
                }))
                setServices(loadedServices.map(ls => {
                    return {
                        codigo: ls.code,
                        descripcion: ls.description,
                        destino: ls.destination,
                        tipo: ls.type,
                        costo: ls.costo
                    }
                }))
                setSellers(loadedSellers)
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
        }
        fetchData()
    },[seachInput, isModalAddOpen])

    const handleAddServiceClick = () => {
        setIsModalAddOpen(true)
    }

    const handleDeleteClick = async () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este servicio?");
        if (isConfirmed) {
            await PackageBack.deleteService(selectedService.codigo);
            alert("Servicio eliminado exitosamente.");
        }
    }

    const toggleModal = () => {
        setIsModalAddOpen(!isModalAddOpen)
    };

    const renderView = (condition) => {
        switch(condition) {
            case 'Paquetes':
                return (
                    <Presentation data={packages} seachInput={setSeachInput}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            height:'10%'
                        }}>
                            <Button text={"Agregar"} clickAction={() => alert("Caca")}></Button>
                            <Button text={"Borrar"} color={'#B32100'} clickAction={() => alert("Caca")}></Button>
                        </div>
                        {packages.length !== 0 ? <Table data={packages} showCheckboxes={true}></Table> : <h1>No hay nada, gato, recatate</h1>}
                    </Presentation>
                );
            case 'Servicios':
                return (
                    <Presentation data={packages} seachInput={setSeachInput}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            height: '10%'
                        }}>
                            <Button text={"Agregar"} clickAction={() => handleAddServiceClick()}></Button>
                            <Modal isOpen={isModalAddOpen} onClose={toggleModal}>
                                <CreateService isModalOpen={setIsModalAddOpen}/>
                            </Modal>
                            <Button text={"Borrar"} color={'#B32100'} clickAction={() => handleDeleteClick()}></Button>
                        </div>
                        {services.length !== 0 ? <Table
                            data={services}
                            showCheckboxes={true}
                            selectedItem={selectedService}
                            onSelectItem={handleSelectItem}
                        ></Table> : <h1>No hay nada, gato, recatate</h1>}
                    </Presentation>
                );

            case 'Empleados':
                return (
                    <Presentation data={sellers} seachInput={setSeachInput}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            height: '10%'
                        }}>
                            <Button text={"Agregar"} clickAction={() => alert("Caca")}></Button>
                            <Button text={"Borrar"} color={'#B32100'} clickAction={() => alert("Caca")}></Button>
                        </div>
                        {sellers.length !== 0 ? <Table data={sellers} showCheckboxes={true}></Table> : <h1>No hay nada, gato, recatate</h1>}
                    </Presentation>
                );
        }
    };

    return (
        <div>
            <Tags
                renderView={renderView}
                buttons={[
                    {name: "Servicios"},
                    {name: "Paquetes"},
                    {name: "Empleados"}
                ]}
            ></Tags>
        </div>
    );
};

export default AltasScreen;