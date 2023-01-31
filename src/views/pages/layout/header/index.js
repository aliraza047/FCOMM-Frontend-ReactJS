import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../../../assets/images/home/logo.png';
import Search from '../../../../assets/images/home/search.svg';
import Cart from '../../../../assets/images/home/cart.svg';
import Admin from '../../../../assets/images/home/admin.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer, openDrawer } from 'redux/action/Customer.Action/Drawer';
const pages = ['Home', 'Stories', 'Shop', 'stylist'];
import Drawer from '@mui/material/Drawer';
import ShoppingCart from 'views/pages/Web/Shop/_part/ShoppingCart';
import { base_url } from 'utils/config';
import { logout } from 'redux/action/Auth';
import Popover from '@mui/material/Popover';
import { getSearchParm , getProductListing } from 'redux/action/Customer.Action/Product';
const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElSearch, setAnchorElSearch] = React.useState(null);
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { drawer_state } = useSelector((state) => state._drawer);
    const { isAuthenticated, user } = useSelector((state) => state._auth);
    const [activeCheck, setactiveCheck] = useState(localStorage.getItem('@active'));
    console.log('Drawer', user);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLocalStorage = (value) => {
        localStorage.setItem('@active', value);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClickSearch = (event) => {
        setAnchorElSearch(event.currentTarget);
    };
    
    const handleCloseSearch = () => {
        setAnchorElSearch(null);
    };

    const handleSearchProduct = () => {
        dispatch(getProductListing())
        dispatch(getSearchParm({data:searchValue}))
        setAnchorElSearch(null);
        navigate('/shop');
    }

    const handleLogout = async () => {
        dispatch(logout(navigate, true));
    };

    //     const [isHome, setHome] = useState(false);

    //     const toggleClassHome = () => {
    //       setHome(!isHome);
    //       console.log('heloo')
    //     };

    //     const [isStories, setStories] = useState(false);

    //   const toggleClassStories = () => {
    //     setStories(!isStories);
    //     console.log('heloo')
    //   };

    //   const [isShop, setShop] = useState(false);

    //   const toggleClassShop = () => {
    //     setShop(!isShop);
    //     console.log('heloo')
    //   };

    //   const [isStylist, setStylist] = useState(false);

    //   const toggleClassStylist = () => {
    //     setStylist(!isStylist);
    //     console.log('heloo')
    //   };
    // ;toggleClassHome();}} className={isHome ? 'active-nav': null

    const openSearch = Boolean(anchorElSearch);
    const idSearch = openSearch ? 'simple-popover' : undefined;

    return (
        <>
            <div className="headerMain">
                <div className="col-11 mx-auto">
                    <Navbar expand="lg">
                        <div className="col-lg-3">
                            <Navbar.Brand href="">
                                <img
                                    src={logo}
                                    onClick={() => {
                                        navigate('/');
                                    }}
                                    alt="logo"
                                />
                            </Navbar.Brand>
                        </div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                            <div className="col-lg-8">
                                <Nav className="justify-content-center">
                                    <Nav.Link
                                        className={
                                            localStorage.getItem('@active') === 'home' || !localStorage.getItem('@active') ? 'active' : ''
                                        }
                                        onClick={() => {
                                            navigate('/');
                                            handleLocalStorage('home');
                                        }}
                                    >
                                        Home
                                    </Nav.Link>
                                    <Nav.Link
                                        className={localStorage.getItem('@active') === 'about-us' ? 'active' : ''}
                                        onClick={() => {
                                            navigate('/about-us');
                                            handleLocalStorage('about-us');
                                        }}
                                    >
                                        About Us
                                    </Nav.Link>
                                    <Nav.Link
                                        className={localStorage.getItem('@active') === 'stories' ? 'active' : ''}
                                        onClick={() => {
                                            navigate('/stories');
                                            handleLocalStorage('stories');
                                        }}
                                    >
                                        Stories
                                    </Nav.Link>
                                    <Nav.Link
                                        className="megaMenuParent"
                                        className={localStorage.getItem('@active') === 'shop' ? 'active' : ''}
                                        onClick={() => {
                                            navigate('/shop');
                                            handleLocalStorage('shop');
                                        }}
                                    >
                                        Shop
                                        <div className="mega-menu">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-8 col-md-12 col-12">
                                                        <div className="row">
                                                            <div className="col-lg-2 col-md-4 col-4">
                                                                <div className="heading">
                                                                    <h5>Decorations</h5>
                                                                </div>
                                                                <div className="content contents ">
                                                                    <p>Mirrors</p>
                                                                    <p>Vases</p>
                                                                    <p>Frames</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-4 col-4">
                                                                <div className="heading">
                                                                    <h5>Seats</h5>
                                                                </div>
                                                                <div className="content contents ">
                                                                    <p>Sofa</p>
                                                                    <p>Lounge Chairs</p>
                                                                    <p>Dining Chair</p>
                                                                    <p>Study Chair</p>
                                                                    <p>Benches</p>
                                                                    <p>Stools</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-4 col-4">
                                                                <div className="heading">
                                                                    <h5>Tables</h5>
                                                                </div>
                                                                <div className="content contents ">
                                                                    <p>Coffee Table</p>
                                                                    <p>Bedside Table</p>
                                                                    <p>Dressing Table</p>
                                                                    <p>Study Table</p>
                                                                    <p>Dining Table</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-4 col-4">
                                                                <div className="heading">
                                                                    <h5>Storage & Organisation</h5>
                                                                </div>
                                                                <div className="content storage-contents ">
                                                                    <p>TV & Media</p>
                                                                    <p>Book Shelves</p>
                                                                    <p>Display Shelves</p>
                                                                    <p>Wardrobe</p>
                                                                    <p>Drawers</p>
                                                                    <p>Small Organisers</p>
                                                                    <p>Trolleys</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-4 col-4">
                                                                <div className="heading">
                                                                    <h5>Kids</h5>
                                                                </div>
                                                                <div className="content contents ">
                                                                    <p>Baby Cribs</p>
                                                                    <p>Nursery Dresser</p>
                                                                    <p>Kids Chairs</p>
                                                                    <p>Kids Table</p>
                                                                    <p>Kids Storage</p>
                                                                    <p>Kids Lighting</p>
                                                                    <p>Kids Decors</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-4 col-4">
                                                                <div className="heading">
                                                                    <h5>Lighting</h5>
                                                                </div>
                                                                <div className="content contents ">
                                                                    <p>Ceiling Lamp</p>
                                                                    <p>Wall Lights</p>
                                                                    <p>Table Lamp</p>
                                                                    <p>Standing Lamp</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 col-md-12 col-12">
                                                        <div className="heading">
                                                            <h5>New Products</h5>
                                                        </div>
                                                        <div className="content contents">
                                                            <div className="row">
                                                                <div className="col-md-6 px-0">
                                                                    <img
                                                                        src={
                                                                            'https://cdn.mos.cms.futurecdn.net/5x5XWmC4wEzQPrCRtydsYf-1200-80.jpg'
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="col-md-6 px-0">
                                                                    <img
                                                                        src={
                                                                            'https://cdn.mos.cms.futurecdn.net/5x5XWmC4wEzQPrCRtydsYf-1200-80.jpg'
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 px-0">
                                                                    <img
                                                                        src={
                                                                            'https://cdn.mos.cms.futurecdn.net/5x5XWmC4wEzQPrCRtydsYf-1200-80.jpg'
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="col-md-6 px-0">
                                                                    <img
                                                                        src={
                                                                            'https://cdn.mos.cms.futurecdn.net/5x5XWmC4wEzQPrCRtydsYf-1200-80.jpg'
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Nav.Link>
                                    {/* <NavDropdown title="Shop" id="basic-nav-dropdown" onClick={() => navigate('/shop')}>
                                    <NavDropdown.Item href="">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="">Separated link</NavDropdown.Item>
                                </NavDropdown> */}
                                    {/* <Nav.Link
                                        className={localStorage.getItem('@active') === 'stylist' ? 'active' : ''}
                                        onClick={() => {
                                            navigate('/stylist');
                                            handleLocalStorage('stylist');
                                        }}
                                    >
                                        Stylist
                                    </Nav.Link> */}
                                </Nav>
                            </div>
                            <div className="col-lg-4">
                                <div className="headerIcons justify-content-lg-end">
                                    <div className="d-flex align-items-center">
                                        <button  onClick={() => {
                                            navigate('/shop');
                                        }} class="btn shop-now">Shop Now</button>
                                        <img src={Search} alt="Search" onClick={(e) => handleClickSearch(e)} />
                                        <Popover
                                            id={idSearch}
                                            open={openSearch}
                                            anchorEl={anchorElSearch}
                                            onClose={handleCloseSearch}
                                            className="header-popover"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <div className="popover-box">
                                                <input 
                                                    type="text" 
                                                    class="input-search" 
                                                    placeholder="Type to Search..." 
                                                    onChange={(e) => setSearchValue(e.target.value)} 
                                                />

                                                <Button variant="contained" onClick={() => handleSearchProduct()}>
                                                    Search
                                                </Button>
                                            </div>
                                        </Popover>
                                        <img src={Cart} alt="Cart" style={{ cursor: 'pointer' }} onClick={() => dispatch(openDrawer())} />
                                        {isAuthenticated ? (
                                            <div className="profile-dropdown">
                                                <NavDropdown
                                                    eventKey={1}
                                                    title={
                                                        <img
                                                            className="thumbnail-image"
                                                            src={
                                                                user?.user?.profile?.includes('http')
                                                                    ? user?.user?.profile
                                                                    : base_url + user?.user?.profile
                                                            }
                                                            alt="user pic"
                                                        />
                                                    }
                                                    id="basic-nav-dropdown"
                                                >
                                                    <div className="triangle"></div>
                                                    <MenuItem onClick={() => navigate('/my-order', { state: '1' })}>My Account</MenuItem>
                                                    <MenuItem onClick={() => navigate('/favourite')}>Favourites</MenuItem>
                                                    <MenuItem onClick={() => navigate('/following')}>Following</MenuItem>
                                                    <MenuItem onClick={() => navigate('/my-order', { state: '1' })}>My Orders</MenuItem>
                                                    <MenuItem onClick={() => navigate('/my-order', { state: '3' })}>My Wallet</MenuItem>
                                                    {/* <MenuItem onClick={() => navigate('/visualization')}>Lifestyle</MenuItem> */}
                                                    {/* <MenuItem>FAQ's</MenuItem> */}
                                                    <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                                                </NavDropdown>
                                            </div>
                                        ) : (
                                            <img src={Admin} alt="Search" onClick={() => navigate('/auth')} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <Drawer anchor={'right'} onBackdropClick={() => dispatch(closeDrawer())} open={drawer_state}>
                    <ShoppingCart />
                </Drawer>
            </div>
        </>
    );
};
export default Header;
