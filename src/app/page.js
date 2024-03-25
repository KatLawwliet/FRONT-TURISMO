"use client"
import React, {useState} from "react";
import Image from "next/image";
import Button from "./dashboard/ButtonComponnent"
import Input from './dashboard/InputComponnet'
import { useRouter } from 'next/navigation'
import {login} from './services/AuthService'
import useLocalStorage from './dashboard/UseLocalStorage'

const Page = () => {
    
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [passw, setPassw] = useState("")
    const [auth, setAuth] = useLocalStorage('auth','');
    const [authorities, setAuthorities] = useLocalStorage('authorities','');
    const [userLogin, setUserLogin] = useLocalStorage('userLogin','');

    const handleClick = async () => {
        const caca = await login(email, passw)
        setAuth(caca.auth)
        setAuthorities(caca.authorities)
        setUserLogin(caca.userLogin)
        if(caca){
            router.push('/dashboard')
        }
        
    }

    return (
        <main>
            <div style={styles.background}>
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
                            <div style={styles.text}>Usuario</div>
                            <Input input={setEmail} />
                        </div>
                        <div style={styles.containerInput}>
                            <div style={styles.text}>Contraseña</div>
                            <Input input={setPassw} isPassword={true} />
                        </div>
                        <Button
                            text='Iniciar Sesion'
                            clickAction={() => handleClick()}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
        </main>
    );
}

const styles = {
    background: {
        background: `url('https://snxhqkypetprgogliayo.supabase.co/storage/v1/object/public/turismo/uploads/cataratas_fondo.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        padding: 20,
        borderRadius: 10,
    },
    subcontainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
    },
    containerInput:{
        width: 350,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        color: '#475569'
    }
};


export default Page