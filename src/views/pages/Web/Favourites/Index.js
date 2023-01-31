import React, { useEffect } from 'react';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import FavouriteTabs from './_part/FavouriteTabs';
function Index() {
    return (
        <div>
            <Header />
            <FavouriteTabs/>
            <Footer />
        </div>
    );
}

export default Index;
