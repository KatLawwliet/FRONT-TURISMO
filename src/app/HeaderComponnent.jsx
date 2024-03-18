import React from "react";
import Image from "next/image";

const Header = () => {
    return (
        <div style={style.header}>
            <h1 style={{margin:20, color:'white', fontSize:20}}>Agencia de Turismo</h1>
            <Image
                 width={170}
                 height={170}
                 style={{ marginTop: 10}}
                 src="https://kyrxwczgntdzbcamjivn.supabase.co/storage/v1/object/public/branded-storage/ims.png"
                 alt="Logo"/>
        </div>
    )
}

const style = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#028035',
        height: 60,
        width: '100%',
        marginTop: 30,
        marginBottom: 0,
        marginEnd: 10,
        borderRadius: 30,
        boxShadow: '2px -30px 3px -15px rgba(78, 189, 123)',
    }
}

export default Header