import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from './screens/Home';
import Product from './screens/Product';
import Cart from './screens/Cart';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<Home/>} exact/>
              <Route path='/product/:id' element={<Product/>} exact/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/cart/:id' element={<Cart/>}/>
            </Routes>
          </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
