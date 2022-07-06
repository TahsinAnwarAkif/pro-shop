import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {Alert, Carousel, CarouselItem, Image} from 'react-bootstrap';
import { listTopRatedProducts } from '../actions/Product';
import Loader from './Loader';


const ProductCarousel = () => {
  const dispatch = useDispatch();

  const topRatedProductList = useSelector(state => state.topRatedProductList);
  const {loading, error, products} = topRatedProductList;

  useEffect(() => {
    dispatch(listTopRatedProducts());
  }, [dispatch]);

  return (
    loading ? <Loader/>
    : error ? <Alert variant='danger'>{error}</Alert>
    : (
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product => (
                <CarouselItem key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid/>
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </CarouselItem>
            ))}
        </Carousel>

    )
  );
}

export default ProductCarousel;