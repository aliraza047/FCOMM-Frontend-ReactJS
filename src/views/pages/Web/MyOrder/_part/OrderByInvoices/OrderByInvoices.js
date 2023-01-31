import React, { useEffect, useState } from 'react';
import { base_url_new } from 'utils/config';
import { isArrayCheck } from 'views/utilities/common';
import MyOrders from '../Tabs/MyOrder';

function OrderByInvoices({ invoice, all_orders_data }) {
    const [priceTotal, setpriceTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [discountCost, setDiscountCost] = useState(0);
    useEffect(() => {
        if (invoice) {
            let data = all_orders_data.filter((data) => data?.payment?.invoiceId === invoice);
            console.log('ggg', data)
            setDiscountCost(data[0]?.discount)
            setShippingCost(data?.reduce(function (acc, obj) { return Number(acc) + Number(obj.shippingCost); }, 0))

            data = data?.map((val) => val.totalAmount);
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum += Number(data[i]);
            }
            setpriceTotal(sum);
        }
    }, [invoice]);
    
    return (
        <>
            <div className="d-flex border-bottom mb-3 align-items-center justify-content-between">
                <h5 className="mb-1">Invoice Number</h5>
                <h5 className="mb-1">{invoice ? invoice?.split('ch_')[1] : ''}</h5>
            </div>
            {isArrayCheck(all_orders_data) &&
                all_orders_data?.map((data, id) => 
                    data?.payment?.invoiceId === invoice ? (
                        data?.products?.map((product, productIdx) => (
                            <div key={productIdx}>
                                <div className="row mb-4">
                                    <div className="col-lg-3 col-md-3 order-img">
                                        <img
                                            src={
                                                isArrayCheck(product.productId?.productImage)
                                                    ? base_url_new + product.productId?.productImage[0]?.url
                                                    : 'data:image/jpeg;base64,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'
                                            }
                                        />
                                    </div>
                                    <MyOrders data={data} productIdx={productIdx} lastIndex={productIdx === data?.products.length - 1} />
                                </div>
                            </div>
                        ))
                    ) : null
                )}
            <div className="shipping-free">
                <p>Shipping: ${shippingCost}</p>
                <p>Discount: ${discountCost}</p>
                <div className="d-flex align-items-center justify-content-end">
                    <p className="mb-0">Total: </p>
                    <h5 className="mb-0">{` $${priceTotal}`}</h5>
                </div>
            </div>
        </>
    );
}

export default OrderByInvoices;
