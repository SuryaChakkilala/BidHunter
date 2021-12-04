import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'

const CartScreen = () => {
    const params = useParams()
    const location = useLocation()

    const { id } = params
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    useEffect(() => {
        if(id)
            addToCart(id, qty)
    }, [dispatch, id, qty])

    return (
        <div>
            CART
        </div>
    )
}

export default CartScreen
