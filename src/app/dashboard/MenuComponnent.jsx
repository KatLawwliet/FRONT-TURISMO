import React, { useEffect, useState } from "react";
import Select from "./SellectMenuComponnent";
import Modal from "./Modal";

const Menu = ({ setActiveView, activeView, navigation }) => {
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openProfileModal = async () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const menuItemsTop = [
        { name: 'Paquetes' },
        { name: 'Servicios' },
        { name: 'Negocio' },
        { name: 'Altas' },
    ];

    const menuItemsBottom = [
        { name: 'Perfil' },
        { name: 'Salir' },
    ];

    const handleClick = () => {
        alert("?!Click?!");
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
                            <p>Nombre: </p>
                            <p>Apellido: </p>
                            <p>DNI: </p>
                            <p>Fecha de nacimiento: </p>
                            <p>Email: </p>
                            <p>Celular: </p>
                            <p>Cargo: </p>
                            <p>Nacionalidad: </p>
                            <p>Salario: </p>
                        </div>
                    <button onClick={closeModal}>Cerrar</button>
                </div>
            </Modal>
        </div>
    )
}

export default Menu;







