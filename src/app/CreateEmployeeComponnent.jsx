import React, {useEffect, useState} from 'react';
import Input from "@/app/InputComponnet";
import Button from "@/app/ButtonComponnent";
import {createSeller} from "@/app/services/SellersService";

const CreateEmployee = ({isModalOpen}) => {

    const [name, setName] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [dni, setDni] = useState(null)
    const [birthdate, setBirthdate] = useState(null)
    const [cellPhone, setCellPhone] = useState(null)
    const [nationality, setNationality] = useState(null)
    const [email, setEmail] = useState(null)
    const [charge, setCharge] = useState(null)
    const [salary, setSalary] = useState(null)


    const styles = {
        container: {
            fontSize:20,
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
        await createSeller({
            name: name,
            lastname: lastname,
            dni: dni,
            nationality: nationality,
            cellPhone: cellPhone,
            email: email,
            charge: charge,
            salary: salary,

        })
        isModalOpen(false)
    }
    const handleClose = () => {
        isModalOpen(false)
    }

    useEffect(() => {

    }, [charge]);

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

                <div style={styles.containerInput}>
                    <div style={styles.text}>Cargo :</div>
                    <Input input={setCharge} isSelect={true} list={[
                        {value: 'VENDEDOR', label: 'Vendedor'},
                        {value: 'GERENTE', label: 'Gerente'}
                    ]}/>
                </div>

                <div style={styles.containerInput}>
                    <div style={styles.text}>Salario :</div>
                    <Input input={setSalary} isNumeric={true}/>
                </div>


                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Button text={'Crear'} clickAction={() => handleClick()}></Button>
                    <Button text={'Cerrar'} color={'#B32100'} clickAction={() => handleClose()}></Button>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;