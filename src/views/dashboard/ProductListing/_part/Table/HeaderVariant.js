import React from 'react';

function HeaderVariant() {
    return (
        <thead>
            <tr>
                <th>
                    {/* <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="product" />
                    </div> */}
                </th>
                <th scope="col">Product</th>
                <th scope="col">Name</th>
                <th scope="col">size</th>
                <th scope="col">color</th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
                <th scope="col">SKU</th>
                <th scope="col"></th>
            </tr>
        </thead>
    );
}

export default HeaderVariant;
