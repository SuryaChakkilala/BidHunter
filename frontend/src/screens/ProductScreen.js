import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { ArrowLeft } from 'react-bootstrap-icons'
import axios from 'axios'

const ProductScreen = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const { id } = useParams()   // alternate to props.match.params
    
    const dispatch = useDispatch()

    const [product, setProduct] = useState({})
    useEffect(()=>{
        dispatch(listProductDetails(id))
        const fun = async () => {
            const response = await axios.get(`http://localhost:3001/api/products/${id}`)
            setProduct(response.data)
        }
        fun()
    }, [dispatch, id])

    const [offer, setOffer] = useState(0)

    const update = () => {
        axios.put(`http://localhost:3001/api/products/${id}`, {
            price: offer,
            currentHolder: userInfo._id
        }).then(response => {
            const p = {...product}
            p.price = offer
            p.currentHolder = userInfo._id
            setProduct(p)
        })
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        /*if(Number(offer)>product.price) {
            setPrice(Number(offer))
        }
        else
            window.alert('INVALID')*/
        if(Number(offer)>product.price) {
            console.log(Number(offer))
            console.log(product.price)
            update()
        } else {
            window.alert('Cannot Bid with that offer')
        }
        console.log(Number(product.price))
    }
    const closeBid = (e) => {
        console.log('close bid')
    }

    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>
                <ArrowLeft className="mx-2"/>Go Back
            </Link>
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Price: ${product.price}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Current Bid:
                                </Col>
                                <Col>
                                    <strong>$ {product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Holder:
                                </Col>
                                <Col>
                                    {product.currentHolder}
                                    { /*current holder*/ }
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock > 0? 'In Stock' : 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <Form onSubmit={submitHandler}>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col className="py-3">Your Offer</Col>
                                    <Col>
                                    <Form.Group controlId="offer">
                                        <Form.Control className='my-2' type="Number" placeholder="Enter Your Offer" value={offer} onChange={(e)=>{setOffer(e.target.value)}}></Form.Control>
                                    </Form.Group>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                            <center>
                                <Button className='btn btn-primary px-5 py-3' type='submit' disabled={product.countInStock === 0}>Bid on the Product</Button>
                            </center>
                        </ListGroup.Item>
                        {userInfo._id === product.user && 
                        <ListGroup.Item>
                            <center>
                                <Button className='btn btn-primary px-5 py-3' type='button' onClick={closeBid}>Close Bid</Button>
                            </center>
                        </ListGroup.Item>}
                        </Form>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
