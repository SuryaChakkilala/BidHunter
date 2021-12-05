import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const t = ' '
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = (e) => {
        e.preventDefault()
        dispatch(logout())
        navigate('/login')
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>BidHunter</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="justify-content-end">
                        <Nav className='ms-auto'>
                            <LinkContainer to='/voicerec'>
                                <Nav.Link>Beta Features</Nav.Link>
                            </LinkContainer>
                        {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                            )}
                        {userInfo && <LinkContainer className='px-5' to='/reckz'>
                                <Nav.Link><i class="fa-solid fa-dollar-sign"></i>{t}Reckz</Nav.Link>
                            </LinkContainer>}
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                                </NavDropdown>
                            ) : 
                            <LinkContainer to='/login'>
                                <Nav.Link ><i className='fas fa-user'></i>{t}Sign In</Nav.Link>
                            </LinkContainer>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
