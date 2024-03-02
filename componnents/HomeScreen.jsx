import React from "react";
import Header from "./HeaderComponnent";
import MenuNavigate from "./MenuNavigateComponnent";

const Home = ({navigation}) => {
    return (
        <div style={style.container}>
            <Header/>
            <MenuNavigate navigation={navigation}></MenuNavigate>
        </div>
    )
}

const style = {
    container: {
        backgroundColor: '#e1e7f0',
        height:'100%',
        width: '100%',
    },
}

export default Home