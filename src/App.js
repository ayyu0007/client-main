import Headers from './commponet/Header';
import Home from './commponet/Home';
import CartDetails from './commponet/CartDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import CheckoutPage from './commponet/CheckoutPage';

function App() {
  return (
    <>
     <Headers />
     <Routes>
      <Route  path='/' element={<Home />}/>
      <Route  path='/cart' element={<CartDetails />}/>
      <Route exact path="/checkout" element={<CheckoutPage />}/>
     </Routes>
     <Toaster />
    </>
  );
}

export default App;