import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Restaurants from './page/Restaurants';
import RestaurantDetail from './page/RestaurantDetail';
import CheckOut from './page/CheckOut';
import CartItem from './components/CartItem';
import NotFound404 from './page/NotFound404';
import Login from './page/Login';
import SignUp from './page/SignUp';
import UserAccount from './page/UserAccount';
import RestaurantAccount from './page/RestaurantAccount';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/restaurants' element={<Restaurants />} />
            <Route path='/restaurantdetail' element={<RestaurantDetail />} />
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='/notfound404' element={<NotFound404 />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/account/user' element={<UserAccount />} />
            <Route path='/account/restaurant' element={<RestaurantAccount />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
