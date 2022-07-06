import React, {useState, useEffect} from 'react';
import {Link, useSearchParams, useNavigate} from 'react-router-dom';
import { Form, Row, Col, Alert, Table, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { deleteUser, listUsers } from '../actions/User';
import FormContainer from '../components/FormContainer';
import { USER_LIST_RESET_ADMIN } from '../constants/User';
import Meta from '../components/Meta';

const UserList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const {user} = userLogin;
  const userList = useSelector(state => state.userList);
  const {loading, error, users} = userList;
  const userDelete = useSelector(state => state.userDelete);
  const {loading: loadingOnDelete, error: errorOnDelete, success: successOnDelete} = userDelete;

  useEffect(() => {
    if(user && user.isAdmin){
      dispatch(listUsers());
    }else{
        history('/login');
    }
  }, [dispatch, history, user, successOnDelete]);

  const deleteHandler = (e, id) => {
    e.preventDefault();

    if(window.confirm('Are you sure?')){
        dispatch(deleteUser(id));
        dispatch({type: USER_LIST_RESET_ADMIN});
    }
  }

  return (
    <>
        <Meta title='ProShop | User List'/>
        <h1>Users</h1>
        {errorOnDelete && <Alert variant='danger'>{errorOnDelete}</Alert> }
        {successOnDelete && <Alert variant='success'>User Successfully Deleted</Alert>}
        {loading || loadingOnDelete ? <Loader/> : error ? <Alert variant='danger'>{error}</Alert> 
        : (
            <Table striped bordered hover responsive className='table-md'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>CREATED</th>
                        <th>UPDATED</th>
                        <th>ADMIN?</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.createdAt.substring(0, 10)}</td>
                            <td>{user.updatedAt.substring(0, 10)}</td>
                            <td>{user.isAdmin ? (<i className='fas fa-check fa-3x' style={{ color: 'green' }}></i>)
                                        : (<i className='fas fa-times fa-3x' style={{ color: 'red' }}></i>)}</td>
                            <td>
                                <LinkContainer to={`/admin/users/${user._id}`}>
                                    <Button className='btn-sm' variant='light'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button className='btn-sm' variant='danger' onClick={(e) => deleteHandler(e, user._id)}>
                                        <i className='fas fa-trash'></i>
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

export default UserList