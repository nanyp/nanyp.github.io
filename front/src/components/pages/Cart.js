import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProducts,
  putProductDetails,
} from "../../actions/productActions";
import {
  getProductsCart,
  editItemToCart,
  postVentas,
  delProductsCart,
} from "../../actions/ventasActions";
import MetaData from "../layout/MetaData";

const Cart = () => {
  const { loading, productsCart, error } = useSelector(
    (state) => state.productsCart
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsCart());
  }, [alert, dispatch, error]);

  const resultados = productsCart;

  let datosValor = [];
  resultados.forEach((dato) => {
    datosValor.push(dato.price);
  });
  let totalValor = datosValor.reduce(function(previous, current) {
    return previous + current;
  }, 0);

  let datosCantidad = [];
  resultados.forEach((dato) => {
    datosCantidad.push(dato.amount);
  });
  let totalCantidad = datosCantidad.reduce(function(previous, current) {
    return previous + current;
  }, 0);

  const { products } = useSelector((state) => state.products);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);

  const increaseQty = async (id, nombre, cantidad) => {
    const dato = products.filter((desc) => desc.name === nombre);

    if (cantidad > dato[0].stock) return;

    await dispatch(editItemToCart(id, "add", cantidad));
    dispatch(getProductsCart());
  };

  const decreaseQty = async (id, nombre, cantidad) => {
    const dato = products.filter((desc) => desc.name === nombre);

    if (cantidad < 0) return;

    await dispatch(editItemToCart(id, "del", cantidad));
    dispatch(getProductsCart());
  };

  const actualizarStock = (lista) => {
    lista.map((item) => {
      let stock = products.filter((desc) => desc._id === item._idproducto);
      stock[0].stock -= item.cantidad;

      dispatch(putProductDetails(stock[0]._id, stock[0]));
    });
  };

  const guardarVenta = async (resultados) => {
    const fecha = new Date().toJSON();
    const lista = resultados.map((item) => {
      const dato = products.filter((desc) => desc.name === item.name);
      const { category, _id } = dato[0];
      const objeto = {
        fecha: fecha,
        categoria: category,
        _idproducto: _id,
        cantidad: item.amount,
        precio: item.price,
      };

      return objeto;
    });

    dispatch(postVentas(lista));
    await actualizarStock(lista);
    await limpiarCart();
  };

  const limpiarCart = async () => {
    dispatch(delProductsCart())
    dispatch(getProductsCart())
  }

  return (
    <div>
      <Fragment>
        {loading ? (
          <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>
        ) : (
          <Fragment>
            <Fragment>
              <MetaData title="Carrito"></MetaData>

              <h5 id="header_products" align="center">
                Carrito
              </h5>

              <section id="ventas" className="container">
                <table className="table table-striped table-hover mt-3 shadow-lg">
                  <thead>
                    <tr className="bg-curso text-black">
                      <th>IMAGEN</th>
                      <th>NOMBRE</th>
                      <th>CANTIDAD</th>
                      <th>PRECIO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultados.map((cartItems) => (
                      <tr key={cartItems._id}>
                        <td>
                          <img
                            src={cartItems.img}
                            className="rounded mx-auto d-block"
                            height="50px"
                            alt={cartItems.name}
                          ></img>
                        </td>
                        <td>{cartItems.name}</td>
                        <td>
                          <div className="stockCounter d-inline">
                            <span
                              className="btn btn-danger minus"
                              onClick={() =>
                                decreaseQty(
                                  cartItems._id,
                                  cartItems.name,
                                  cartItems.amount
                                )
                              }
                            >
                              -
                            </span>
                            <input
                              type="number"
                              className="form-control count d-inline"
                              value={cartItems.amount}
                              readOnly
                            />
                            <span
                              className="btn btn-primary plus"
                              onClick={() =>
                                increaseQty(
                                  cartItems._id,
                                  cartItems.name,
                                  cartItems.amount
                                )
                              }
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          {new Intl.NumberFormat("de-DE").format(
                            `${cartItems.price}`
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={2} text-align="center">
                        TOTALES
                      </th>
                      <th>
                        {new Intl.NumberFormat("de-DE").format(
                          `${totalCantidad}`
                        )}
                      </th>
                      <th>
                        {new Intl.NumberFormat("de-DE").format(`${totalValor}`)}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </section>
              <button onClick={() => guardarVenta(resultados)}>Comprar</button>
            </Fragment>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default Cart;
