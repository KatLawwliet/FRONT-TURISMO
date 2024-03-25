import React, { useEffect, useState } from 'react';
import Input from "@/app/dashboard/InputComponnet";
import Button from "@/app/dashboard/ButtonComponnent";
import { createSeller, updateSeller } from "../services/SellersService";
import useLocalStorage from "./UseLocalStorage"

const CreateEmployee = ({ isModalOpen, selectedEmployee = null }) => {

    const [id, setId] = useState(null)
    const [name, setName] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [dni, setDni] = useState(null)
    const [birthdate, setBirthdate] = useState(null)
    const [cellPhone, setCellPhone] = useState(null)
    const [nationality, setNationality] = useState(null)
    const [email, setEmail] = useState(null)
    const [charge, setCharge] = useState(null)
    const [salary, setSalary] = useState(null)
    const [auth, setAuth] = useLocalStorage('auth', '');


    const styles = {
        container: {
            fontSize: 15,
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
    }

    const handleClick = async () => {
        if(selectedEmployee){
            await updateSeller({
                name: name,
                lastname: lastname,
                dni: dni,
                birthday: birthdate,
                nationality: nationality,
                cellPhone: cellPhone,
                email: email,
                charge: charge,
                salary: salary,
    
            },id, auth)
        }else {
            await createSeller({
                name: name,
                lastname: lastname,
                dni: dni,
                birthday: birthdate,
                nationality: nationality,
                cellPhone: cellPhone,
                email: email,
                charge: charge,
                salary: salary,
    
            }, auth)
        }
        isModalOpen(false)
    }
    const handleClose = () => {
        isModalOpen(false)
    }

    useEffect(() => {
        if (selectedEmployee) {
            setId(selectedEmployee.id)
            setName(selectedEmployee.nombre_completo)
            setDni(selectedEmployee.dni)
            setCellPhone(selectedEmployee.telefono)
            setNationality(selectedEmployee.nacionalidad)
            setEmail(selectedEmployee.email)
            setCharge(selectedEmployee.charge)
            setSalary(selectedEmployee.sueldo)
        }
    }, [charge, auth]);

    return (
        <div style={styles.container}>
            <div style={{ display: "flex", flexDirection: 'column', width: '100%', height: '100%', alignItems: 'flex-start', margin: 1 }}>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Nombre :</div>
                    <Input input={setName} defaultText={name}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>Apellido :</div>
                    <Input input={setLastname} defaultText={lastname}/>
                </div>
                <div style={styles.containerInput}>
                    <div style={styles.text}>DNI :</div>
                    <Input input={setDni} defaultText={dni}/>
                </div>
                {
                    selectedEmployee ? "" : (
                        <div style={styles.containerInput}>
                            <div style={styles.text}>Fecha de Nacimiento :</div>
                            <Input input={setBirthdate} />
                        </div>
                    )
                }

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

                <div style={styles.containerInput}>
                    <div style={styles.text}>Cargo :</div>
                    <Input input={setCharge} isSelect={true} list={[
                        { value: 'VENDEDOR', label: 'Vendedor' },
                        { value: 'GERENTE', label: 'Gerente' }
                    ]} defaultText={charge}/>
                </div>

                <div style={styles.containerInput}>
                    <div style={styles.text}>Salario :</div>
                    <Input input={setSalary} isNumeric={true} defaultText={salary}/>
                </div>


                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button text={'Crear'} clickAction={() => handleClick()}></Button>
                    <Button text={'Cerrar'} color={'#B32100'} clickAction={() => handleClose()}></Button>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;