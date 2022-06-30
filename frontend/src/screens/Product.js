import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Rating from '../components/Rating';
import { getProductDetail } from '../actions/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';


const Product = () => {
  const  [qty, setQty] = useState(1);
  const history = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector(state => state.productDetail);
  const { loading, error, product} =  productDetail;

  console.log('test');

  useEffect(() => {
    dispatch(getProductDetail(id))
  }, [dispatch, id]);

  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`);
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
                <h4>Description: ${product.description}</h4>
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
      )}
    </>
  )
}

export default Product;
