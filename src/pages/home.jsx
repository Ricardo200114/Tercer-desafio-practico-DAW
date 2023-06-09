import {
  Navbar,
  Container,
  Carousel,
  Card,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";

// Modales
import ProductModal from "../components/ProductModal";
import CartModal from "../components/CartModal";
import PaymentModal from "../components/PaymentModal";

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [nameSearch, setNameSearch] = useState("");

  const [productData, setProductData] = useState({});
  const [cart, setCart] = useState({
    total: (0 / 100).toFixed(2),
    items: [],
  });

  // Estados para los modales
  const [mostrar, setMostrar] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleClose = () => setMostrar(false);

  const handleCloseCartModal = () => setShowCart(false);

  const handleClosePaymentModal = () => {
    setCart({
      total: (0 / 100).toFixed(2),
      items: [],
    });
    setShowPaymentModal(false);
  };

  const handleShow = (data) => {
    setProductData(data);
    setMostrar(true);
  };

  const handleShowCartModal = () => setShowCart(true);
  const handleShowPaymentModal = () => setShowPaymentModal(true);

  const handleAddToCart = (data) => {
    setCart({
      total: (parseFloat(cart.total) + parseFloat(data.price)).toFixed(2),
      items: [...cart.items, data],
    });
    handleShowCartModal();
  };

  const fetchBooks = async () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setBooks(data);
      });
  };

  const getCategories = () => {
    const categories = [];
    books.forEach((book) => {
      if (!categories.includes(book.category)) {
        categories.push(book.category);
      }
    });
    return categories;
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    setCategories(getCategories());
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    const allCategories = selectedCategory === "all";

    const filteredBooks = books.filter((book) => {
      return (
        (allCategories ? true : book.category === selectedCategory) &&
        book.title.toLowerCase().includes(nameSearch.toLowerCase())
      );
    });

    setFilteredBooks(filteredBooks);
  }, [selectedCategory, nameSearch]);

  return (
    <>
      {/* Display de navbar */}
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand>Bookilandia</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text
              onClick={handleShowCartModal}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                className="material-symbols-outlined"
                style={{ marginRight: "0.25em" }}
              >
                shopping_cart
              </span>
              Total ${cart.total}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Display de categorias */}
      <Container fluid style={{ height: "500px", overflow: "hidden" }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={"/img/img1.jpg"}
              alt="Imagen 1"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={"/img/img2.jpg"}
              alt="Imagen 2"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={"/img/img3.jpg"}
              alt="Imagen 3"
            />
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Display de filtros */}
      <Navbar bg="light" variant="light">
        <Container style={{ display: "flex", marginTop: 25, width: "100%" }}>
          <Row style={{ width: "100%", justifyContent: "space-around" }}>
            <Col xs={12} md={6}>
              <h4>Productos de la categoría: {selectedCategory} </h4>
            </Col>
            <Col xs={12} md={3}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <span className="material-symbols-outlined">search</span>
                </InputGroup.Text>
                <Form.Control
                  style={{ width: "60%" }}
                  placeholder="Filtrar por nombre"
                  aria-label="Filtrar por nombre"
                  aria-describedby="basic-addon1"
                  onChange={(event) => setNameSearch(event.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={12} md={3}>
              <Form.Select
                style={{ width: "100%" }}
                aria-label="categoria"
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                <option value={"all"}>Todos</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </Navbar>

      {/* Display de items */}
      <Container>
        <div className="d-flex flex-wrap justify-content-between">
          {filteredBooks.map((book) => (
            <Card key={book.id} style={{ width: "22rem", margin: "1vh 0" }}>
              <Card.Img
                variant="top"
                src={book.image}
                style={{
                  maxWidth: "100%",
                  aspectRatio: "1 / 1",
                  margin: "auto",
                  objectFit: "contain",
                }}
              />
              <Card.Body>
                <div
                  style={{
                    display: "flex",
                    marginTop: 25,
                    justifyContent: "space-between",
                  }}
                >
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.5em",
                        marginLeft: "1vw",
                      }}
                    >
                      ${book.price.toFixed(2)}
                    </span>
                  </Card.Text>
                </div>
                <Card.Text>{book.description}</Card.Text>
              </Card.Body>
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() => {
                  handleShow(book);
                }}
              >
                Detalles
              </button>
            </Card>
          ))}
        </div>
      </Container>

      <ProductModal
        mostrar={mostrar}
        handleClose={() => handleClose()}
        productData={productData}
        handleAddToCart={() => handleAddToCart(productData)}
      />

      <CartModal
        mostrar={showCart}
        handleClose={() => handleCloseCartModal()}
        cartData={cart}
        handlePayment={handleShowPaymentModal}
      />

      <PaymentModal
        mostrar={showPaymentModal}
        handleClose={() => handleClosePaymentModal()}
      />
    </>
  );
}

export default Home;
