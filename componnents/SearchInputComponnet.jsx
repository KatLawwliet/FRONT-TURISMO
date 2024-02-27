import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
const SearchInput = ({seachInput}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(""); // Estado para almacenar el valor del input

    const focusStyles = isFocused ? { boxShadow: '0 0 10px #03A143' } : {};

    const handleInputChange = (event) => {
        const newValue = event.target.value
        setInputValue(newValue);
        seachInput(newValue)
    }

    return (
        <div style={styles.container}>
            <input
                style={{ ...styles.input, ...focusStyles }}
                value={inputValue}
                onChange={handleInputChange} // Manejador de cambios para actualizar el valor del input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <BsSearch  style={styles.sarasa} size={27} color={isFocused ? '#03A143' : "#475569"}/>
        </div>
    );
};

const styles = {
    sarasa: {
        margin: 10,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 30,
        width: '70%',
        height: 50,
    },
    input: {
        width: '50%',
        height: '80%',
        borderRadius: 10,
        color: '#475569',
        borderWidth: 2,
        borderColor: '#e1e7f0',
        fontSize: 20,
        outline: 'none'
    }
}

export default SearchInput;
