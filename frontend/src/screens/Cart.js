import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {Alert, Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/Cart';

const Cart = () => {
    const {id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const qty = searchParams.get('qty') ? searchParams.get('qty') : 1;
    const dispatch = useDispatch();
    const history = useNavigate();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty));
        }
    }, [dispatch, id, qty]);

    const removeFromCartHandler = (id) => {
        console.log('remove');
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        history('/login?redirect=shipping');
        console.log('checkout');
    }

     return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>

                {cartItems.length === 0 ? (
                        <Alert variant='info'>
                            Your Cart is Empty. <Link to='/'>Go Back</Link>
                        </Alert>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>${item.price}</Col>
                                <Col md={2}>
                                    <Form.Control
                                        as='select'
                                        value={item.qty}
                                        onChange={(e) =>
                                                    dispatch(addToCart(item.product, Number(e.target.value)))
                                    }>
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        type='button'
                                        variant='light'
                                        onClick={() => removeFromCartHandler(item.product)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
        )}
                
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button type='Button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
    }
    
export default Cart;