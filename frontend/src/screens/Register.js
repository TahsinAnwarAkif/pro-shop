import React, {useState, useEffect} from 'react';
import {Link, useSearchParams, useNavigate} from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { userProfileEdit } from '../actions/User';
import FormContainer from '../components/FormContainer';

const Register = ({}) => {    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const history = useNavigate();
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/';
    const dispatch = useDispatch();
    
    const register = useSelector(state => state.userRegister);
    const {loading, error, user} = register;

    useEffect(() => {
        if(user){
            history(redirect);
        }
    }, [history, user, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setMessage('Password did not match!');
        }else{
            dispatch(userProfileEdit(name, email, password));
        }
    };
  
    return (
    <FormContainer>
        <h1>Register</h1>
        {message && <Alert variant='danger'>{message}</Alert>}
        {error && <Alert variant='danger'>{error}</Alert>}
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
                Register
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Existing Customer? <Link to={redirect ? `/login?redirect=${redirect}`: '/register'}>Sign In</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default Register;
