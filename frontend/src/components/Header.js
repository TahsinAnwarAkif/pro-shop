import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import {Navbar, Nav, Container, NavDropdown, NavItem} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Route, useNavigate} from 'react-router-dom';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import SearchBox from './SearchBox';
import { userLogout } from '../actions/User';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {user} = userLogin;

  const logoutHandler = () => {
    dispatch(userLogout());
  }

  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox/>
                <Nav className="ms-auto">
                    <LinkContainer to="/cart">
                        <Nav.Link><i className='fas fa-shopping-cart'/>Cart</Nav.Link>
                    </LinkContainer>
                    {user ? (
                        <NavDropdown title={user.name} id='username'>
                            <LinkContainer to='/profile'>
                                <DropdownItem>
                                    Profile
                                </DropdownItem>
                            </LinkContainer>        
                            <DropdownItem onClick={logoutHandler}>
                                Logout
                            </DropdownItem>
                        </NavDropdown>

                    ) : (
                         <LinkContainer to="/login">
                            <Nav.Link><i className='fas fa-user'/>Sign In</Nav.Link>
                         </LinkContainer>
                    )}
                    {
                        user && user.isAdmin && (
                            <NavDropdown title='ADMIN' id='adminMenu'>
                                <LinkContainer to='/admin/users'>
                                    <DropdownItem>
                                        Users
                                    </DropdownItem>
                                </LinkContainer>        
                                <LinkContainer to='/admin/products'>
                                    <DropdownItem>
                                        Products
                                    </DropdownItem>
                                </LinkContainer>
                                <LinkContainer to='/admin/orders'>
                                    <DropdownItem>
                                        Orders
                                    </DropdownItem>
                                </LinkContainer> 
                        </NavDropdown>
                        )
                    }
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header;