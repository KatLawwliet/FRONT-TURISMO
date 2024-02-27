import React, {useState} from "react";


const Select = ({text, clickAction, logo}) => {

    const [buttonColor, setButtonColor] = useState('#e1e7f0')

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
            color: '#475569',
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
            {logo}
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