import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { userProfile, userProfileAdm, userProfileEdit } from '../actions/User';
import FormContainer from '../components/FormContainer';
import { USER_PROFILE_RESET, USER_PROFILE_RESET_ADMIN } from '../constants/User';
import Meta from '../components/Meta';

const UserEdit = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const {id} = useParams();    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [messageOnEdit, setMessageOnEdit] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const login = useSelector(state => state.userLogin);
    let {user: loggedInUser} = login;
    const profile = useSelector(state => state.userProfile);
    const {loading, error, userDetail: user} = profile;
    const profileEdit = useSelector(state => state.userProfileEdit);
    const {loading: loadingOnEdit, error: errorOnEdit, success: successOnEdit} = profileEdit;

    useEffect(() => {
        if(loggedInUser && loggedInUser.isAdmin){
            dispatch({type: USER_PROFILE_RESET });
            dispatch(userProfile(id));

            if(successOnEdit){
                setMessageOnEdit('Profile updated successfully');
            }
        }else{
            history('/login');
        }
    }, [dispatch, loggedInUser, history, id, successOnEdit]);

    useEffect(() => {
        if(user){            
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);      
        }
    }, [user]);

    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(userProfileEdit(id, {
                id: user._id, 
                name: name, 
                email: email, 
                isAdmin: isAdmin}));
    };
  
    return (
    <>
      <Meta title='ProShop | Edit User'/>
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {messageOnEdit && <Alert variant='success'>{messageOnEdit}</Alert>}
        {(error) && <Alert variant='danger'>{error}</Alert>}
        {(errorOnEdit) && <Alert variant='danger'>{errorOnEdit}</Alert>}
        {(loading || loadingOnEdit) && <Loader/>}
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
            <Form.Group controlId='isadmin'>
              <Form.Check
                type='switch'
                label='Admin Access'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <br/>
            
            <Button type='submit' variant='primary'>
                Update
            </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default UserEdit;
