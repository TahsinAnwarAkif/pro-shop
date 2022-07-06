import React, {useState, useEffect} from 'react';
import {Link, useSearchParams, useNavigate} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/Shipping';
import Meta from '../components/Meta';

const Shipping = () => {
  const login = useSelector(state => state.userLogin);
  const {user} = login;
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if(!user || Object.keys(user).length == 0){
        history('/login');
    }
  }, [dispatch, history, user]);

  const shipping = useSelector(state => state.shipping);
  const {shippingAddress} = shipping;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(saveShippingAddress({address, city, postalCode, country}));

    history('/payment');
  }; 

  return (
    <>
      <Meta title='ProShop | Shipping'/>
  
      <FormContainer>
          <CheckoutSteps step1 step2/>
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
              <Form.Group controlId='address'>
                  <Form.Label>
                      Address
                  </Form.Label>
                  <Form.Control 
                      type='text'
                      placeholder='Enter address'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)} 
                      required/>
              </Form.Group>
              <Form.Group controlId='city'>
                  <Form.Label>
                      City
                  </Form.Label>
                  <Form.Control 
                      type='text'
                      placeholder='Enter City'
                      value={city}
                      onChange={(e) => setCity(e.target.value)} 
                      required/>
              </Form.Group>
              <Form.Group controlId='postalCode'>
                  <Form.Label>
                      Postal Code
                  </Form.Label>
                  <Form.Control 
                      type='text'
                      placeholder='Enter Postal Code'
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)} 
                      required/>
              </Form.Group>
              <Form.Group controlId='country'>
                  <Form.Label>
                      Country
                  </Form.Label>
                  <Form.Control 
                      type='text'
                      placeholder='Enter Country'
                      value={country}
                      onChange={(e) => setCountry(e.target.value)} 
                      required/>
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

export default Shipping;