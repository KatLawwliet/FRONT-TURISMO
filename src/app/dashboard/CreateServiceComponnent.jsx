import React, { useEffect, useState } from 'react';
import Button from "./ButtonComponnent";
import Input from "./InputComponnet";
import FileUploader from "./UploadedComponent";
import PackageBack from "../services/PackageBack";
import useLocalStorage from "./UseLocalStorage"

const CreateService = ({ isModalOpen, selectedService = null }) => {
    const [code, setCode] = useState(null);
    const [destination, setDestination] = useState(null);
    const [description, setDescription] = useState(null);
    const [type, setType] = useState("1");
    const [cost, setCost] = useState(null);
    const [pic, setPic] = useState(null);
    const [datetime, setDatetime] = useState(() => {
        const now = new Date();
        return now.toISOString().slice(0, 16);
    });
    const [auth, setAuth] = useLocalStorage('auth', '');

    const styles = {
        container: {
            fontSize: 15,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%',
            width: '90%',
        },
        containerInput: {
            width: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 10
        },
        text: {
            color: '#475569'
        }
    };


    const handleClick = async () => {
        if (selectedService) { 
            await PackageBack.updateService({
                destination: destination,
                description: description,
                type: type,
                cost: cost,
                pic: pic,
                datetime: datetime,
            }, selectedService.code, auth); 
        } else {
            await PackageBack.createService({
                type: type,
                description: description,
                destination: destination,
                date: datetime,
                cost: cost,
                pic: pic,
            }, auth);
        }
        isModalOpen(false); 
    };

    useEffect(() => {
        if(selectedService) {
            console.log("uqddsdffgfagag: "+selectedService.destination)
            setDestination(selectedService.destino)
            setDescription(selectedService.descripcion)
            setType(selectedService.tipo)
            setCost(selectedService.costo)
            setDatetime(selectedService.fecha)
        }
    }, [selectedService, isModalOpen, type, auth])

    const handleClose = () => {
        isModalOpen(false);
    };

    return (
        <div style={styles.container}>
            <div style={{
                display: "flex",
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                alignItems: 'flex-start',
                margin: 30
            }}>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Tipo :</div>
                    <Input input={(value) => setType(value)} isSelect={true} defaultText={type} list={
                        [
                            {value: "1", label: "Hotel"},
                            {value: "6", label: "Auto"},
                            {value: "7", label: "Colectivo"},
                            {value: "8", label: "Avion"},
                            {value: "9", label: "Tren"},
                            {value: "10", label: "Excursiones"},
                            {value: "11", label: "Eventos"},
                        ]
                    }/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Fecha :</div>
                    <Input input={setDatetime} isDatetime={true} defaultText={datetime}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Descripcion :</div>
                    <Input input={setDescription} defaultText={description}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Destino :</div>
                    <Input input={setDestination} defaultText={destination}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Costo :</div>
                    <Input input={setCost} isNumeric={true} defaultText={cost}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Foto :</div>
                    <FileUploader setImage={setPic} defaultText={pic}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Button text={'Crear'} clickAction={() => handleClick()}></Button>
                    <Button text={'Cerrar'} color={'#B32100'} clickAction={() => handleClose()}></Button>
                </div>
            </div>
        </div>
    );
};

export default CreateService;