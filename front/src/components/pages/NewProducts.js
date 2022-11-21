import React, { Fragment, useState } from 'react'
import MetaData from "../layout/MetaData"
import { useNavigate } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { postProductDetails } from '../../actions/productActions'


export const NuevoProducto = () => {
    const { loading, product } = useSelector(state => state.productDetails)
    const dispatch = useDispatch();

    const [ name, setName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ stock, setStock ] = useState()
    const [ price, setPrice ] = useState()

    const navigate = useNavigate()

    const crear = async (e) => {
        e.preventDefault()
        product.name = name
        product.description = description
        product.stock = stock
        product.price = price
        product.imagen = Object.assign({url:"./images/products/sportSpeed.jpg"})
        product.role = "Administrator"
        product.category = "Travertino"
        // console.log(product.imagen)
        await dispatch(postProductDetails(product))
        navigate("/productos")
    }

  return (
    <Fragment>
      {loading ? <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i> : (
        <Fragment>
            <MetaData title={'Nuevo producto'}></MetaData>

            <div className='row d-flex justify-content-around'>

                <div className='col-12 col-lg-5 mt-5'>

                    {/* <Card>
                        <label align="center">Seleccione imagen</label>
                        <Card.Img></Card.Img>
                    </Card> */}

                </div>

                <div className='col-12 col-lg-5 mt-5'>

                    <Form onSubmit={crear}>
                        
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}> Nombre: </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Nombre"
                                onChange={e => setName(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}> Descripcion: </Form.Label>
                            <Col sm={9}>
                                <Form.Control as="textarea" aria-label="With textarea" placeholder="Descripcion"
                                onChange={e => setDescription(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}> Stock: </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Stock"
                                onChange={e => setStock(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}> Precio: </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" placeholder="Precio"
                                onChange={e => setPrice(e.target.value)}/>
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