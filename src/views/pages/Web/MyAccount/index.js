import React, { useEffect } from 'react';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import AccounSettings from '../MyAccount/AccounSettings';

function index() {
    return (
        <div>
            <Header />
            <AccounSettings/>
            <Footer />
        </div>
    );
}

export default index;
