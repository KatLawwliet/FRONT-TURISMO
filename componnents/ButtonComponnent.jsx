import React from "react";

const Button = ({text, clickAction, color}) => {

    const styles = {
        button: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: ' center',
            height: 40,
            width: 150,
            backgroundColor: color ? color : '#028035',
            borderRadius: 20,
            margin: 20,
            fontSize: 15,
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            transition: 'background-color 0.3s',
        }
    }

    const handleMouseOver = (e) => {
        e.target.style.backgroundColor = color? '#7a0000' :'#03A143';
    };

    const handleMouseOut = (e) => {
        e.target.style.backgroundColor = color? color :'#028035';
    };

    return (
        <button
            onClick={clickAction}
            style={styles.button}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {text}
        </button>
    )
}



export default Button