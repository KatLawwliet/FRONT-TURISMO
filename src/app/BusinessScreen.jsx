'use client'
import React, {useEffect, useState} from 'react';
import {getClients} from "./services/ClientsService";
import {getSales} from "./services/SalesService";
import Tags from "./TagComponnent";
import Presentation from "./PesentationScreen";
import Table from "./TableComponnent";
import Button from "./ButtonComponnent";
import {deleteClient} from "@/app/services/ClientService";
import CreateClient from "@/app/CreateClientComponnent";

const Business = () => {
    const [clients, setClients] = useState([]);
    const [sales, setSales] = useState([]);
    const [seachInput, setSeachInput] = useState("")
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedSale, setSelectedSale] = useState(null);
    const [load, setLoad] = useState(0)
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedClients = await getClients(seachInput)
                const loadedSales = await getSales(seachInput)
                setClients(loadedClients)
                setSales(loadedSales)
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
        }
        fetchData()
    },[seachInput, load, isModalAddOpen])

    const handleSelectClient = (item) => {
        setSelectedClient(item);
    };


    const handleAddClientClick = () => {
        setIsModalAddOpen(!isModalAddOpen)
    }

    const handleSelectSale = (item) => {
        setSelectedSale(item);
    };

    const handleDeleteClientClick = async () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
        if (isConfirmed) {
            await deleteClient(selectedClient.id);
            alert("Cliente eliminado exitosamente.");
            setLoad(load + 1)
        }
    }

    const handleClientDownloadPdf = async () => {
        setPdfLoading(true);
        try {
            const response = await getClients(seachInput, true);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'clients.pdf';
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error al descargar PDF:', error);
        } finally {
            setPdfLoading(false);
        }
    };

    const handleSalesDownloadPdf = async () => {
        setPdfLoading(true);
        try {
            const response = await getSales(seachInput, true);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sales.pdf';
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error al descargar PDF:', error);
        } finally {
            setPdfLoading(false);
        }
    };



    const renderView = (condition) => {
        switch(condition) {
            case 'Clientes':
                return (
                    <Presentation data={clients}
                                  seachInput={setSeachInput}
                                  presentationMenu={<CreateClient isModalOpen={setIsModalAddOpen}/>}
                                  isMenuVisible={isModalAddOpen}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            height: '10%'
                        }}>
                            <Button text={"Agregar"} clickAction={() => handleAddClientClick()}></Button>
                            <Button text={"Borrar"} color={'#B32100'}
                                    clickAction={() => handleDeleteClientClick()}></Button>
                        </div>
                        {clients.length != 0 ? <Table
                            data={clients}
                            selectedItem={selectedClient}
                            onSelectItem={handleSelectClient}
                            showCheckboxes={true}
                        ></Table> : <h1>No se encontraron clientes</h1>}
                        <Button text={"Descargar PDF"} clickAction={handleClientDownloadPdf}
                                disabled={pdfLoading}></Button>
                    </Presentation>
                );
            case 'Ventas':
                return (
                    <Presentation data={clients} seachInput={setSeachInput}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            height: '10%'
                        }}>
                            <Button text={"Modificar"} clickAction={() => alert("Caca")}></Button>
                            <Button text={"Borrar"} color={'#B32100'}
                                    clickAction={() => handleDeleteClientClick()}></Button>
                        </div>
                        {sales.length != 0 ? <Table
                            data={sales}
                            selectedItem={selectedSale}
                            onSelectItem={handleSelectSale}
                            showCheckboxes={true}
                        ></Table> : <h1>No hay nada, gato, recatate</h1>}
                        <Button text={"Descargar PDF"} clickAction={handleSalesDownloadPdf}
                                disabled={pdfLoading}></Button>
                    </Presentation>
                );
        }
    };


    return (
        <div>
            <Tags renderView={renderView} buttons={[{name: "Clientes"}, {name: "Ventas"}]}></Tags>
        </div>
    );
};

export default Business;