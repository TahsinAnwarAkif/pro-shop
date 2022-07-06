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
import UserList from './screens/UserList';
import UserEdit from './screens/UserEdit';
import ProductList from './screens/ProductList';
import ProductCreateUpdate from './screens/ProductCreateUpdate';
import OrderList from './screens/OrderList';

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
              <Route path='/products/:id' element={<Product/>} exact/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/cart/:id' element={<Cart/>}/>
              <Route path='/shipping' element={<Shipping/>}/>
              <Route path='/payment' element={<Payment/>}/>
              <Route path='/placeOrder' element={<PlaceOrder/>}/>
              <Route path='/orders/:id' element={<Order/>}/>
              <Route path='/admin/users' element={<UserList/>}/>
              <Route path='/admin/users/:id' element={<UserEdit/>}/>
              <Route path='/admin/products' element={<ProductList/>}/>
              <Route path='/admin/products/:id' element={<ProductCreateUpdate/>}/>
              <Route path='/admin/orders' element={<OrderList/>}/>

              <Route path='/search/:keyword' element={<Home/>} exact/>
              <Route path='/page/:pageNo' element={<Home/>} exact/>
              <Route path='/search/:keyword/page/:pageNo' element={<Home/>} exact/>
              <Route path='/admin/products/page/:pageNo' element={<ProductList/>} exact/>
            </Routes>
          </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
