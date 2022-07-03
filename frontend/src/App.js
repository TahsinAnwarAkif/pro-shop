import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from './screens/Home';
import Product from './screens/Product';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Shipping from './screens/Shipping';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<Home/>} exact/>
              <Route path='/login' element={<Login/>} exact/>
              <Route path='/register' element={<Register/>} exact/>
              <Route path='/profile' element={<Profile/>} exact/>
              <Route path='/product/:id' element={<Product/>} exact/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/cart/:id' element={<Cart/>}/>
              <Route path='/shipping' element={<Shipping/>}/>
              <Route path='/payment' element={<Payment/>}/>
              <Route path='/placeOrder' element={<PlaceOrder/>}/>
              <Route path='/orders/:id' element={<Order/>}/>
            </Routes>
          </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
