import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getVentas } from "../../actions/ventasActions";
import MetaData from "../layout/MetaData";
import "../../App.css";


const ListVentas = () => {

    const { loading, ventas, error } = useSelector(state => state.ventas);
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getVentas());
    }, [alert, dispatch, error]);

    const [busqueda, setBusqueda] = useState("")

    const filtroVentas = (e) => {
        setBusqueda(e.target.value)
      }

    const resultados = !busqueda ? ventas : ventas.filter((desc) =>
      desc.categoria.toLowerCase().includes(busqueda.toLocaleLowerCase())
    )

    let datosValor = []
    resultados.forEach((dato)=>{
      datosValor.push(dato.precio)
    })
    let totalValor = datosValor.reduce(function(previous, current){
      return previous + current
    }, 0)

    let datosCantidad = []
    resultados.forEach((dato)=>{
      datosCantidad.push(dato.cantidad)
    })
    let totalCantidad = datosCantidad.reduce(function(previous, current){
      return previous + current
    }, 0)

  return (
    <div>
        <Fragment>
        {loading ? (
            <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i>
        ) : (
            <Fragment>
            <Fragment>
                <MetaData title="Ventas"></MetaData>
                <h5 id="header_ventas" align="center">Vista Administrador - Lista Ventas</h5>                
                <div>
                  <Link to={`/productos`}>
                    <button className="botonp">Lista Productos</button>
                  </Link>
                  <Link to={`/ventas`}>
                    <button className="botonp">Lista Ventas</button>
                  </Link>
                </div>

                <section id="ventas" className="container mt-5">
                  <div>
                    <input value={busqueda} onChange={filtroVentas} type="text" placeholder="Buscar por categoria" className="form-control"/>
                  </div>
                  <table className="table table-striped table-hover mt-5 shadow-lg">
                    <thead>
                      <tr className="bg-curso text-black">
                        <th>FECHA</th>
                        <th>CATEGORIA</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                      </tr>
                    </thead>
                    <tbody>
                      { resultados.map((ventas) => (
                        <tr key={ventas._id}>
                          <td>{new Date(`${ventas.fecha}`).toLocaleDateString("en-us", {year:'numeric', month:'short', day:'2-digit'})}</td>
                          <td>{ventas.categoria}</td>
                          <td>{new Intl.NumberFormat("de-DE").format(`${ventas.cantidad}`)}</td>
                          <td>{new Intl.NumberFormat("de-DE").format(`${ventas.precio}`)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan={2} text-align='center'>TOTALES</th>
                        <th>{new Intl.NumberFormat("de-DE").format(`${totalCantidad}`)}</th>
                        <th>{new Intl.NumberFormat("de-DE").format(`${totalValor}`)}</th>
                      </tr>
                    </tfoot>
                  </table>
                </section>
            </Fragment>
            </Fragment>
        )}
        </Fragment>
    </div>
  )
}

export default ListVentas