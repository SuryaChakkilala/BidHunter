import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=> {
        if(userInfo)
            navigate(redirect)
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // DISPATCH REGISTER

        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1 className='py-5'>Sign Up</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="emailID">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className='my-2' type="text" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="emailID">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control className='my-2' type="email" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className='py-3' controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group className='py-3' controlId="confirm password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}></Form.Control>
                    </Form.Group>

                    <Button className='my-2' type="submit" variant="primary">Sign Up</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen