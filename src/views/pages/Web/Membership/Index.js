import React, { useEffect } from 'react';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import MyMembership from './_part/MyMembership';
function Index() {
    return (
        <div>
            <Header />
            <MyMembership/>
            <Footer />
        </div>
    );
}

export default Index;
