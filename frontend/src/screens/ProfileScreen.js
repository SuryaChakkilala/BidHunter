import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile, logout } from '../actions/userActions'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile
    
    const location = useLocation()

    useEffect(()=> {
        if(!userInfo)
            navigate('/login')
        else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate, userInfo, user, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email }))
            dispatch(getUserDetails('profile'))
            dispatch(logout())
            navigate('/login')
        }
    }

    return (
        <Row>
            <Col md={6}>
                <h1 className='py-5'>User Profile</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                <Form.Group controlId="emailID">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className='my-2' type="name" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}}></Form.Control>
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
                    </Form.Group><br />
                    <figure>
                        <figcaption class="blockquote-footer">
                            * You will be logged out after clicking on "Update" to ensure the changes are properly reflected to your account
                        </figcaption>
                    </figure>
                    <Button className='my-2' type="submit" variant="success" width="auto">Update</Button>
                </Form>
            </Col>
            <Col md={9}>
            
            </Col>
        </Row>
    )
}

export default ProfileScreen