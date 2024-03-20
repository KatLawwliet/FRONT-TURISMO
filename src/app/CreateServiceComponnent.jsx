import React, {useEffect, useState} from 'react';
import Button from "./ButtonComponnent";
import Input from "./InputComponnet";
import FileUploader from "./UploadedComponent";
import PackageBack from "./services/PackageBack";

const CreateService = ({isModalOpen}) => {

    const [destination, setDestination] = useState(null)
    const [description, setDescription] = useState(null)
    const [type, setType] = useState(null)
    const [cost, setCost] = useState(null)
    const [pic, setPic] = useState(null)
    const [datetime, setDatetime] = useState(() => {
        const now = new Date();
        return now.toISOString().slice(0, 16);
    });


    const styles = {
        container: {
            fontSize:20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
        },
        containerInput:{
            width: '60%',
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
            type: type,
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

    }, [type]);

    return (
        <div style={styles.container}>
            <div style={{display: "flex", flexDirection: 'column', width:'100%', height:'100%', alignItems:'flex-start', margin:30}}>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Tipo :</div>
                    <Input input={(value) => setType(value)} isSelect={true} list={
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
                    <Input input={setDatetime} isDatetime={true}/>
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
                    <Input input={setCost} isNumeric={true}/>
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
        </div>
    );
};

export default CreateService;