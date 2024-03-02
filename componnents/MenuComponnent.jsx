import React, {useEffect, useState} from "react";
import Select from "./SellectMenuComponnent";

const Menu = ({setActiveView, activeView, navigation}) => {

    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);
    const style = {
        container: {
            display: 'flex',
            alignItems: isMobile? '': 'flex-end',
            flexDirection: 'column',
            justifyContent: isMobile? 'space-between':'space-around',
            backgroundColor: '#e1e7f0',
            width: isMobile ? 80 : 250,
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


    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const handleMediaChange = (e) => {
            setIsMobile(e.matches);
        };

        mediaQuery.addListener(handleMediaChange);

        return () => mediaQuery.removeListener(handleMediaChange);
    }, []);

    const menuItems = [
        { name: 'Paquetes'},
        { name: 'Servicios'},
        { name: 'Negocio'},
        { name: isMobile? 'Cerrar Session' : ""},
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
                        clickAction={() => item.name === "Cerrar Session"? handleClick(): setActiveView(item.name)}
                        isActive={activeView === item.name}
                        isMovile={isMobile}
                    />
                ))}
            </div>
            <div style={style.containerButtons}>
                {isMobile? "" : <Select text={'Cerrar Session'} clickAction={() => handleClick()}
                         style={style.button}/>}
            </div>
        </div>
    )
}

export default Menu