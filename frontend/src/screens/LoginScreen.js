import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const redirect = location.search ? location.search.split('=') : '/'
    
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1 className='py-5'>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="emailID">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control className='my-2' type="email" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
                </Form.Group>
                <Form.Group className='py-3' controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
                </Form.Group>

                <Button className='my-2' type="submit" variant="primary">Sign In</Button>
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer?
                    <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
