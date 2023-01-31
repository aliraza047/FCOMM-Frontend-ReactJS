import React from 'react';

function HeaderDetailPopup() {
    return (
        <thead>
            <tr>
                <th scope="col">Product</th>
                <th style={{width: "200px"}} scope="col">Product Name</th>
                {/* <th scope="col">Description</th> */}
                {/* <th scope="col">Notes</th> */}
                {/* <th scope="col">Designer Name</th> */}
                <th scope="col">Quantity</th>
                <th scope="col">Size(l,b,h) cm</th>
                <th scope="col">Weight (kg)</th>
                <th scope="col">Color</th>
                <th scope="col">Price</th>
                <th scope="col">Cost Price</th>
                <th scope="col">Total Price</th>
                <th scope="col">SKU</th>
            </tr>
        </thead>
    );
}

export default HeaderDetailPopup;
