'use client'
import React, {useEffect, useState} from 'react';
import Presentation from "./PesentationScreen";
import Table from "./TableComponnent";
import Tags from "./TagComponnent";
import PackageBack from '../services/PackageBack'
import {deleteSeller, getSelles} from '../services/SellersService'
import Button from "./ButtonComponnent";
import CreateService from "@/app/dashboard/CreateServiceComponnent";
import CreateEmployee from "@/app/dashboard/CreateEmployeeComponnent";
import CreatePackage from "@/app/dashboard/CreatePackageComponnent";

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
    const [auth, setAuth] = useState(null);

    const clean = () => {
        setSelectedService(null);
        setLoad(load + 1)
    };

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
            await PackageBack.deleteService(selectedService.codigo, auth);
            alert("Servicio eliminado exitosamente.");
            setLoad(load + 1)
        }
    }
    const handleDeletePackageClick = async () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este paquete?");
        if (isConfirmed) {
            await PackageBack.deletePackage(sellectedPackages.codigo, auth);
            alert("Servicio eliminado exitosamente.");
            setLoad(load + 1)
        }
    }

    const handleDeleteSellerClick = async () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este empleado?");
        if (isConfirmed) {
            await deleteSeller(selectedSeller.id, auth);
            alert("Servicio eliminado exitosamente.");
            setLoad(load + 1)
        }
    }

    useEffect(() => {
        const authData = localStorage.getItem('auth');
        setAuth(authData);
        const fetchData = async () => {
            try {
                
                const loadedPackages = await PackageBack.getPackages(seachInput, auth)
                const loadedServices = await PackageBack.getServices(seachInput, "", auth)
                const loadedSellers = await getSelles(seachInput, auth)
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
                        costo: '$ '+ls.cost,
                        fecha: ls.datetime
                    }
                }))
                setSellers(loadedSellers.map(sel => {
                    return {
                        nombre_completo: `${sel.lastname} ${sel.name}`,
                        dni: sel.dni,
                        nacionalidad: sel.nationality,
                        telefono: sel.cellPhone,
                        email: sel.email,
                        cargo: sel.charge,
                        sueldo: sel.salary
                    }
                }))
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
        }
        fetchData()
    },[seachInput, isModalAddOpen, load, auth])


    const handleAddServiceClick = () => {
        setIsModalAddOpen(!isModalAddOpen)
        setSelectedService(null)
    }

    const handleModifyServiceClick = () => {
        setIsModalAddOpen(!isModalAddOpen); 
    };

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
                    <Presentation
                        data={packages}
                        isMenuVisible={isModalAddOpen}
                        presentationMenu={<CreatePackage isModalOpen={setIsModalAddOpen} setLoad={setLoad}/>}
                        seachInput={setSeachInput}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            height:'2%'
                        }}>
                            <Button text={"Agregar"} clickAction={() => handleAddServiceClick()}></Button>
                            <Button text={"Borrar"} color={'#B32100'} clickAction={() => handleDeletePackageClick()}></Button>
                        </div>
                        {packages.length !== 0 ? <Table
                            data={packages}
                            selectedItem={sellectedPackages}
                            onSelectItem={handleSelectPackage}
                            showCheckboxes={true}
                        ></Table> : <h1>No se encontararon paquetes </h1>}
                        <Button text={"Descargar PDF"} clickAction={() => alert("Descargar PDF")}
                                disabled={"pdfLoading"}></Button>
                    </Presentation>
                );
            case 'Servicios':
                return (
                    <Presentation
                        data={packages}
                        seachInput={setSeachInput}
                        presentationMenu={<CreateService isModalOpen={setIsModalAddOpen} selectedService={selectedService}/>}
                        isMenuVisible={isModalAddOpen}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            height:'2%'
                        }}>
                            <Button text={"Agregar"} clickAction={() => handleAddServiceClick()}></Button>
                            <Button text={"Borrar"} color={'#B32100'} clickAction={() => handleDeleteServiceClick()}></Button>
                            {selectedService ? <Button text={"Modificar"} clickAction={() => handleModifyServiceClick()}></Button> : ""}
                        </div>
                        {services.length !== 0 ? <Table
                            data={services}
                            showCheckboxes={true}
                            selectedItem={selectedService}
                            onSelectItem={handleSelectService}
                        ></Table> : <h1>No se encontraron servicios</h1>}
                        <Button text={"Descargar PDF"} clickAction={() => alert("Descargar PDF")}
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
                            height:'2%'
                        }}>
                            <Button text={"Agregar"} clickAction={() => handleAddEmployeClick()}></Button>
                            <Button text={"Borrar"} color={'#B32100'} clickAction={() => handleDeleteSellerClick()}></Button>
                        </div>
                        {sellers.length !== 0 ? <Table
                            data={sellers}
                            showCheckboxes={true}
                            selectedItem={selectedSeller}
                            onSelectItem={handleSelectSeller}
                        ></Table> : <h1>No se encontraron empleados</h1>}
                        <Button text={"Descargar PDF"} clickAction={() => alert("Descargar PDF")}
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