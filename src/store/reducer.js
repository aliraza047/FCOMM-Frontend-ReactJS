import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import Auth from '../redux/reducers/Auth/index';
import User from '../redux/reducers/User/index';
import Product from '../redux/reducers/Product/index';
import Blog from '../redux/reducers/Blog/index';
import Category from '../redux/reducers/Category/index';
import Setting from '../redux/reducers/Setting/index';
import Home from '../redux/reducers/Customer.Reducer/Home/Home';
import HomeBlog from '../redux/reducers/Customer.Reducer/Blog/index';
import HomeProduct from '../redux/reducers/Customer.Reducer/Product/index';
import Drawer from '../redux/reducers/Customer.Reducer/Drawer/index';
import Cart from '../redux/reducers/Customer.Reducer/Cart/index';
import Order from '../redux/reducers/Order/index';
import HomeOrder from '../redux/reducers/Customer.Reducer/Order/index';
import ContactUs from '../redux/reducers/ContactUs/index';
import Report from '../redux/reducers/Report/index';
import Notification from '../redux/reducers/Notification/index';
import Message from '../redux/reducers/Message/index';
import Wishlist from 'redux/reducers/Customer.Reducer/Wishlist';
import AboutUs from 'redux/reducers/AboutUs';
import RewardsAndPromotions from 'redux/reducers/RewardsAndPromotions';
import Payment from 'redux/reducers/Payment';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    _auth: Auth,
    _user: User,
    _product: Product,
    _blog: Blog,
    _category: Category,
    _setting: Setting,
    _contactUs: ContactUs,
    _home: Home,
    _homeBlog: HomeBlog,
    _homeProduct: HomeProduct,
    _drawer: Drawer,
    _cart: Cart,
    _order: Order,
    _homeOrder: HomeOrder,
    _report: Report,
    _notification: Notification,
    _message: Message,
    _wishlist: Wishlist,
    _aboutUs: AboutUs,
    _rewardsAndPromotions: RewardsAndPromotions,
    _payment: Payment
});

export default reducer;
