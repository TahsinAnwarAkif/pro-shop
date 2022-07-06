import React, {useState, useEffect} from 'react';
import {Link, useSearchParams, useNavigate} from 'react-router-dom';
import { Form, Row, Col, Alert, Table, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { getAllOrders } from '../actions/Order';
import FormContainer from '../components/FormContainer';
import { ORDER_GET_ALL_RESET_ADMIN, ORDER_GET_RESET } from '../constants/Order';
import Meta from '../components/Meta';

const OrderList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  
  const userLogin = useSelector(state => state.userLogin);
  const {user} = userLogin;
  
  const orderGetAll = useSelector(state => state.orderGetAll);
  const {loading, error, orders} = orderGetAll;

  useEffect(() => {
    if(user && user.isAdmin){
      dispatch(getAllOrders());
    }else{
        history('/login');
    }
  }, [dispatch, history, user]);

  const detailsHandler = (e, id) => {
    e.preventDefault();

    dispatch({type: ORDER_GET_RESET});
    history(`/orders/${id}`);
  }

  return (
    <>
        <Meta title='ProShop | Order List'/>
        <h1>Orders</h1>
        {loading ? <Loader/> : error ? <Alert variant='danger'>{error}</Alert> 
        : (!orders || orders.length == 0) ? <Alert variant='info'>No Orders Found</Alert>
        : (
            <Table striped bordered hover responsive className='table-md'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
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
                        <td>{order && order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                            {order.isPaid ? (order.paidAt.substring(0, 10)) 
                            : (<i className='fas fa-times fa-3x' style={{ color: 'red' }}></i>)}
                        </td>
                        <td>
                            {order.isDelivered ? (order.deliveredAt.substring(0, 10)) 
                            : (<i className='fas fa-times fa-3x' style={{ color: 'red' }}></i>)}
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
    </>
  )
}

export default OrderList;