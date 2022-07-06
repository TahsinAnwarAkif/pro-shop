import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form, Alert, FormGroup} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { getProductDetail, createReview } from '../actions/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_DETAIL_RESET, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_TOP_RATED_LIST_RESET } from '../constants/Product';
import Meta from '../components/Meta';

const Product = () => {
  const  [qty, setQty] = useState(1);
  const [rating, setRating] =  useState(0);
  const [comment, setComment] =  useState('');
  const [successOnReviewMsg, setSuccessOnReviewMsg] =  useState('');

  const history = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const login = useSelector(state => state.userLogin);
  const { user } =  login;
  
  const productDetail = useSelector(state => state.productDetail);
  const { loading, error, product} =  productDetail;

    const productCreateReview = useSelector(state => state.productCreateReview);
    const { 
      loading: loadingOnCreateReview, 
      error: errorOnCreateReview, 
      success: successOnCreateReview
    } =  productCreateReview;

  useEffect(() => {
    if(successOnCreateReview){
      setSuccessOnReviewMsg('Review Published Successfully');

      setRating(0);
      setComment('');
    }
    
    dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
    dispatch({type: PRODUCT_DETAIL_RESET});
    dispatch(getProductDetail(id))
  }, [dispatch, id, successOnCreateReview]);

  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();  
    dispatch(createReview(id, {rating, comment}));
    dispatch({type: PRODUCT_TOP_RATED_LIST_RESET});
  };
  
  return (
    <> 
      <Link className='btn btn-white my-3' to='/'>
        Go Back
      </Link>
      {loading 
      ? <Loader />
      : error ? <Message variant="danger">{error}</Message>
      : (
        <>
          <Meta title={product.name}/>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroupItem>
                <ListGroupItem>
                  <h4>Price: ${product.price}</h4>
                </ListGroupItem>
                <ListGroupItem>
                  <h4>Description: {product.description}</h4>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>
                        Price:
                      </Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                        Status:
                      </Col>
                      <Col>
                        <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>  
                        <Col>
                          <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))  }
                          </Form.Control></Col> 
                      </Row>                    
                    </ListGroupItem>
                  )}

                  <Button 
                    className='btn-block' 
                    type='button' 
                    disabled={product.countInStock <= 0}
                    onClick={addToCartHandler}>
                    Add to Cart
                  </Button>
                </ListGroup>
              </Card>
            </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Alert variant='info'>No Reviews</Alert>}
            <ListGroup variant='flush'>
              {product.reviews.map(review => (
                <ListGroupItem key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating}/>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroupItem>
              ))}
              <ListGroupItem>
                <h2>Write a Customer Review</h2>
                {loadingOnCreateReview && <Loader/>}
                {errorOnCreateReview && (<Alert variant='danger'>{errorOnCreateReview}</Alert>)}
                {successOnReviewMsg && (<Alert variant='success'>{successOnReviewMsg}</Alert>)}
                {user ? (
                  <Form onSubmit={reviewSubmitHandler}>
                    <FormGroup controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                          <option value=''>Please Select</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </FormGroup>
                    <FormGroup controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                      </Form.Control>
                    </FormGroup>

                    <br/>

                    <Button type='submit' variant='primary'>
                      Submit
                    </Button>
                  </Form>
                )
                : (<Alert variant='info'>
                    Please <Link to='/login'>Sign In</Link> to Write a Review
                  </Alert>
                )}
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </>
      )}
    </>
  )
}

export default Product;
