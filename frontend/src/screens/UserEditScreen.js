import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useParams } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success:successUpdate } = userUpdate

    useEffect(()=> {
        if(successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET
            })
        } else {
            if(!user.name || user._id !== id) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, dispatch, id, successUpdate])

    const nameChange = (e) => {
        setName(e.target.value)
    }
    const emailChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }
    const isAdminChange = (e) => {
        e.preventDefault()
        setIsAdmin(e.target.check)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: id, name, email, isAdmin }))
        navigate('/admin/userlist')
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h1 className='py-5'>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading  ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId="emailID">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className='my-2' type="text" placeholder="Enter Name" value={name} onChange={nameChange}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="emailID">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control className='my-2' type="email" placeholder="Enter Email" value={email} onChange={emailChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className='py-3' controlId="isadmin">
                        <Form.Label>Is Admin?</Form.Label>
                        <Form.Check type="checkbox" checked={isAdmin} onChange={isAdminChange}></Form.Check>
                    </Form.Group>
    
                    <Button className='my-2' type="submit" variant="success">Update</Button>
                </Form>
            )}
        </FormContainer>
        </>
    )
}

export default UserEditScreen