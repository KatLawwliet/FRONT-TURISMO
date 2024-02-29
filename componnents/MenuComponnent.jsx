import React from "react";
import Button from "./ButtonComponnent";
import Select from "./SellectMenuComponnent";
import { GiOfficeChair } from "react-icons/gi";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { BsPersonVcard } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";

const Menu = ({setActiveView, navigation}) => {

    const handleClick = () => {
        navigation.navigate('Login');
    }

    return (
        <div style={style.container}>
            <div style={style.containerButtons}>

                <Select logo={<MdOutlineCreateNewFolder size={25} />} text='Paquetes' clickAction={() => setActiveView('Paquetes')} style={style.button}/>
                <Select logo={<GiOfficeChair size={25} />} text='Servicios' clickAction={() => setActiveView('Servicios')} style={style.button}/>
                <Select logo={<BsPersonVcard size={25} />} text='Crear Paquete' clickAction={() => setActiveView('Crear Paquete')} style={style.button}/>
                <Select logo={<TiHomeOutline size={25} />} text='Negocio' clickAction={() => setActiveView('Negocio')} style={style.button}/>
            </div>
            <div style={style.containerButtons}>
                <Select logo={<LuLogOut size={25}/>} text='Cerrar Session' clickAction={() => handleClick()} style={style.button}/>
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