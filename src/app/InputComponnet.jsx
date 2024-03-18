import React, {useState} from 'react';

const Input = ({input}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const focusStyles = isFocused ? { boxShadow: '0 0 10px #03A143' } : {};

    const handleInputChange = (event) => {
        const newValue = event.target.value
        setInputValue(newValue);
        input(newValue)
    }

    return (
        <input
            style={{ ...styles.input, ...focusStyles }}
            value={inputValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
        />
    );
};

const styles = {
    input: {
        width: '50%',
        height: 30,
        borderRadius: 20,
        color: '#475569',
        borderWidth: 2,
        borderColor: '#e1e7f0',
        fontSize: 20,
        outline: 'none'
    },
}
export default Input;