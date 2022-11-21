import React from "react";

const Paginate = props => {
    return (
        <div className="py-3 justify-content-center">
            <button onClick={props.paginaAnterior} type="button" className="btn btn-info mr-1">Anterior &larr;</button>
            <button onClick={props.paginaSiguiente} type="button" className="btn btn-info mr-1">Siguiente &rarr;</button>
        </div>
    )
}

export default Paginate;