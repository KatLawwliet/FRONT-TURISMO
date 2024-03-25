'use client'
import React, {useEffect, useState} from 'react';
import Presentation from "./PesentationScreen";
import Button from "./ButtonComponnent";
import CreateClient from './CreateClientComponnent'
import Table from './TableComponnent';
import {deleteClient, getClients} from "../services/ClientService";
import useLocalStorage from "./UseLocalStorage"

const ClientTag = () => {

    const [clients, setClients] = useState([]);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [auth, setAuth] = useLocalStorage('auth', '');
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [seachInput, setSeachInput] = useState("")
    const [selectedClient, setSelectedClient] = useState(null);

    const handleClientDownloadPdf = async () => {
        setPdfLoading(true);
        try {
            const response = await getClientsPdf(seachInput, true, auth);
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

    const handleSelectClient = (item) => {
        setSelectedClient(item);
    };

    const handleModifyClientClick = () => {
        setIsModalAddOpen(!isModalAddOpen)
    }


    const handleAddClientClick = () => {
        setIsModalAddOpen(!isModalAddOpen)
        setSelectedClient(null)
    }


    const handleDeleteClientClick = async () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
        if (isConfirmed) {
            await deleteClient(selectedClient.id, auth);
            alert("Cliente eliminado exitosamente.");
        }
    }


    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const loadedClients = await getClients(seachInput, auth)
                setClients(loadedClients)
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
        }
        fetchData()
    },[seachInput, isModalAddOpen, auth])


    return (
        <Presentation data={clients}
                    seachInput={setSeachInput}
                    presentationMenu={<CreateClient isModalOpen={setIsModalAddOpen} selectedClient={selectedClient}/>}
                    isMenuVisible={isModalAddOpen}>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                height: '2%',
            }}>
                <Button text={"Agregar"} clickAction={() => handleAddClientClick()}></Button>
                {selectedClient ? <Button text={"Modificar"} clickAction={() => handleModifyClientClick()}></Button> : ""}
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
    )
}

export default ClientTag