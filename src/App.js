import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Restaurants from './page/Restaurants';
import RestaurantDetail from './page/RestaurantDetail';
import CheckOut from './page/CheckOut';
import ShoppingCart from './components/ShoppingCart';
import NotFound404 from './page/NotFound404';
import Login from './page/Login';
import SignUp from './page/SignUp';
import UserAccount from './page/UserAccount';
import PlacesAutocomplete from 'react-places-autocomplete';
import RestaurantDashboard from './page/RestaurantDashboard';
import store from './utility/store';
import { Provider } from 'react-redux';
import SignUpRestaurant from './page/SignUpRestaurant';
import DeliveryDriver from './page/DeliveryDriver';
import Admin from './page/Admin';
import "react-datepicker/dist/react-datepicker.css";
import SignUpShipper from './page/SignUpShipper';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/restaurants' element={<Restaurants />} />
            <Route path='/restaurant/:id' element={<RestaurantDetail />} />
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='/notfound404' element={<NotFound404 />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/account/user' element={<UserAccount />} />
            <Route path='/restaurant' element={<RestaurantDashboard />} />
            <Route path='/restaurant/signup' element={<SignUpRestaurant />} />
            <Route path='/shipper' element={<DeliveryDriver />} />
            <Route path ='/admin' element={<Admin />} />
            <Route path='/shipper/signup' element={<SignUpShipper />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
