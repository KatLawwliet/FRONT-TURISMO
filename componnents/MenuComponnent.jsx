import React from "react";
import Select from "./SellectMenuComponnent";

const Menu = ({setActiveView, activeView, navigation}) => {

    const menuItems = [
        { name: 'Paquetes'},
        { name: 'Servicios'},
        { name: 'Crear Paquete'},
        { name: 'Negocio'},
    ];

    const handleClick = () => {
        navigation.navigate('Login');
    }

    return (
        <div style={style.container}>
            <div style={style.containerButtons}>
                {menuItems.map(item => (
                    <Select
                        key={item.name}
                        text={item.name}
                        clickAction={() => setActiveView(item.name)}
                        isActive={activeView === item.name}
                    />
                ))}
            </div>
            <div style={style.containerButtons}>
                <Select  text='Cerrar Session' clickAction={() => handleClick()}
                        style={style.button}/>
            </div>
        </div>
    )
}

const style = {
    container: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#e1e7f0',
        width: 250,
        height: '100%',
    },
    containerButtons: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        height: '100%',
        width: 210,
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

export default Menu