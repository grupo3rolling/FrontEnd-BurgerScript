import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CrearProductos = () => {
  const API = import.meta.env.VITE_API;
  const navigate = useNavigate();

  const ProductSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, "Mínimo 4 caracteres")
      .max(20, "Máximo 20 caracteres")
      .required("El título es requerido"),
    description: Yup.string()
      .min(4, "Mínimo 4 caracteres")
      .max(400, "Máximo 200 caracteres")
      .required("La descripción es requerida"),
    image: Yup.string()
      .required("La URL de la imagen es requerida")
      .matches(
        /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
        "Ingrese una URL valida"
      ),
    price: Yup.number()
      .required("El precio es requerido")
      .positive("El precio debe ser mayor a cero").min(3000, "El precio no puede ser menor a 3000"),

    category: Yup.string().required("La categoría es requerida"),
    stock: Yup.number()
      .required("El stock es requerido")
      .min(0, "El stock no puede ser menor a cero"),
      distinguish: Yup.string().required("Este campo es obligatorio"),
  });

  const initialValues = {
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    stock: "",
    distinguish: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ProductSchema,
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: (values) => {
      Swal.fire({
        title: "¿Estás seguro que quieres crear el producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Crear",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Creando producto...",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
          });
          try {
            const validateRepeat = await axios.get(
              `${API}/products/get-products`
            );
            const existeTitle = validateRepeat.data.some(
              (producto) => producto.title === values.title
            );

            if (existeTitle) {
              Swal.fire({
                title: "Error",
                text: "El título ingresado ya está en uso",
                icon: "error",
              });
              return;
            }

            const response = await axios.post(
              `${API}/products/new-product`,
              values
            );
            if (response.status === 201) {
              formik.resetForm();
              Swal.fire({
                title: "¡Éxito!",
                text: "Se creó el producto",
                icon: "success",
              });
              navigate("/administracion");
            }
          } catch (error) {
            console.log("ERROR => ", error);
          }
        }
      });
    },
  });

  return (
    <>
      <Container fluid className="admin_bg py-4">
        <div className="container my-3 py-3 ">
          <div className="text-center">
            <h1 className="admin_title">Crear Productos</h1>
          </div>
          <div>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="admin_label fs-5">Título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el título"
                  minLength={4}
                  maxLength={50}
                  required
                  name="title"
                  {...formik.getFieldProps("title")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid": formik.touched.title && formik.errors.title,
                    },
                    {
                      "is-valid": formik.touched.title && !formik.errors.title,
                    }
                  )}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="mt-2 text-danger">
                    <span role="alert">{formik.errors.title}</span>
                  </div>
                )}
              </Form.Group>
              <Form.Label className="admin_label fs-5">Categoría</Form.Label>
              <Form.Select
                aria-label="category"
                required
                name="category"
                {...formik.getFieldProps("category")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.category && formik.errors.category,
                  },
                  {
                    "is-valid":
                      formik.touched.category && !formik.errors.category,
                  }
                )}
              >
                <option value="">Seleccione una categoría</option>
                <option value="Carne">Carne</option>
                <option value="Pollo">Pollo</option>
                <option value="Vegetarianas">Vegetariana</option>
              </Form.Select>
              {formik.touched.category && formik.errors.category && (
                <div className="mt-2 text-danger">
                  <span role="alert">{formik.errors.category}</span>
                </div>
              )}
              <Form.Group className="mb-3" controlId="description">
                <Form.Label className="admin_label fs-5 mt-2">
                  Descripción
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  minLength={4}
                  maxLength={400}
                  placeholder="Ingrese una descripción"
                  required
                  name="description"
                  {...formik.getFieldProps("description")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.description && formik.errors.description,
                    },
                    {
                      "is-valid":
                        formik.touched.description &&
                        !formik.errors.description,
                    }
                  )}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="mt-2 text-danger">
                    <span role="alert">{formik.errors.description}</span>
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="stock">
                <Form.Label className="admin_label fs-5">Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el stock"
                  required
                  minLength={1}
                  maxLength={6}
                  name="stock"
                  {...formik.getFieldProps("stock")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid": formik.touched.stock && formik.errors.stock,
                    },
                    {
                      "is-valid": formik.touched.stock && !formik.errors.stock,
                    }
                  )}
                />
                {formik.touched.stock && formik.errors.stock && (
                  <div className="mt-2 text-danger">
                    <span role="alert">{formik.errors.stock}</span>
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label className="admin_label fs-5">URL imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la URL de la imagen"
                  required
                  minLength={10}
                  maxLength={400}
                  name="image"
                  {...formik.getFieldProps("image")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid": formik.touched.image && formik.errors.image,
                    },
                    {
                      "is-valid": formik.touched.image && !formik.errors.image,
                    }
                  )}
                />
                {formik.touched.image && formik.errors.image && (
                  <div className="mt-2 text-danger">
                    <span role="alert">{formik.errors.image}</span>
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label className="admin_label fs-5">Precio</Form.Label>
                <Form.Control
                  type="number"
                  min="3000"
                  placeholder="Ingrese el precio del producto"
                  required
                  minLength={4}
                  maxLength={11}
                  name="price"
                  {...formik.getFieldProps("price")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid": formik.touched.price && formik.errors.price,
                    },
                    {
                      "is-valid": formik.touched.price && !formik.errors.price,
                    }
                  )}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="mt-2 text-danger">
                    <span role="alert">{formik.errors.price}</span>
                  </div>
                )}
              </Form.Group>

              <Form.Label className="admin_label fs-5 mb-3">¿Destacar producto?</Form.Label>
              <Form.Select
                aria-label="distinguish"
                required
                name="distinguish"
                {...formik.getFieldProps("distinguish")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.distinguish && formik.errors.distinguish,
                  },
                  {
                    "is-valid":
                      formik.touched.distinguish && !formik.errors.distinguish,
                  }
                )}
              >
                <option value="">Seleccione</option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </Form.Select>
              {formik.touched.distinguish && formik.errors.distinguish && (
                <div className="mt-2 text-danger">
                  <span role="alert">{formik.errors.distinguish}</span>
                </div>
              )}

              <Button type="submit" variant="primary" className="admin_btn mt-3">
                Crear
              </Button>
              <Button
                className="mx-3 mt-3"
                variant="secondary"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Volver
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CrearProductos;
