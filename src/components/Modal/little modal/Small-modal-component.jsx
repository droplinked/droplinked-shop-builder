import "./Small-modal-style.scss"
import { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function SmallModal({ show, hide, text, click, header , disable }) {

    return (
        <>
            <Modal
                size="sm"
                aria-labelledby="example-modal-sizes-title-sm"
                show={show}
                onHide={hide}
            >
                <Modal.Header closeButton
                    style={{ backgroundColor: "#222" }}
                >
                    <Modal.Title id="example-modal-sizes-title-sm"
                        style={{ color: "white" }}
                    >
                        {header}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#222", width: "100%", height: "100%", borderRadius: "0px" }} >
                    <div style={{ width: "100%", height: "50px", color: "white" }}>
                        {text}
                    </div>
                    <div className="mt-3 w-100 p-2 d-flex justify-content-between">
                        <Button variant="danger" disabled={disable} onClick={click}>Delete</Button>
                        <Button variant="light" disabled={disable} onClick={hide}>Cancel</Button>
                    </div>
                </Modal.Body>
            </Modal>

        </>


    )
}