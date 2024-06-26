import React from "react";
import ListarProductos from "../Sections/ListarProductos";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListarUsuarios from "../Sections/ListarUsuarios";
import "./Administracion.css";

const Administracion = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Container fluid className="admin_bg py-4">
        <div className="container">
          <div className="text-center">
            <h1 className="admin_title">
              Administración de productos y usuarios
            </h1>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/crear-producto");
            }}
            className="admin_btn mt-3"
          >
            Crear Nuevo Producto
          </Button>
          <ListarProductos></ListarProductos>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/crear-usuarioadm");
              scrollToTop();
            }}
            className="admin_btn mt-3"
          >
            Crear Nuevo Admin
          </Button>
          <ListarUsuarios></ListarUsuarios>
        </div>
      </Container>
    </>
  );
};

export default Administracion;
