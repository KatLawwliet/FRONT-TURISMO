import React, {useEffect, useState} from 'react';
import Button from "./ButtonComponnent";
import Input from "./InputComponnet";
import FileUploader from "./UploadedComponent";
import PackageBack from "../services/PackageBack";

const CreateService = ({isModalOpen}) => {

    const [name, setName] = useState(null)
    const [destination, setDestination] = useState(null)
    const [description, setDescription] = useState(null)
    const [cost, setCost] = useState(null)
    const [pic, setPic] = useState(null)
    const [datetime, setDatetime] = useState(() => {
        const now = new Date();
        return now.toISOString().slice(0, 16);
    });


    const styles = {
        container: {
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize:20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
        },
        containerInput:{
            width: '30%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 10
        },
        text: {
            color: '#475569'
        }
    }

    const handleClick = async () => {
        await PackageBack.createService({
            type: "1",
            description: description,
            destination: destination,
            date: datetime,
            cost: cost,
            pic: pic
        })
        isModalOpen(false)
    }
    const handleClose = () => {
        isModalOpen(false)
    }

    useEffect(() => {

    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.text}>Creacion de servicio</h1>
            <div style={styles.containerInput}>
                <div style={styles.text}>Nombre :</div>
                <Input input={setName}/>
            </div>
            <div style={styles.containerInput}>
                <div style={styles.text}>Fecha y Hora :</div>
                <input
                    style={{
                        width: '50%',
                        height: 30,
                        borderRadius: 20,
                        color: '#475569',
                        borderWidth: 2,
                        borderColor: '#e1e7f0',
                    }}
                    type="datetime-local"
                    onChange={(e) => setDatetime(e.target.value)}
                    value={datetime}
                />
            </div>
            <div style={styles.containerInput}>
                <div style={styles.text}>Descripcion :</div>
                <Input input={setDescription}/>
            </div>
            <div style={styles.containerInput}>
                <div style={styles.text}>Destino :</div>
                <Input input={setDestination}/>
            </div>
            <div style={styles.containerInput}>
                <div style={styles.text}>Costo :</div>
                <Input input={setCost}/>
            </div>
            <div style={styles.containerInput}>
                <div style={styles.text}>Foto :</div>
                <FileUploader setImage={setPic}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Button text={'Crear'} clickAction={() => handleClick()}></Button>
                <Button text={'Cerrar'} color={'#B32100'} clickAction={() => handleClose()}></Button>
            </div>
        </div>
    );
};

export default CreateService;