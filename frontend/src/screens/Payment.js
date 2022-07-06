import React, {useState, useEffect} from 'react';
import {Link, useSearchParams, useNavigate} from 'react-router-dom';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import {savePaymentMethod} from '../actions/Payment';
import Meta from '../components/Meta';

const Payment = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const login = useSelector(state => state.userLogin);
  const {user} = login;
  const shipping = useSelector(state => state.shipping);
  const {shippingAddress} = shipping;
  const payment = useSelector(state => state.payment);
  const [paymentMethod, setPaymentMethod] = useState(payment.paymentMethod);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(!user || Object.keys(user).length == 0){
        history('/login');
    }else{
        if(!shippingAddress || Object.keys(shippingAddress).length == 0){
            history('/shipping');
        }
        
        !paymentMethod && setPaymentMethod('PayPal');
    }
  }, [dispatch, history, user, shippingAddress, paymentMethod, setPaymentMethod]);

  const submitHandler = (e) => {
    e.preventDefault();

    if(!['PayPal'].includes(paymentMethod)){
        setMessage('Payment Method is required!');
    }else{
        dispatch(savePaymentMethod(paymentMethod));
        history('/placeOrder');
    }
  }

  return (
    <>
      <Meta title='ProShop | Payment Method'/>
      <FormContainer>
          <CheckoutSteps step1 step2 step3/>
          <h1>Payment</h1>
          {message && <Alert variant='danger'>{message}</Alert>}
          <Form onSubmit={submitHandler}>
              <Form.Group>
                  <Form.Label as='legend'>
                      Payment Method
                  </Form.Label>
                  <Col>
                      <Form.Check 
                              type='radio'
                              label='PayPal or Credit Card'
                              id='PayPal'
                              name='paymentMethod'
                              value='PayPal'
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              checked>   
                      </Form.Check>
                  </Col>
              </Form.Group>
              
              <br/>
              
              <Button type='submit' variant='primary'>
                  Continue
              </Button>
          </Form>
      </FormContainer>
    </>
  )
}

export default Payment;