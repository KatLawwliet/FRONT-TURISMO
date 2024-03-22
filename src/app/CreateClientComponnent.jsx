import React, {useEffect, useState} from 'react';
import Input from "@/app/InputComponnet";
import Button from "@/app/ButtonComponnent";
import {createClient} from "./services/ClientService";

const CreateClient = ({isModalOpen}) => {

    const [name, setName] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [dni, setDni] = useState(null)
    const [birthdate, setBirthdate] = useState(null)
    const [cellPhone, setCellPhone] = useState(null)
    const [nationality, setNationality] = useState(null)
    const [email, setEmail] = useState(null)


    const styles = {
        container: {
            fontSize:15,
            height: '100%',
            width: '90%',
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
        await createClient({
            name: name,
            lastname: lastname,
            dni: dni,
            birthday: birthdate,
            nationality: nationality,
            cellPhone: cellPhone,
            email: email,

        })
        isModalOpen(false)
    }
    const handleClose = () => {
        isModalOpen(false)
    }


    return (
        <div style={styles.container}>
            <div style={{display: "flex", flexDirection: 'column', width:'100%', height:'100%', alignItems:'flex-start', margin:30}}>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Nombre :</div>
                    <Input input={setName}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Apellido :</div>
                    <Input input={setLastname}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>DNI :</div>
                    <Input input={setDni}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Fecha de Nacimiento :</div>
                    <Input input={setBirthdate}/>
                </div>

                <div style={styles.containerInput}>
                    <div style={styles.text}>Nacionalidad :</div>
                    <Input input={setNationality}/>
                </div>

                <div style={styles.containerInput}>
                    <div style={styles.text}>Telefono :</div>
                    <Input input={setCellPhone}/>
                </div>

                <div style={styles.containerInput}>
                    <div style={styles.text}>Email :</div>
                    <Input input={setEmail}/>
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Button text={'Crear'} clickAction={() => handleClick()}></Button>
                    <Button text={'Cerrar'} color={'#B32100'} clickAction={() => handleClose()}></Button>
                </div>
            </div>
        </div>
    );
};

export default CreateClient;