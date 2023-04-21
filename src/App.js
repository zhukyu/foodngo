import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Restaurants from './page/Restaurants';
import RestaurantDetail from './page/RestaurantDetail';
import CheckOut from './page/CheckOut';
import CartItem from './components/CartItem';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/restaurants' element={<Restaurants />} />
            <Route path='/restaurantdetail' element={<RestaurantDetail />} />
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='/cartitem' element={<CartItem />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
