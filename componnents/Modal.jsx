import React from 'react';
import Button from "./ButtonComponnent";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div style={{display: "flex", }}>
                    <Button color={"#cc0000"} text={"X"} clickAction={onClose}/>
                    <Button text={"X"} clickAction={onClose}/>
                </div>
                {children}
            </div>
        </div>
    );
};

const styles = {
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#e1e7f0",
        padding: "20px",
        borderRadius: "15px",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column-reverse"
    },
    closeButton: {
        position: "absolute",
        top: "10px",
        right: "10px"
    }

}

export default Modal;