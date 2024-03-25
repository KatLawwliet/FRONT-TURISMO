import React, { useEffect, useState } from 'react';
import Presentation from "./PesentationScreen";
import Button from "./ButtonComponnent";
import Table from './TableComponnent';
import useLocalStorage from "./UseLocalStorage"
import {getSales, deleteSale } from '../services/SalesService'


const SalesTagB = () => {

    const [pdfLoading, setPdfLoading] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [sales, setSales] = useState([]);
    const [seachInput, setSeachInput] = useState("")
    const [auth, setAuth] = useLocalStorage('auth', '');


    useEffect(() => {

        const fetchData = async () => {
            try {
                const loadedSales = await getSales(seachInput, false, auth)
                setSales(loadedSales)
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        }
        fetchData()
    }, [seachInput, auth])

    const handleSelectSale = (item) => {
        setSelectedSale(item);
    };


    const handleDeleteSaleClick = async () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar esta venta?");
        if (isConfirmed) {
            await deleteSale(selectedSale.codigo, auth);
            alert("Venta eliminada exitosamente.");
        }
    }



    const handleSalesDownloadPdf = async () => {
        setPdfLoading(true);
        try {
            const response = await getSales(seachInput, true, auth);
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


    return (
        <Presentation data={sales} seachInput={setSeachInput}>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                height: '2%',
            }}>
                <Button text={"Modificar"} clickAction={() => alert("Caca")}></Button>
                <Button text={"Borrar"} color={'#B32100'}
                    clickAction={() => handleDeleteSaleClick()}></Button>
            </div>
            {sales.length != 0 ? <Table
                data={sales}
                selectedItem={selectedSale}
                onSelectItem={handleSelectSale}
                showCheckboxes={true}
            ></Table> : <h1>No se encontraron ventas</h1>}
            <Button text={"Descargar PDF"} clickAction={handleSalesDownloadPdf}
                disabled={pdfLoading}></Button>
        </Presentation>
    )
} 

export default SalesTagB