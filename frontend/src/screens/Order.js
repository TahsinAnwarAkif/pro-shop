import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, ListGroupItem, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import { getOrder, payOrder } from '../actions/Order';
import Loader from '../components/Loader';
import { ORDER_PAY_RESET } from '../constants/Order';

const Order = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [sdkReady, setSdkReady] = useState(false);
    const { id } = useParams();
    const login = useSelector(state => state.userLogin);
    const {user} = login;
    const orderGet = useSelector(state => state.orderGet);
    const {loading, error, order} = orderGet;
    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay, success: successPay} = orderPay;
    
    useEffect(() => {
        if(!user || Object.keys(user).length == 0){
            history('/login');
        }else{
            const addPaypalScript = async() => {
                const {data: clientId} = await axios.get('/api/config/paypal');  
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.async = true;
                script.onload = () => {
                    setSdkReady(true);
                }

                document.body.appendChild(script);
            };

            if(!order || successPay){
                dispatch({type: ORDER_PAY_RESET});
                dispatch(getOrder(id));
            }else if(!order.isPaid){
                if(!window.paypal){
                    addPaypalScript();
                }else{
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, history, user, id, order, successPay]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    };
    
    return (loading ? <Loader/> 
    : error ? <Alert variant='danger'>{error}</Alert>
    : order ? 
    <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, 
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Alert variant='success'>Delivered on {order.deliveredAt}</Alert> 
                                           : <Alert variant='danger'>Not Delivered</Alert>}
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:</strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Alert variant='success'>Paid on {order.paidAt}</Alert> 
                                      : <Alert variant='danger'>Not Paid</Alert>}
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Order Items</h2>
                        <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                <ListGroupItem key={index}>
                                    <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                    </Col>
                                    </Row>    
                                </ListGroupItem>  
                                ))}
                        </ListGroup>
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Order Summary</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        {!order.isPaid && (
                            <ListGroupItem>
                                {loadingPay && <Loader/>}
                                {!sdkReady ? <Loader/> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                )}
                        </ListGroupItem>
                        )}
                    </ListGroup>            
                </Card>              
            </Col>
        </Row>
    </>
    : <Alert variant='danger'>No Order Found</Alert>
    )
}

export default Order;