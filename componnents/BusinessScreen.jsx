import React, {useEffect, useState} from 'react';
import {getClients} from "../services/ClientsService";
import {getSales} from "../services/SalesService";
import Tags from "./TagComponnent";
import Presentation from "./PesentationScreen";
import Table from "./TableComponnent";

const Business = () => {
    const [clients, setClients] = useState([]);
    const [sales, setSales] = useState([]);
    const [seachInput, setSeachInput] = useState("")
    const [pdfLoading, setPdfLoading] = useState(false);

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
    },[seachInput])

    const handleDownloadPdf = async () => {
        setPdfLoading(true);
        try {
            // Realizar la petición para descargar el PDF
            const response = await fetch('http://localhost:8080/print/clients/pdf');
            // Convertir la respuesta a blob
            const blob = await response.blob();
            // Crear un objeto URL para el blob
            const url = URL.createObjectURL(blob);
            // Crear un enlace invisible para descargar el PDF
            const a = document.createElement('a');
            a.href = url;
            a.download = 'clients.pdf';
            document.body.appendChild(a);
            a.click();
            // Limpiar el objeto URL y eliminar el enlace
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
                    <Presentation data={clients} seachInput={setSeachInput}>
                        {clients.length != 0 ? <Table data={clients}></Table> : <h1>No hay nada, gato, recatate</h1>}
                    </Presentation>
                );
            case 'Ventas':
                return (
                    <Presentation data={clients} seachInput={setSeachInput}>
                        {sales.length != 0 ? <Table data={sales}></Table> : <h1>No hay nada, gato, recatate</h1>}
                    </Presentation>
                );
        }
    };


    return (
        <div>
            <Tags renderView={renderView} buttons={[{name: "Clientes"}, {name: "Ventas"}]}></Tags>
            <button onClick={handleDownloadPdf} disabled={pdfLoading}>Descargar PDF</button>
        </div>

    );
};

export default Business;