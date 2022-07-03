import React, {useState, useEffect} from 'react';
import {Link, useSearchParams, useNavigate} from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../actions/Order';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_GET_RESET } from '../constants/Order';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const login = useSelector(state => state.userLogin);
  const {user} = login;
  const shipping = useSelector(state => state.shipping);
  const {shippingAddress} = shipping;
  const payment = useSelector(state => state.payment);
  const {paymentMethod} = payment;
  const cart = useSelector(state => state.cart);
  const orderPlace = useSelector(state => state.orderPlace);
  const {order, error, success} = orderPlace;

  useEffect(() => {
    if(!user || Object.keys(user).length == 0){
        history('/login');
    }else{
        if(!paymentMethod){
            history('/payment');
        }else if(!shippingAddress || Object.keys(shippingAddress).length == 0){
            history('/shipping');
        }else{
          if(success){
            dispatch({type: ORDER_GET_RESET});
            history(`/orders/${order._id}`);
          }
        }
    }
  }, [dispatch, history, user, shippingAddress, paymentMethod, order, success, cart]);

  cart.itemPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2);
  cart.shippingPrice = Number(Number(cart.itemPrice) > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.15 * cart.itemPrice).toFixed(2);
  cart.totalPrice = Number(Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  const placeOrderHandler = () => {
    dispatch(placeOrder({
      orderItems: cart.cartItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemPrice: cart.itemPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }));
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {shippingAddress.address}, {shippingAddress.city}, 
                        {shippingAddress.postalCode}, {shippingAddress.country}
                    </p>
                </ListGroupItem>
                <ListGroupItem>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method:</strong>
                        {paymentMethod}
                    </p>
                </ListGroupItem>
                <ListGroupItem>
                    <h2>Order Items</h2>
                      {cart.cartItems.length === 0 
                        ? (<Alert variant='info'>Your cart is empty</Alert>)
                        : <ListGroup variant='flush'>
                            {cart.cartItems.map((item, index) => (
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
                      }
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
                  <Col>${cart.itemPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Alert variant='danger'>{error}</Alert>}
              </ListGroupItem>

              <br/>

              <Button type='button'
                      className='btn-block' 
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}>
                      Place Order
              </Button>
            </ListGroup>            
          </Card>              
        </Col>
      </Row>
    
    </>
  )
}

export default PlaceOrder;