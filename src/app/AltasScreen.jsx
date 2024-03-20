'use client'
import React, {useEffect, useState} from 'react';
import Presentation from "./PesentationScreen";
import Table from "./TableComponnent";
import Tags from "./TagComponnent";
import PackageBack from './services/PackageBack'
import {deleteSeller, getSelles} from './services/SellersService'
import Button from "./ButtonComponnent";
import Modal from "./Modal";
import CreateService from "./CreateServiceComponnent";
import CreateEmployee from "@/app/CreateEmployeeComponnent";

const AltasScreen = () => {

    const [packages, setPackages] = useState([]);
    const [services, setServices] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [seachInput, setSeachInput] = useState("")
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [sellectedPackages, setSellectedPackages] = useState(null)
    const [load, setLoad] = useState(0)

    const handleSelectService = (item) => {
        setSelectedService(item);
    };
    const handleSelectPackage = (item) => {
        setSellectedPackages(item);
    };
    const handleSelectSeller = (item) => {
        setSelectedSeller(item);
    };

    const handleDeleteServiceClick = async () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este servicio?");
        if (isConfirmed) {
            await PackageBack.deleteService(selectedService.codigo);
            alert("Servicio eliminado exitosamente.");
            setLoad(load + 1)
        }
    }
    const handleDeletePackageClick = async () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este paquete?");
        if (isConfirmed) {
            await PackageBack.deletePackage(sellectedPackages.codigo);
            alert("Servicio eliminado exitosamente.");
            setLoad(load + 1)
        }
    }

    const handleDeleteSellerClick = async () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este empleado?");
        if (isConfirmed) {
            await deleteSeller(selectedSeller.id);
            alert("Servicio eliminado exitosamente.");
            setLoad(load + 1)
        }
    }

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
                        costo: '$ '+ls.cost
                    }
                }))
                setSellers(loadedSellers)
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
        }
        fetchData()
    },[seachInput, isModalAddOpen, load])

    const handleAddServiceClick = () => {
        setIsModalAddOpen(!isModalAddOpen)
    }

    const handleAddEmployeClick = () => {
        setIsModalAddOpen(!isModalAddOpen)
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
                            <Button text={"Borrar"} color={'#B32100'} clickAction={() => handleDeletePackageClick()}></Button>
                        </div>
                        {packages.length !== 0 ? <Table
                            data={packages}
                            selectedItem={sellectedPackages}
                            onSelectItem={handleSelectPackage}
                            showCheckboxes={true}
                        ></Table> : <h1>No hay nada, gato, recatate</h1>}
                        <Button text={"Descargar PDF"} clickAction={() => alert("caca")}
                                disabled={"pdfLoading"}></Button>
                    </Presentation>
                );
            case 'Servicios':
                return (
                    <Presentation
                        data={packages}
                        seachInput={setSeachInput}
                        presentationMenu={<CreateService isModalOpen={setIsModalAddOpen}/>}
                        isMenuVisible={isModalAddOpen}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            height: '10%'
                        }}>
                            <Button text={"Agregar"} clickAction={() => handleAddServiceClick()}></Button>
                            <Button text={"Borrar"} color={'#B32100'} clickAction={() => handleDeleteServiceClick()}></Button>
                        </div>
                        {services.length !== 0 ? <Table
                            data={services}
                            showCheckboxes={true}
                            selectedItem={selectedService}
                            onSelectItem={handleSelectService}
                        ></Table> : <h1>No hay nada, gato, recatate</h1>}
                        <Button text={"Descargar PDF"} clickAction={() => alert("caca")}
                                disabled={"pdfLoading"}></Button>
                    </Presentation>
                );

            case 'Empleados':
                return (
                    <Presentation
                        data={sellers}
                        seachInput={setSeachInput}
                        presentationMenu={<CreateEmployee isModalOpen={setIsModalAddOpen}/>}
                        isMenuVisible={isModalAddOpen}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            height: '10%'
                        }}>
                            <Button text={"Agregar"} clickAction={() => handleAddEmployeClick()}></Button>
                            <Button text={"Borrar"} color={'#B32100'} clickAction={() => handleDeleteSellerClick()}></Button>
                        </div>
                        {sellers.length !== 0 ? <Table
                            data={sellers}
                            showCheckboxes={true}
                            selectedItem={selectedSeller}
                            onSelectItem={handleSelectSeller}
                        ></Table> : <h1>No hay nada, gato, recatate</h1>}
                        <Button text={"Descargar PDF"} clickAction={() => alert("caca")}
                                disabled={"pdfLoading"}></Button>
                    </Presentation>
                );
        }
    };

    return (
        <div>
            <Tags
                renderView={renderView}
                buttons={[
                    {name: "Paquetes"},
                    {name: "Servicios"},
                    {name: "Empleados"}
                ]}
            ></Tags>
        </div>
    );
};

export default AltasScreen;