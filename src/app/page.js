"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./dashboard/ButtonComponnent"
import { useRouter } from 'next/navigation'
import Input from "./dashboard/InputComponnet";
import {login} from './services/AuthService'



export default function Login() {

    const [email, setEmail] = useState("")
    const [passw, setPassw] = useState("")

    const router = useRouter()

    const handleClick = async () => {
        const caca = await login(email, passw)
        if(caca){
            router.push('/dashboard')
        }
        
    }

    return(
        <div style={styles.container}>
            <div style={styles.subcontainer}>
                <Image
                    width={200}
                    height={200}
                    src="https://kyrxwczgntdzbcamjivn.supabase.co/storage/v1/object/public/branded-storage/ims.png"
                    alt="Logo"
                />
                <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={styles.containerInput}>
                        <div style={styles.text}>Email :</div>
                        <Input input={setEmail} />
                    </div>
                    <div style={styles.containerInput}>
                        <div style={styles.text}>Contraseña :</div>
                        <Input input={setPassw} />
                    </div>
                </div>
                <Button
                    text='Iniciar Sesion'
                    clickAction={() => handleClick()}
                />
                
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        height: '100vh',
        backgroundColor: 'white'
    },
    subcontainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection:'column',
        margin:70,
        backgroundColor: '#ddf0de',
        height: '50%',
        width:'40%',
        borderRadius: 10
    },

    containerInput:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    text: {
        width: '50%',
        color: '#475569'
    }
}