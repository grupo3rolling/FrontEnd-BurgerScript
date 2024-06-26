import {
  Navbar,
  Container,
  Image,
  Nav,
  Form,
  Offcanvas,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Facebook,
  Instagram,
  TwitterX,
  QuestionCircle,
  PersonCircle,
  BoxArrowDownRight,
  Cart,
} from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import "./navbar.css";
import Login from "./Sections/Login/Login";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import logo from "../assets/Logo/logoBurgerScript.png";

function App({ getProductos, producto, actualizarContador, contador }) {
  const { currentUser, setCurrentUser, RemoveAuth, SaveAuth } =
    useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const handleShow = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const Logout = () => {
    sessionStorage.removeItem("cart");
    RemoveAuth();
    setCurrentUser(undefined);
    window.location.reload();
    window.location.replace("/");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [expanded, setExpanded] = useState(false);
  const closeNavbar = () => setExpanded(false);

  useEffect(() => {
    getProductos(busqueda);
  }, [busqueda]);

  useEffect(() => {
    actualizarContador();
  }, []);

  return (
    <>
      <Login isOpen={isOpen} handleClose={handleClose} />
      <div className="w-100">
        <Row className="w-100 mx-0">
          {["lg"].map((expand) => (
            <Navbar
              key={expand}
              expand={expand}
              className="sticky py-0"
              data-bs-theme="dark"
              sticky="top"
              expanded={expanded}
            >
              <Container fluid className="header_bg">
                <Navbar.Brand className="ps-lg-4 ps-sm-2">
                  <NavLink to="/" onClick={scrollToTop}>
                    <Image
                      src={logo}
                      width="60"
                      height="60"
                      alt="Logo BurgerScript"
                      className="logo_nav"
                    />
                  </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                  onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header
                    closeButton
                    onClick={closeNavbar}
                    className="navbar_bg navbar_toggle"
                    data-bs-theme="dark"
                  >
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      <NavLink to="/" onClick={()=>{
                          scrollToTop();
                          closeNavbar()
                        }}>
                        <Image
                          src={logo}
                          width="60"
                          height="60"
                          alt="Logo BurgerScript"
                        />
                      </NavLink>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="navbar_bg navbar_toggle">
                    <Nav className="justify-content-end flex-grow-1 pe-4 nav_toggle">
                      <NavLink
                        to="/"
                        onClick={() => {
                          scrollToTop();
                          closeNavbar();
                        }}
                        activeclassname="active"
                        className="navbar_link pe-4 pt-1"
                      >
                        Inicio
                      </NavLink>
                      <Nav.Link
                        as={Link}
                        smooth="true"
                        to="/#destacados"
                        className="navbar_link pe-4 pb-1"
                        onClick={closeNavbar}
                      >
                        Destacados
                      </Nav.Link>
                      <NavLink
                        as={Link}
                        smooth="true"
                        to="/Burgers"
                        onClick={() => {
                          scrollToTop();
                          closeNavbar();
                        }}
                        className="navbar_link pe-4 pb-1"
                      >
                        Burgers
                      </NavLink>
                      <NavLink
                        to="/contacto"
                        onClick={() => {
                          scrollToTop();
                          closeNavbar();
                        }}
                        className="navbar_link pe-4 pb-1"
                      >
                        Contacto
                      </NavLink>
                      <NavLink
                        to="/nosotros"
                        onClick={() => {
                          scrollToTop();
                          closeNavbar();
                        }}
                        className="navbar_link pe-4 pb-1"
                      >
                        Nosotros
                      </NavLink>
                      {currentUser !== undefined &&
                        currentUser.role === "Admin" && (
                          <NavLink
                            to="/administracion"
                            onClick={() => {
                              scrollToTop();
                              closeNavbar();
                            }}
                            className="navbar_link pe-4 pb-1"
                          >
                            Administración
                          </NavLink>
                        )}
                      {currentUser === undefined && (
                        <Nav.Link
                            onClick={() => {
                              handleShow();
                              closeNavbar();
                        }}                          
                          className="pe-2 py-1 login_nav"
                        >
                          <PersonCircle className="icon_link fs-3" />
                        </Nav.Link>
                      )}
                      {currentUser !== undefined && (
                        <NavLink
                          className="pe-2 py-1 login_nav"
                          onClick={Logout}
                        >
                          <BoxArrowDownRight className="icon_link fs-3" />
                        </NavLink>
                      )}

                      {currentUser !== undefined && (
                        <NavLink
                          to="/carrito"
                          className="pe-3 py-1 login_nav text-decoration-none"
                          onClick={() => {
                            scrollToTop();
                            closeNavbar();
                          }}
                        >
                          <div className="cart-container">
                            <Cart className="icon_link fs-3" />
                            {contador > 0 && (
                              <span className="cart-item-count">
                                {contador}
                              </span>
                            )}
                          </div>
                        </NavLink>
                      )}
                    </Nav>
                    <Nav className="col justify-content-end">
                      <Form
                        data-bs-theme="dark"
                        className="d-flex  pe-3 search_pd"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <Form.Control
                          controlId="busqueda"
                          type="search"
                          placeholder="Buscar por nombre"
                          className="search_nav"
                          aria-label="Search"
                          maxLength={20}
                          onChange={(e) => {
                            setBusqueda(e.currentTarget.value);
                          }}
                        />
                      </Form>
                      <Nav.Link
                        href="https://www.facebook.com/"
                        target="_blank"
                        className="py-0 question_nav"
                      >
                        <Facebook className="text-white fs-4" />
                      </Nav.Link>
                      <Nav.Link
                        href="https://www.instagram.com/"
                        target="_blank"
                        className="py-0 question_nav"
                      >
                        <Instagram className="text-white fs-4" />
                      </Nav.Link>
                      <Nav.Link
                        href="https://twitter.com/"
                        target="_blank"
                        className="py-0 pe-4 question_nav"
                      >
                        <TwitterX className="text-white fs-4" />
                      </Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </Row>
        <Navbar expand="lg" className="nav_bg py-0">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavLink
                as={Link}
                to="/"
                onClick={scrollToTop}
                activeclassname="active"
                className="navbar_link pe-2 fs-5 pt-2"
              >
                Inicio
              </NavLink>
              <Nav.Link
                as={Link}
                smooth="true"
                to="/#destacados"
                className="navbar_link ps-4 fs-5"
              >
                Destacados
              </Nav.Link>
              <NavLink
                as={Link}
                smooth="true"
                to="/Burgers"
                onClick={scrollToTop}
                className="navbar_link ps-4 fs-5 pt-2 pe-1"
              >
                Burgers
              </NavLink>
              <NavLink
                to="/contacto"
                onClick={scrollToTop}
                className="navbar_link ps-4 fs-5 pt-2 pe-1"
              >
                Contacto
              </NavLink>
              {currentUser !== undefined && currentUser.role === "Admin" && (
                <NavLink
                  to="/administracion"
                  onClick={scrollToTop}
                  className="navbar_link ps-4 fs-5 pt-2"
                >
                  Administración
                </NavLink>
              )}
            </Nav>
            <Nav>
              {currentUser === undefined && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip">Iniciar Sesión</Tooltip>}
                >
                  <NavLink onClick={handleShow} className="pe-3 py-1 login_nav">
                    <PersonCircle className="icon_link fs-3" />
                  </NavLink>
                </OverlayTrigger>
              )}
              {currentUser !== undefined && (
                <span className="navbar_link fs-5 px-3 text-white">
                  {currentUser.username}
                </span>
              )}

              {currentUser !== undefined && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip">Cerrar Sesión</Tooltip>}
                >
                  <NavLink className="pe-3 py-1 login_nav" onClick={Logout}>
                    <BoxArrowDownRight className="icon_link fs-3" />
                  </NavLink>
                </OverlayTrigger>
              )}

              {currentUser !== undefined && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="tooltip">Carrito</Tooltip>}
                >
                  <NavLink
                    to="/carrito"
                    className="pe-3 py-1 login_nav text-decoration-none"
                    onClick={scrollToTop}
                  >
                    <Cart className="icon_link fs-3" />
                    {contador > 0 && (
                      <span className="cart-item-count">{contador}</span>
                    )}
                  </NavLink>
                </OverlayTrigger>
              )}

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip">Ayuda</Tooltip>}
              >
                <NavLink to="/error" className="me-5 py-1 question_nav">
                  <QuestionCircle className="icon_link fs-3" />
                </NavLink>
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default App;
