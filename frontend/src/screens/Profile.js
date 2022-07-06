import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { Form, Button, Row, Col, Alert, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { userLogin, userProfile, userProfileEdit } from '../actions/User';
import FormContainer from '../components/FormContainer';
import { getOrdersByUserId } from '../actions/Order';
import { USER_PROFILE_RESET } from '../constants/User';
import { ORDER_GET_ALL_RESET, ORDER_GET_RESET } from '../constants/Order';
import Meta from '../components/Meta';

const Profile = () => {
    const dispatch = useDispatch();        
    const history = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const login = useSelector(state => state.userLogin);
    let {user} = login;

    const profile = useSelector(state => state.userProfile);
    const {loading, userDetail} = profile;

    const profileEdit = useSelector(state => state.userProfileEdit);
    const {error, success} = profileEdit;

    const orderGetAllByUserId = useSelector(state => state.orderGetAllByUserId);
    const {loading: loadingOrders, orders} = orderGetAllByUserId;

    useEffect(() => {
        if(!user){
            history('/login');
        }else{
            dispatch({type: USER_PROFILE_RESET });
            dispatch({type: ORDER_GET_ALL_RESET});
            
            dispatch(userProfile('profile'));
            dispatch(getOrdersByUserId());

            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, history, user]);

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setMessage('Password did not match!');
        }else{
            dispatch(userProfileEdit('profile', {id: user._id, name: name, email: email, password: password}));
        }
    };

    
    const detailsHandler = (e, id) => {
        e.preventDefault();

        dispatch({type: ORDER_GET_RESET});
        history(`/orders/${id}`);
    }
  
    return (
        <>
          <Meta title='ProShop | Profile'/>
          <Row>
              <Col md={5}>
                  <FormContainer>
                      <h1>User Profile</h1>
                      {message && <Alert variant='danger'>{message}</Alert>}
                      {error && <Alert variant='danger'>{error}</Alert>}
                      {success && <Alert variant='success'>Profile Updated</Alert>}
                      {loading && <Loader/>}
                      <Form onSubmit={submitHandler}>
                          <Form.Group controlId='name'>
                              <Form.Label>
                                  Name
                              </Form.Label>
                              <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>

                              </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='email'>
                              <Form.Label>
                                  Email Address
                              </Form.Label>
                              <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>

                              </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='password'>
                              <Form.Label>
                                  Password
                              </Form.Label>
                              <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                              </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='confirmPassword'>
                              <Form.Label>
                                  Confirm Password
                              </Form.Label>
                              <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} 
                                  onChange={(e) => setConfirmPassword(e.target.value)}>
                              </Form.Control>
                          </Form.Group>

                          <br/>
                          
                          <Button type='submit' variant='primary'>
                              Update
                          </Button>
                      </Form>
                  </FormContainer>
              </Col>
              <Col md={7}>
                  <h2>My Orders</h2>

                  {loadingOrders ? <Loader/> 
                  : (!orders || orders.length == 0) ? <Alert variant='info'>No Orders Found</Alert>
                  : (
                      <Table striped bordered hover responsive className='table-sm'>
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>DATE</th>
                                  <th>TOTAL</th>
                                  <th>PAID</th>
                                  <th>DELIVERED</th>
                                  <th>DETAILS</th>
                              </tr>
                          </thead>
                          <tbody>
                              {orders.map((order) => (
                                  <tr key={order._id}>
                                      <td>{order._id}</td>
                                      <td>{order.createdAt.substring(0, 10)}</td>
                                      <td>{order.totalPrice}</td>
                                      <td>
                                          {order.isPaid ? (order.paidAt.substring(0, 10)) 
                                          : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}
                                      </td>
                                      <td>
                                          {order.isDelivered ? (order.deliveredAt.substring(0, 10)) 
                                          : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}
                                      </td>
                                      <td>
                                          <Button className='btn-sm' variant='light' onClick={(e) => detailsHandler(e, order._id)}>
                                                  Details
                                          </Button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </Table>    
                  )}    
              </Col>
          </Row>
        </>
  )
}

export default Profile;
