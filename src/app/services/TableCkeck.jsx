import React from 'react';

const TableCheck = ({ data, onCheckboxChange }) => {
    const [hoveredRowIndex, setHoveredRowIndex] = React.useState(null);

    const getRowStyle = (index) => ({
        ...styles.tr,
        ...(hoveredRowIndex === index ? styles.hover : {}),
    });

    return (
        <div style={styles.container}>
            <table style={styles.table}>
                <thead style={styles.thead}>
                <tr>
                    <th style={styles.th}>{'>'}</th> {/* Header para el checkbox */}
                    {data && data.length > 0 && Object.keys(data[0]).filter(key => key !== 'isChecked').map((key) => (
                        <th key={key} style={styles.th}>{key.replace(/_/g, " ").toUpperCase()}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr
                        key={index}
                        style={getRowStyle(index)}
                        onMouseEnter={() => setHoveredRowIndex(index)}
                        onMouseLeave={() => setHoveredRowIndex(null)}
                    >
                        <td style={styles.td}>
                            <input
                                type="checkbox"
                                checked={item.isChecked}
                                onChange={() => onCheckboxChange(item.codigo)} // Llamar a la función pasada por props para manejar el cambio
                            />
                        </td>
                        {Object.entries(item).filter(([key, _]) => key !== 'isChecked').map(([key, val], i) => (
                            <td key={i} style={styles.td}>{val}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    thead: {
        backgroundColor: '#028035',
    },
    th: {
        fontWeight: 'normal',
        padding: '10px 15px',
        color: 'white',
        textAlign: 'left',
    },
    td: {
        padding: '10px 15px',
        borderBottom: '1px solid #ddd',
    },
    tr: {
        color: "#475569"
    },
    hover: {
        backgroundColor: '#ccecd9',
    },
    container: {
        height: '100%',
        maxHeight: 400,
        width: '90%',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        margin: '20px',
        overflowX: 'auto',
        borderRadius: 10,
    },
};

export default TableCheck;