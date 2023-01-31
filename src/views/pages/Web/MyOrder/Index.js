import React, { useEffect } from 'react';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import MyOrders from './_part/MyOrders';
function Index() {
    return (
        <div>
            <Header />
            <MyOrders/>
            <Footer />
        </div>
    );
}

export default Index;
