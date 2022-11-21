import React, { Fragment, useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

export const Home = () => {
  const { loading, products, error } = useSelector(state => state.products);
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
    // alert.success("OK");
  }, [alert, dispatch, error]);
  return (
    <Fragment>
      {loading ? (
        <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>
      ) : (
        <Fragment>
          <Fragment>
            <MetaData title="Home"></MetaData>
            <h5 id="header_products">Latest products</h5>
            
            <section id="products" className="container mt-5">
              <div className="row">
                {products &&
                  products.map((products) => (
                    <div
                      key={products._id}
                      className="col-sm-12 col-md-6 col-lg-3 my-3"
                    >
                      <div className="card p-3 rounded">
                        <img
                          className="card-img-top mx-auto"
                          src={products.imagen[0].url}
                          alt={products.imagen[0].public_id}
                        ></img>
                        <div className="card-body d-flex flex-column text-center">
                          <h5 id="title_product">
                            <Link to={`/product/${products._id}`}>
                              {products.name}
                            </Link>
                          </h5>
                          <div className="rating mt-auto">
                            <div className="rating-outer">
                              <div
                                className="rating-inner"
                                style={{
                                  width: `${(products.rating / 5) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span id="comments">
                              {" "}
                              {products.scoreProduct} Reviews
                            </span>
                          </div>
                          <p className="card-text">${products.price}</p>
                          <Link
                            to={`/product/${products._id}`}
                            id="view_btn"
                            className="btn btn-block"
                          >
                            Ver detalle
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;