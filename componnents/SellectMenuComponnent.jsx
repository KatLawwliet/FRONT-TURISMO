import React, {useState} from "react";
import {MdOutlineCreateNewFolder} from "react-icons/md";
import {GiOfficeChair} from "react-icons/gi";
import {BsPersonVcard} from "react-icons/bs";
import {TiHomeOutline} from "react-icons/ti";
import {LuLogOut} from "react-icons/lu";


const Select = ({ text, clickAction, isActive }) => {

    const [buttonColor, setButtonColor] = useState('#e1e7f0')

    const coloricon = () => {
        if(isActive){
            return '#03A143'
        }
        return '#475569'
    }

    const logocase = () => {
        switch (text) {
            case "Paquetes":
                return <MdOutlineCreateNewFolder size={25} color={coloricon()}/>
            case "Servicios":
                return <GiOfficeChair size={25} color={coloricon()}/>
            case "Crear Paquete":
                return <BsPersonVcard size={25} color={coloricon()}/>
            case "Negocio":
                return <TiHomeOutline size={25} color={coloricon()}/>
            case "Cerrar Session":
                return <LuLogOut size={25} color={coloricon()}/>
        }
    }

    const styles = {
        container: {
            display: 'flex',
            backgroundColor: buttonColor,
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            borderRadius: 10,
            padding:3,
            transition: 'background-color 0.3s',
        },
        button: {
            display: 'flex',
            backgroundColor: '#e1e7f0',
            width: '100%',
            margin: 10,
            fontSize: 16,
            border: 'none',
            cursor: 'pointer',
            color: coloricon(),
            transition: 'background-color 0.3s',
        }
    }

    const handleMouseOver = (e) => {
        e.target.style.backgroundColor = '#b8bcc4';
        setButtonColor('#b8bcc4')
    };

    const handleMouseOut = (e) => {
        e.target.style.backgroundColor = '#e1e7f0';
        setButtonColor('#e1e7f0')
    };

    return (
        <div style={styles.container}>
            {logocase()}
            <button
                onClick={clickAction}
                style={styles.button}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                {text}
            </button>
        </div>

    )
}



export default Select