import React, { useEffect } from 'react'
import { Row, Col, Button, Container } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Link, useParams } from 'react-router-dom'

const HomeScreen = () => {
    const { keyword } = useParams()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch])

    return (
        <>
            <Container>
                <div className="px-2 my-5 jumbotron">
                    <h1 className="display-4">Welcome to BidHunter!</h1>
                    <hr className="my-4" />
                    <p>Hope you are having a Great Day! To learn more about us click on the button below</p>
                    <p className="lead">
                        <Link to='/about'>
                            <Button className="btn btn-info btn-md">Learn more</Button>
                        </Link>
                    </p>
                </div><br /><br />
            </Container>
            <h1>Latest Prodcuts</h1>
            {loading ? <Loader>Loading...</Loader> : error ? <Message variant='danger'>{error}</Message> : <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>}
        </>
    )
}

export default HomeScreen
