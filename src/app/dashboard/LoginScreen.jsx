import React from "react";
import Button from "./ButtonComponnent";
import Image from "next/image";
const Login = ({navigation}) => {

    const handleClick = () => {
        navigation.navigate('Home');
    }

    return(
        <div style={styles.container}>
            <div style={styles.subcontainer}>
                <Image
                    width={200}
                    height={200}
                     src="https://kyrxwczgntdzbcamjivn.supabase.co/storage/v1/object/public/branded-storage/ims.png"
                     alt="Logo"/>
                <input style={styles.input} placeholder="Email"/>
                <input style={styles.input} placeholder="Contraseña"/>
                <Button
                    text='Iniciar Sesion'
                    clickAction={handleClick}
                />
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: '100%',
        backgroundColor: 'white'
    },
    subcontainer: {
        display: "flex",
        justifyContent: "flex-start",
        paddingTop: 150,
        alignItems: "center",
        flexDirection:'column',
        margin:70,
        backgroundColor: '#ddf0de',
        height: '80%',
        width:'35%',
        borderRadius: 10
    },
    input: {
        height: 25,
        borderRadius: 10,
        backgroundColor: '#e8f0fe',
        width: '60%',
        padding: 10,
        margin: 15,
        borderWidth: 1,
        borderColor: '#bdc4cf',
        fontSize: 15
    }
}

export default Login