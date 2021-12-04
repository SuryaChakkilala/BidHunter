import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

const ProductScreen = () => {
    const [qty,setQty]= useState(1)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    console.log(userInfo._id)

    const navigate = useNavigate()
    
    const { id } = useParams()   // alternate to props.match.params
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    const [offer, setOffer] = useState(0)

    console.log(product.user)
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(Number(offer)>product.price)
            console.log('success')
        else
            console.log('invalid')
    }

    const closeBid = (e) => {
        console.log('close bid')
    }

    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>
                <ArrowLeft className="mx-2"/>Go Back
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
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
                                    <strong>${product.price}</strong>
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
                                <Button className='btn btn-primary px-5 py-3' type='button' onClick={submitHandler} disabled={product.countInStock === 0}>Bid on the Product</Button>
                            </center>
                        </ListGroup.Item>
                        {userInfo._id === product.user && 
                        <ListGroup.Item>
                            <center>
                                <Button className='btn btn-primary px-5 py-3' type='button' onClick={closeBid}>Close Bid</Button>
                            </center>
                        </ListGroup.Item>}
                    </ListGroup>
                </Col>
            </Row>
            )}
        </>
    )
}

export default ProductScreen
