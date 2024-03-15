import React, {useEffect, useState} from 'react';
import {getClients} from "../services/ClientsService";
import {getSales} from "../services/SalesService";
import Tags from "./TagComponnent";
import Presentation from "./PesentationScreen";
import Table from "./TableComponnent";
import Button from "./ButtonComponnent";

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
                    <Presentation data={clients} seachInput={setSeachInput}>
                        {clients.length != 0 ? <Table data={clients}></Table> : <h1>No hay nada, gato, recatate</h1>}
                        <Button text={"Descargar PDF"} clickAction={handleClientDownloadPdf} disabled={pdfLoading}></Button>
                    </Presentation>
                );
            case 'Ventas':
                return (
                    <Presentation data={clients} seachInput={setSeachInput}>
                        {sales.length != 0 ? <Table data={sales}></Table> : <h1>No hay nada, gato, recatate</h1>}
                        <Button text={"Descargar PDF"} clickAction={handleSalesDownloadPdf} disabled={pdfLoading}></Button>
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