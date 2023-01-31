import React, { useEffect } from 'react';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import Stylist from './_part/Stylist';
function Index() {
    return (
        <div>
            <Header />
            <Stylist />
            <Footer />
        </div>
    );
}

export default Index;
