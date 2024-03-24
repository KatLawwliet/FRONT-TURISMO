import React, {useEffect, useState} from 'react';
import Input from "@/app/dashboard/InputComponnet";
import Button from "@/app/dashboard/ButtonComponnent";
import {createClient, updateClient} from "../services/ClientService";

const CreateClient = ({isModalOpen, selectedClient = null}) => {

    const [id, setId] = useState(null)
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

    useEffect(() => {
        if(selectedClient) {
            console.log("uqddsdffgfagag: " + selectedClient.nombre_completo)
            setName(selectedClient.nombre_completo)
            setDni(selectedClient.dni)
            setBirthdate(selectedClient.cumpleaños)
            setCellPhone(selectedClient.telefono)
            setNationality(selectedClient.nacionalidad)
            setEmail(selectedClient.email)
            setId(selectedClient.id)
        }
    }, [isModalOpen])

    const handleClick = async () => {
        if(selectedClient){
            await updateClient({
                name: name,
                lastname: lastname,
                dni: dni,
                birthday: birthdate,
                nationality: nationality,
                cellPhone: cellPhone,
                email: email,
    
            }, id)
        }else {
            await createClient({
                name: name,
                lastname: lastname,
                dni: dni,
                birthday: birthdate,
                nationality: nationality,
                cellPhone: cellPhone,
                email: email,
    
            })
        }
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
                    <Input input={setName}  defaultText={name}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Apellido :</div>
                    <Input input={setLastname}  defaultText={lastname}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>DNI :</div>
                    <Input input={setDni}  defaultText={dni}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Fecha de Nacimiento :</div>
                    <Input input={setBirthdate} defaultText={birthdate}/>
                </div>

                <div style={styles.containerInput}>
                    <div style={styles.text}>Nacionalidad :</div>
                    <Input input={setNationality} defaultText={nationality}/>
                </div>

                <div style={styles.containerInput}>
                    <div style={styles.text}>Telefono :</div>
                    <Input input={setCellPhone} defaultText={cellPhone}/>
                </div>

                <div style={styles.containerInput}>
                    <div style={styles.text}>Email :</div>
                    <Input input={setEmail} defaultText={email}/>
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