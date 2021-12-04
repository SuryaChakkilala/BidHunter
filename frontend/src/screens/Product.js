import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'

const Product = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const navigate = useNavigate()
    const { id } = useParams()
    const [product, setProduct] = useState({})
    useEffect(()=>{
        const fun = async() => {
            const response = await axios.get(`http://localhost:3001/api/products/${id}`)
            setProduct(response.data)
        }
        fun()
    }, [product])
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
                                    <strong>$ {price}</strong>
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
        </>
    )
}

export default Product
