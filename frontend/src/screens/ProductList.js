import React, {useState, useEffect} from 'react';
import {Link, useSearchParams, useParams, useNavigate} from 'react-router-dom';
import { Form, Row, Col, Alert, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { deleteProduct, listProducts } from '../actions/Product';
import { PRODUCT_CREATE_UPDATE_RESET_ADMIN, PRODUCT_LIST_RESET } from '../constants/Product';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const {pageNo = 1} = useParams();
  
  const userLogin = useSelector(state => state.userLogin);
  const {user} = userLogin;
  
  const productList = useSelector(state => state.productList);
  const {loading, error, products, pages} = productList;
  const productCreateUpdate = useSelector(state => state.productCreateUpdate);
  const {actionResult, success: successOnCreateUpdate} = productCreateUpdate;
  const productDelete = useSelector(state => state.productDelete);
  const {loading: loadingOnDelete, error: errorOnDelete, success: successOnDelete} = productDelete;

  useEffect(() => {
    if(user && user.isAdmin){
      dispatch(listProducts('', pageNo));
    }else{
        history('/login');
    }
  }, [dispatch, history, user, pageNo, successOnCreateUpdate, successOnDelete]);

  const deleteHandler = (e, id) => {
    e.preventDefault();

    if(window.confirm('Are you sure?')){
        dispatch(deleteProduct(id));
        dispatch({type: PRODUCT_LIST_RESET});
    }
  }

  const editHandler = (e, id) => {
    e.preventDefault();
    dispatch({type: PRODUCT_CREATE_UPDATE_RESET_ADMIN});
    history(`/admin/products/${id}`);
  }

  const createProductHandler = (e) => {
    e.preventDefault();
    dispatch({type: PRODUCT_CREATE_UPDATE_RESET_ADMIN});
    history('/admin/products/create');
  }

  return (
    <>
      <Meta title='ProShop | Product List'/>
      <Row className='align-items-center'>
        <Col md={10}>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product 
          </Button>
        </Col>  
      </Row>
        {errorOnDelete && <Alert variant='danger'>{errorOnDelete}</Alert> }
        {successOnDelete && <Alert variant='success'>Product Successfully Deleted</Alert>}
        {successOnCreateUpdate 
          && <Alert variant='success'>Product with ID: {actionResult.product._id}
             &nbsp;Successfully {actionResult.created ? 'Created' : 'Updated'}</Alert>}
        {(loading || loadingOnDelete) ? <Loader/> : error ? <Alert variant='danger'>{error}</Alert> 
        : (
            <>
            <Table striped bordered hover responsive className='table-md'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <Button className='btn-sm' variant='light' onClick={(e) => editHandler(e, product._id)}>
                                    <i className='fas fa-edit'></i>
                                </Button>
                                <Button className='btn-sm' variant='danger' onClick={(e) => deleteHandler(e, product._id)}>
                                        <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
              <Paginate pages={pages} page={pageNo} isAdmin={true}/>
            </>
        )}
    </>
  )
}

export default ProductList