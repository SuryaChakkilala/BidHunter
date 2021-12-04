import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// import axios from 'axios'
import { updateUserProfile, logout } from '../actions/userActions'

const Reckz = () => {
    const [input, setInput] = useState(0)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile({
            reckz: userInfo.reckz + Number(input)
        }))
        console.log('submit')
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div>
            <FormContainer>
                <h3 className="py-3">Available Reckz: {userInfo.reckz}</h3>
                <h2 className='my-3'><u>Purchase Reckz</u></h2>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="number">
                        <Form.Label><h3>Buy Reckz</h3></Form.Label>
                        <Form.Control className='py-3' type="number" placeholder="Enter reckz to purchase" value={input} onChange={(e)=>{setInput(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <figure>
                        <figcaption className="blockquote-footer py-5">
                            * You will be logged out after clicking on "Purchase" to ensure the changes are properly reflected to your account
                        </figcaption>
                    </figure>
                    <center>
                        <div className="d-grid gap-2">
                            <Button className="btn btn-md btn-primary" type="submit" variant='success'>Purchase</Button>
                        </div>
                    </center><br />
                </Form>
            </FormContainer>
        </div>
    )
}

export default Reckz
