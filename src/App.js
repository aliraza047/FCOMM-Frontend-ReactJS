import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import 'pure-react-carousel/dist/react-carousel.es.css';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import "video-react/dist/video-react.css";
// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useDispatch } from 'react-redux';
import { checkAuth } from 'redux/action/Auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom";
import { checkCart } from 'redux/action/Customer.Action/Cart';
import { getSetting } from 'redux/action/Setting';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const { setting } = useSelector((state) => state._setting);
    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loadScript = (data) => {
        const script = document.createElement('script');

        script.src = data;
        script.async = true;
        script.type = "text/jsx";

        document.body.appendChild(script);
    };
    useEffect(() => {
        dispatch(checkAuth(null));
        dispatch(getSetting());

        localStorage.setItem('@active', '');
        localStorage.setItem('@menu', '');
        // window.addEventListener('beforeunload', (ev) => {
        //     ev.preventDefault();
        // dispatch(checkCart());
        // return (ev.return Value = 'Are you sure you want to close?');
        // });
    }, []);
    // useEffect(() => {
    //     const script = document.createElement('script');

    //     script.src = 'https://widget.manychat.com/109634858349134.js';
    //     script.async = true;

    //     document.body.appendChild(script);

    //     // return () => {
    //     //     document.body.removeChild(script);
    //     // };
    // }, []);

    // useEffect(() => {
    //     const script = document.createElement('script');

    //     script.src = 'https://mccdn.me/assets/js/widget.js';
    //     script.async = true;

    //     document.body.appendChild(script);

    //     // return () => {
    //     //     document.body.removeChild(script);
    //     // };
    // }, []);

    // tracking code
    useEffect(() => {
        (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
        var user = localStorage.getItem("user");
        var parseuser = user ? JSON.parse(user) : null;
    
        vgo('setAccount', '68208632');
        vgo('setTrackByDefault', true);
        if (parseuser) {
            vgo("setEmail", parseuser.email);
        }
    
        vgo('process');
    }, [location]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes setting={setting} />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
