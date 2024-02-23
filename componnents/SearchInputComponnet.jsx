import React, { useState } from 'react';
import Button from "./ButtonComponnent";
import { RxMagnifyingGlass } from "react-icons/rx";

const SearchInput = () => {
    const [isFocused, setIsFocused] = useState(false);

    const focusStyles = isFocused ? { boxShadow: '0 0 10px #03A143' } : {};

    return (
        <div style={styles.container}>
            <input
                style={{ ...styles.input, ...focusStyles }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <Button text={<RxMagnifyingGlass size={20} />} clickAction={() => alert("Presionaste Caca!")}/>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 30,
        width: 1000,
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
    },
    button: {
        width: '20%',
        height: '90%',
        outline: 'none',
        backgroundColor: '#03A143',
        margin: 20,
        borderWidth: 1,

        borderRadius: 10
    }
}

export default SearchInput;
