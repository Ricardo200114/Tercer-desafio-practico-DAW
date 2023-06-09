import { Modal, Button, Table } from "react-bootstrap";

function ProductModal({ mostrar, handleClose, cartData, handlePayment }) {
  const handleCancelarClick = () => {
    handleClose();
  };
  const handlePagarClick = () => {
    handlePayment();
    handleClose();
  };

  const groupedItems = cartData.items.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].count++;
      acc[item.id].subtotal += item.price;
    } else {
      acc[item.id] = {
        ...item,
        count: 1,
        subtotal: item.price,
      };
    }
    return acc;
  }, {});

  return (
    <Modal show={mostrar} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Carrito de Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedItems).map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.count}</td>
                <td>${item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total</td>
              <td>${cartData.total}</td>
            </tr>
          </tfoot>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelarClick}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handlePagarClick}
          style={{ display: "flex", alignItems: "center" }}
        >
          <span class="material-symbols-outlined" style={{marginRight: "0.25em"}}>credit_card</span> Pagar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
