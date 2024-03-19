import React, { useState } from 'react';

const Input = ({
                   input,
                   isNumeric = false,
                   isDatetime = false,
                   isSelect = false,
                   list = []
               }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isError, setIsError] = useState(false);

    const focusStyles = isFocused ? { boxShadow: '0 0 10px #03A143' } : {};
    const errorStyles = isError ? { borderColor: '#B32100', boxShadow: '0 0 5px rgb(179,33,0)' } : {};

    const handleInputChange = (event) => {
        let newValue = event.target.value;

        if (isNumeric && !isSelect) {
            const regex = /^[0-9]*\.?[0-9]*$/;
            if (!regex.test(newValue)) {
                setIsError(true);
                return;
            } else {
                setIsError(false);
            }
        }

        setInputValue(newValue);
        input(newValue);
    };

    const getInputType = () => {
        if (isDatetime) return "datetime-local";
        return "text";
    };

    return (
        <div style={{ position: 'relative', width: '50%' }}>
            {isSelect ? (
                <select
                    style={{ ...{
                            width: '110%',
                            borderRadius: 20,
                            color: '#475569',
                            borderWidth: 2,
                            borderColor: '#e1e7f0',
                            backgroundColor: 'white',
                            height: 40,
                            fontSize: 20,
                        }, ...focusStyles, ...errorStyles }}
                    value={inputValue}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={handleInputChange}
                >
                    {list.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={getInputType()}
                    style={{ ...styles.input, ...focusStyles, ...errorStyles }}
                    value={inputValue}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={handleInputChange}
                />
            )}
            {isError && !isSelect && (
                <div style={styles.tooltip}>
                    Debe ser numérico
                </div>
            )}
        </div>
    );
};
const styles = {
    input: {
        width: '100%',
        height: 20,
        borderRadius: 20,
        color: '#475569',
        borderWidth: 2,
        borderColor: '#e1e7f0',
        fontSize: 20,
        outline: 'none',
        padding: '5px 10px',
    },
    tooltip: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '5px',
        padding: '5px 10px',
        color: '#fff',
        backgroundColor: '#B32100',
        borderRadius: '5px',
        fontSize: '14px',
        whiteSpace: 'nowrap',
    }
}

export default Input;
