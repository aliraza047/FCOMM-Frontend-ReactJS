import React , {useEffect}from 'react';
import { AddInLocalStorage } from 'utils/helper';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import AboutUs from './_part/AboutUs'

function index() {
    useEffect(() => {
        AddInLocalStorage("about-us")
    }, []);
    return (
        <div>
            <Header />
            <AboutUs/>
            <Footer />
        </div>
    );
}

export default index;
