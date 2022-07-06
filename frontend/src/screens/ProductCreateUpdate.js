import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader';
import { createUpdateProduct, getProductDetail } from '../actions/Product';
import FormContainer from '../components/FormContainer';
import { PRODUCT_DETAIL_RESET } from '../constants/Product';
import Meta from '../components/Meta';

const ProductCreateUpdate = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const {id} = useParams();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    
    const [uploading, setUploading] = useState(false);
    
    const login = useSelector(state => state.userLogin);
    let {user: loggedInUser} = login;

    const productDetail = useSelector(state => state.productDetail);
    const {product} = productDetail;

    const productCreateUpdate = useSelector(state => state.productCreateUpdate);
    const {loading, error, success} = productCreateUpdate;

    useEffect(() => {
        if(!loggedInUser || !loggedInUser.isAdmin){
            history('/login');
        }else{
            if(success){
              history('/admin/products');
            }else{
                dispatch({type: PRODUCT_DETAIL_RESET});

                if(id !== 'create'){
                    dispatch(getProductDetail(id));
                }
            }
        }
    }, [dispatch, history, id, loggedInUser, success]);

    useEffect(() => {
      setName((product && product.name) || '');
      setPrice((product && product.price) || 0);
      setImage((product && product.image) || '');
      setBrand((product && product.brand) || '');
      setCategory((product && product.category) || '');
      setCountInStock((product && product.countInStock) || 0);
      setDescription((product && product.description) || '');    
    }, [product]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createUpdateProduct(id, {
                    name, 
                    price, 
                    image, 
                    brand, 
                    category, 
                    countInStock, 
                    description}));
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        
        formData.append('image', file);
        setUploading(true);

        try{
          const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
          
          const { data } = await axios.post(`/api/upload`, formData, config);
          
          setImage(data);
          setUploading(false);
        }catch(error){
            console.log(error);
            setUploading(false); 
        }
    }
  
    return (
    <>
      <Meta title='ProShop | Create Product'/>
      <Link to='/admin/products' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>{id === 'create' ? 'Create' : 'Update'} Product</h1>
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
            <Form.Group controlId='price'>
                <Form.Label>
                    Price
                </Form.Label>
                <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
                <Form.Label>
                    Brand
                </Form.Label>
                <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
                <Form.Label>
                    Image
                </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter image URL'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}>
                </Form.Control>
                <Form.Control
                    type='file'
                    onChange={uploadFileHandler}>
                </Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='category'>
                <Form.Label>
                    Category
                </Form.Label>
                <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
                <Form.Label>
                    In Stock Count
                </Form.Label>
                <Form.Control type='number' placeholder='Enter In Stock Count' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
                <Form.Label>
                    Description
                </Form.Label>
                <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <br/>
            
            <Button type='submit' variant='primary'>
                {id === 'create' ? 'Create' : 'Update'}
            </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductCreateUpdate;
