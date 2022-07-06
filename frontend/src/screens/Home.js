import React, {useEffect} from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import Product from '../components/Product';
import { listProducts } from '../actions/Product';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const Home = () => {
  const dispatch = useDispatch();
  const {keyword, pageNo = 1} = useParams();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, pages } =  productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNo));
  }, [dispatch, keyword, pageNo]);

  return (
    <>
        <Meta/>

        {(!keyword || keyword === '') ? <ProductCarousel/> : (
          <Link to='/' className='btn btn-light'>Go Back</Link>
        )}
        <h1>Latest Products</h1>

        {loading 
        ? <Loader />
        : error ? <Alert variant="danger">{error}</Alert>
        : products.length === 0 ? <Alert variant="info">No Matching Product Found</Alert>
        : 
        <>
          <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}/>
                  </Col>
              ))}
          </Row>
          <Paginate pages={pages} page={pageNo} keyword={keyword ? keyword : ''}/>
        </>
        }

    </>
  )
}

export default Home;