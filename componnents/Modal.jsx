import React from 'react';
import Button from "./ButtonComponnent";

const Modal = ({ isOpen, onClose, children, width, height}) => {

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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: width,
            height: height
        },
        closeButton: {
            position: "absolute",
            top: "10px",
            right: "10px"
        }

    }

    if (!isOpen) return null;
    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};



export default Modal;