import React, { useEffect, useState } from "react";
import Select from "./SellectMenuComponnent";
import Modal from "./Modal";
import { logout } from "../services/AuthService";
import { redirect } from 'next/navigation'
import {getSelleByEmail} from '../services/SellersService'

const Menu = ({ setActiveView, activeView }) => {
    
    const [auth, setAuth] = useState("")
    const [seller, setSeller] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);

    const style = {
        container: {
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
            backgroundColor: '#e1e7f0',
            width: 250,
            height: '100%',
        },
        containerButtonsTop: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            height: '50%',
            width: '100%',
            flexDirection: 'column',
        },
        containerButtonsBottom: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            height: '50%',
            width: '100%',
            flexDirection: 'column',
        },
        button: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            height: 50,
            margin: 20,
            backgroundColor: 'transparent',
            borderRadius: 10,
            padding: 20,
            borderWidth: 1,
            fontSize: 25
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = localStorage.getItem('userLogin');
                const loadedSeller = await getSelleByEmail(user)
                setSeller(loadedSeller)
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
        }

        setAuth(localStorage.getItem('authorities'))

        fetchData()
    },[isModalOpen])

    

    const openProfileModal = async () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const menuItemsTop = auth.includes("GERENTE") ?[
        { name: 'Paquetes' },
        { name: 'Servicios' },
        { name: 'Negocio' },
        { name: 'Altas' },
    ] : [
        { name: 'Paquetes' },
        { name: 'Servicios' },
        { name: 'Negocio' }
    ];

    const menuItemsBottom = [
        { name: 'Perfil' },
        { name: 'Salir' },
    ];
    
    const handleClick = () => {
        logout()
        redirect('/')
    }

    return (
        <div style={style.container}>
            <div style={style.containerButtonsTop}>
                {menuItemsTop.map(item => (
                    <Select
                        key={item.name}
                        text={item.name}
                        clickAction={() => setActiveView(item.name)}
                        isActive={activeView === item.name}
                    />
                ))}
            </div>

            <div style={style.containerButtonsBottom}>
                {menuItemsBottom.map(item => (
                    <Select
                        key={item.name}
                        text={item.name}
                        clickAction={item.name === "Perfil" ? openProfileModal : handleClick}
                        isActive={activeView === item.name}
                    />
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div style={{textAlign: 'center'}}>
                    <h1>Perfil</h1>
                        <div>
                            <p>Nombre: {seller.name}</p>
                            <p>Apellido: {seller.lastname}</p>
                            <p>DNI: {seller.dni}</p>
                            <p>Fecha de nacimiento: {seller.birthday}</p>
                            <p>Email: {seller.email}</p>
                            <p>Celular: {seller.cellPhone}</p>
                            <p>Cargo: {seller.charge}</p>
                            <p>Nacionalidad: {seller.nationality}</p>
                            <p>Salario: {seller.salary}</p>
                        </div>
                    <button onClick={closeModal}>Cerrar</button>
                </div>
            </Modal>
        </div>
    )
}

export default Menu;







