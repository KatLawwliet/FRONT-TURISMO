import React, {useState} from 'react';




const Table = ({ data, showCheckboxes, selectedItem, onSelectItem }) => {
    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

    const getRowStyle = (index) => ({
        ...styles.tr,
        ...(hoveredRowIndex === index ? styles.hover : {}),
    });

    const handleCheckboxChange = (item) => () => {
        const isSelected = selectedItem && selectedItem.code === item.code;
        onSelectItem(item);
    };

    return (
        <div style={styles.container}>
            <table style={styles.table}>
                <thead style={styles.thead}>
                <tr>
                    {showCheckboxes && <th style={styles.th}>SELECCIONAR</th>}
                    {data && data.length > 0 && Object.keys(data[0]).map((key) => (
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
                        {showCheckboxes && (
                            <td style={styles.td}>
                                <input
                                    type="radio"
                                    name="selectedItem"
                                    checked={item.code}
                                    onChange={handleCheckboxChange(item)}
                                />
                            </td>
                        )}
                        {Object.values(item).map((val, i) => (
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
        fontFamily: 'Arial, Helvetica, sans-serif'
    },
    td: {
        padding: '10px 15px',
        borderBottom: '1px solid #ddd',
    },
    tr: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: "#475569"
    },
    hover: {
        backgroundColor: '#ccecd9',
    },
    container: {
        height: '100%',
        maxHeight: 500,
        width: '90%',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        margin: '20px',
        overflowX: 'auto',
        borderRadius: 10,
    },
};

export default Table