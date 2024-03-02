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
        <div >
            <Tags renderView={renderView} buttons={[{name: "Clientes"}, {name: "Ventas"}]}></Tags>
        </div>

    );
};

export default Business;