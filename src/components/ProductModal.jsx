import { Modal, Button } from "react-bootstrap";

function ProductModal({ mostrar, handleClose, productData, handleAddToCart }) {
  const handleCancelarClick = () => {
    handleClose();
  };

  const handleAgregarClick = () => {
    handleAddToCart(productData);
    handleClose();
  };

  return (
    <Modal show={mostrar} onHide={handleClose}>
      <img
        src={productData.image}
        alt=""
        style={{
          maxWidth: "100%",
          aspectRatio: "1 / 1",
          margin: "auto",
          objectFit: "contain",
        }}
      />
      <Modal.Header closeButton>
        <Modal.Title>
          {productData.title}
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1em",
              marginLeft: "1vw",
            }}
          >
            ${productData.price ? productData.price.toFixed(2) : 0}
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{productData.description}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelarClick}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAgregarClick}>
          Agregar al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
