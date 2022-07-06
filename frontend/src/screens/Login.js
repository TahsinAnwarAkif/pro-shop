import React, {useState, useEffect} from 'react';
import {Link, useSearchParams, useNavigate} from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { userLogin } from '../actions/User';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

const Login = ({}) => {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const history = useNavigate();
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/';
    const dispatch = useDispatch();
    
    const login = useSelector(state => state.userLogin);
    const {loading, error, user} = login;

    useEffect(() => {
        if(user){
            history(redirect);
        }
    }, [history, user, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password));
    };
  
    return (
    <>
    <Meta title='ProShop | Login'/>
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Alert variant='danger'>{error}</Alert>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
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

            <br/>
            
            <Button type='submit' variant='primary'>
                Sign In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
    </>    
  )
}

export default Login
