import React from "react";
import { Modal, Button } from 'react-bootstrap';
import "./styles.css";

export default function AddUserModal({showConfirmDriver, setShowConfirmDriver, dropDriver, confirmDriverText, handleShowConfirmDriver, confirmModalIndex}) {
    
    
    const handleCloseConfirmDriver = () => setShowConfirmDriver(false);
    
    function handleModalConfirm() {
        dropDriver(confirmModalIndex);
        handleCloseConfirmDriver();
    }

    return <>
        <Modal show={showConfirmDriver} onHide={handleCloseConfirmDriver} >
            <Modal.Header closeButton>
                <Modal.Title> Confirming Driver </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <strong>{confirmDriverText} </strong>says that they are not a driver. Are you sure you want to make them drive? 
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleShowConfirmDriver}>
                    Close
                </Button>
                <Button variant="success" onClick={handleModalConfirm}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}