import React, {useEffect, useState} from 'react';
import Button from "./ButtonComponnent";
import SearchTableScreen from "./SearchTableScreen";
import {getClients} from "../services/ClientsService";
import {getSales} from "../services/SalesService";

const Business = () => {

    const [activeView, setActiveView] = useState('A');
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



    const renderView = () => {
        switch(activeView) {
            case 'A':
                return <SearchTableScreen data={clients} seachInput={setSeachInput}/>;
            case 'B':
                return <SearchTableScreen data={sales} seachInput={setSeachInput}/>;
        }
    };


    return (
        <div >
            <div style={style.tagsButtons}>
                <Button text={"Clientes"} clickAction={() => setActiveView("A")}/>
                <Button text={"Ventas"} clickAction={() => setActiveView("B")}/>
            </div>
            {renderView()}
        </div>

    );
};

const style = {
    searchContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    tagsButtons: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    }
}

export default Business;