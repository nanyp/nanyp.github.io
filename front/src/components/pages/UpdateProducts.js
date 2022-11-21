import React, { Fragment, useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from "../layout/MetaData"
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetails, clearErrors, putProductDetails } from '../../actions/productActions'
import { useAlert } from 'react-alert'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'


export const ModificarProducto = () => {
  const { loading, product, error } = useSelector(state => state.productDetails)
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [ name, setName ] = useState(product.name)
  const [ description, setDescription ] = useState(product.description)
  const [ stock, setStock ] = useState(product.stock)
  const [ price, setPrice ] = useState(product.price)

  useEffect(() => {
    dispatch(getProductDetails(id))
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }

  }, [dispatch, alert, error, id])

  const navigate = useNavigate()

  const actualizar = async (e) => {
    e.preventDefault()
    product.name = name
    product.description = description
    product.stock = stock
    product.price = price
    await dispatch(putProductDetails(id, product))
    navigate("/productos")
  }

  return (
    <Fragment>
      {loading ? <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i> : (
        <Fragment>
          <MetaData title={product.name}></MetaData>

            <div className='row d-flex justify-content-around'>

                <div className='col-12 col-lg-5 mt-5'>

                    <Card>
                        {product.imagen && product.imagen.map(img => (
                        <Card.Img key={img.public_id} src={"../"+img.url} alt={img.public_id}/>
                        ))}
                    </Card>

                </div>

                <div className='col-12 col-lg-5 mt-5'>

                    <Form onSubmit={actualizar} >

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}> Product ID </Form.Label>
                            <Form.Label column sm={9}>{product._id}</Form.Label>
                        </Form.Group>
                        
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}> Nombre: </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Nombre"
                                defaultValue={product.name}
                                onChange={e => setName(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}> Descripcion: </Form.Label>
                            <Col sm={9}>
                                <Form.Control as="textarea" aria-label="With textarea" placeholder="Descripcion"
                                defaultValue={product.description}
                                onChange={e => setDescription(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}> Stock: </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Stock" 
                                defaultValue={product.stock}
                                onChange={e => setStock(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}> Precio: </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Price" 
                                defaultValue={product.price}
                                onChange={e => setPrice(e.target.value)} />
                            </Col>
                        </Form.Group>
                          
                        <Button className="botonp" variant='primary' type='submit'> Guardar </Button>

                    </Form>

                </div>
                        
            </div>
        </Fragment>
      )}
    </Fragment>
  )
}