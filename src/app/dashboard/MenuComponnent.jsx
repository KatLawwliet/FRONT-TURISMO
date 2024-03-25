import React, { useEffect, useState } from "react";
import Select from "./SellectMenuComponnent";
import Modal from "./Modal";
import { logout } from "../services/AuthService";
import { redirect } from 'next/navigation'
import {getSelleByEmail} from '../services/SellersService'
import Button from "./ButtonComponnent";

const Menu = ({ setActiveView, activeView }) => {
    
    const [auth, setAuth] = useState("")
    const [auth2, setAuth2] = useState(null)
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
        },
        profileRow: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: 10
        },
        profileRowTitle: {
            fontSize: 20,
            color: "#028035"
        }
    }

    useEffect(() => {
        const authData = localStorage.getItem('auth');
        setAuth2(authData);
        const fetchData = async () => {
            try {
                const user = localStorage.getItem('userLogin');
                const loadedSeller = await getSelleByEmail(user, auth2)
                setSeller(loadedSeller)
            }catch (error){
                console.error('Error al cargar datos:', error);
            }
        }

        setAuth(localStorage.getItem('authorities'))

        fetchData()
    },[isModalOpen, auth2])

    

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

            <Modal 
            isOpen={isModalOpen} 
            onClose={closeModal}
            width={'30%'}
            height={'60%'}
            >
                <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center', flexDirection: 'column'}}>
                    <h1>Perfil</h1>
                        <div style={{width: '90%'}}>
                            <div style={style.profileRow}>
                                <div style={style.profileRowTitle}>Nombre: </div>
                                <div>{seller.name}</div>
                            </div>
                            <div style={style.profileRow}>
                                <div style={style.profileRowTitle}>Apellido:</div>
                                <div>{seller.lastname}</div>
                            </div>
                            <div style={style.profileRow}>
                                <div style={style.profileRowTitle}>DNI:</div>
                                <div>{seller.dni}</div>
                            </div>
                            <div style={style.profileRow}>
                                <div style={style.profileRowTitle}>Fecha de nacimiento:</div>
                                <div>{seller.birthday}</div>
                            </div>
                            <div style={style.profileRow}>
                                <div style={style.profileRowTitle}>Email: </div>
                                <div>{seller.email}</div>
                            </div>
                            <div style={style.profileRow}>
                                <div style={style.profileRowTitle}>Celular: </div>
                                <div>{seller.cellPhone}</div>
                            </div>
                            <div style={style.profileRow}>
                                <div style={style.profileRowTitle}>Cargo: </div>
                                <div>{seller.charge}</div>
                            </div>
                            <div style={style.profileRow}>
                                <div style={style.profileRowTitle}>Nacionalidad: </div>
                                <div>{seller.nationality}</div>
                            </div>
                            <div style={style.profileRow}>
                                <div style={style.profileRowTitle}>Salario:</div>
                                <div>{seller.salary}</div>
                            </div>
                            
                        </div>
                    <Button clickAction={closeModal} text={"Cerrar"}/>
                </div>
            </Modal>
        </div>
    )
}

export default Menu;







