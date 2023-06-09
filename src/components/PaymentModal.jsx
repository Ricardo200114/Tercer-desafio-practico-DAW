import { Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

function PaymentModal({ mostrar, handleClose }) {
  return (
    <Modal show={mostrar} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Procesando pago</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-wrap justify-content-center m-4">
        <h4>Pago realizado con éxito</h4>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentModal;
