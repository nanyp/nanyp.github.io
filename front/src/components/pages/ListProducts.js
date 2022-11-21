import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../actions/productActions";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import "../../App.css";

const ListProducts = () => {
  const { loading, products, error } = useSelector((state) => state.products);
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [alert, dispatch, error]);

  const [filtros, setFiltros] = useState({
    nombre: "",
    categoria: "",
    stock: "",
    precio: "",
  });

  let resultados = products;

  const filtrar = ({ currentTarget: e }) => {
    setFiltros({ ...filtros, [e.name]: e.value });
  };
  if (
    filtros.nombre !== "" ||
    filtros.categoria !== "" ||
    filtros.stock !== ""
  ) {
    resultados = resultados
      .filter((desc) =>
        desc.name.toLowerCase().includes(filtros.nombre.toLowerCase())
      )
      .filter((desc) =>
        desc.category.toLowerCase().includes(filtros.categoria.toLowerCase())
      )
      .filter((desc) =>
        filtros.stock !== ""
          ? desc.stock === parseInt(filtros.stock)
          : desc.stock >= 0
      );
  }

  const eliminarProducto = (id) => {
    
    dispatch(deleteProduct(id))
    window.location.reload()
  }

  return (
    <div>
      <Fragment>
        {loading ? (
          <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>
        ) : (
          <Fragment>
            <Fragment>
              <MetaData title="Productos"></MetaData>
              <h5 id="header_products" align="center">
                Vista Administrador - Lista Productos
              </h5>
              <div>                
                <Link to={`/productos`}> 
                  <button className="botonp">Lista Productos</button>
                </Link>
                <Link to={`/ventas`}>
                  <button className="botonp">Lista Ventas</button>
                </Link>
                <Link to={`/producto/new`}>
                  <button className="botonp">Nuevo Producto</button>
                </Link>
              </div>

              <section id="products" className="container mt-5">
                <table className="table table-striped table-hover mt-5 shadow-lg">
                  <thead>
                    <tr className="bg-curso text-black">
                      <th>CATEGORIA</th>
                      <th>NOMBRE</th>
                      <th>STOCK</th>
                      <th>PRECIO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          name="categoria"
                          value={filtros.categoria}
                          onChange={filtrar}
                          type="text"
                          placeholder="Filtrar Categoria..."
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          name="nombre"
                          value={filtros.nombre}
                          onChange={filtrar}
                          type="text"
                          placeholder="Filtrar Nombre..."
                          className="form-control"
                        />
                      </td>
                      <td>
                        {/* <label htmlFor="stock"></label>
                        <select
                          value={filtros.stock}
                          onChange={filtrar}
                          name="stock"
                          id="stock"
                        >
                          <option value="">Seleccione</option>
                          <option value="0">Stock 0</option>
                        </select> */}
                        <input name="stock" value={filtros.stock} onChange={filtrar} placeholder='Filtrar Stock...' className='form-control'/>
                      </td>
                      <td>
                        <input
                          name="precio"
                          value={filtros.precio}
                          onChange={filtrar}
                          type="number"
                          placeholder="Filtrar Precio..."
                          className="form-control"
                        />
                      </td>
                    </tr>
                    {resultados.map((products) => (
                      <tr key={products._id}>
                        <td>{products.category}</td>
                        <td>{products.name}</td>
                        <td>{products.stock}</td>
                        <td>
                          {new Intl.NumberFormat("de-DE").format(
                            `${products.price}`
                          )}
                        </td>
                        <td>
                          <button className="botonp">
                            <Link to={`/producto/${products._id}`}>
                              Modificar
                            </Link>
                          </button>
                          <button className="botonp" onClick={() => eliminarProducto(products._id)}>
                            <Link to={`/productos`}>Eliminar</Link></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </Fragment>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default ListProducts;
