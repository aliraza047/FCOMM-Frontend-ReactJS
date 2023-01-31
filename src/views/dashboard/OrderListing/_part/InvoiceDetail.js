import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from 'react-bootstrap';
import { isArrayCheck } from 'views/utilities/common';

const InvoiceDetail = ({ data, handleClose }) => {
    console.log('Order Details ===>', data);
    const createPDF = async () => {
        const pdf = new jsPDF('portrait', 'pt', 'a4');
        const data = await html2canvas(document.querySelector('#pdf'));
        const img = data.toDataURL('image/png');
        const imgProperties = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('shipping_label.pdf');
    };
    return (
        <>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12 ">
                <div className="shipping">
                    <div id="pdf">
                        <div
                            style={{
                                padding: '5px',
                                border: '1px solid gray',
                                margin: '10px'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div
                                    style={{
                                        width: '49%',
                                        border: '1px solid gray',
                                        marginBottom: '5px',
                                        padding: '5px'
                                    }}
                                >
                                    <h6
                                        style={{
                                            marginBottom: '5px',
                                            paddingTop: '5px',
                                            paddingBottom: '5px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold',
                                            borderBottom: '1px solid gray'
                                        }}
                                    >
                                        Shipper Information
                                    </h6>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Name
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px'
                                        }}
                                    >
                                        {data?.createdBy?.fullname}
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Address
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px'
                                        }}
                                    >
                                        {data?.billingAddress?.state + data?.createdBy?.country}
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Postal Code
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px'
                                        }}
                                    >
                                        {data?.billingAddress?.poBoxNo}
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Country
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px'
                                        }}
                                    >
                                        {data?.createdBy?.country}
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Contact No
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px'
                                        }}
                                    >
                                        {data?.createdBy?.phone_number}
                                    </p>
                                </div>
                                <div
                                    style={{
                                        width: '49%',
                                        border: '1px solid gray',
                                        marginBottom: '5px',
                                        padding: '5px'
                                    }}
                                >
                                    <h6
                                        style={{
                                            marginBottom: '5px',
                                            paddingTop: '5px',
                                            paddingBottom: '5px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold',
                                            borderBottom: '1px solid gray'
                                        }}
                                    >
                                        Shipping Information
                                    </h6>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Name
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px'
                                        }}
                                    >
                                        {data?.products[0]?.manufacturer?.fullname}
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Address
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px'
                                        }}
                                    >
                                        {data?.products[0]?.manufacturer?.state + data?.products[0]?.manufacturer?.country}
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Postal Code
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px'
                                        }}
                                    >
                                        {data?.products[0]?.manufacturer?.postalCode}
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Country
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px'
                                        }}
                                    >
                                        {data?.products[0]?.manufacturer?.country}
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Contact No
                                    </p>
                                    <p
                                        style={{
                                            margin: '0px',
                                            paddingLeft: '2px'
                                        }}
                                    >
                                        {data?.products[0]?.manufacturer?.phone_number}
                                    </p>
                                </div>
                            </div>
                            <table style={{ border: '1px solid gray' }}>
                                <tr style={{ border: '1px solid gray' }}>
                                    <th style={{ border: '1px solid gray', padding: '10px' }}>Order ID</th>
                                    <th style={{ border: '1px solid gray', padding: '10px' }}>Product</th>
                                    <th style={{ border: '1px solid gray', padding: '10px' }}>Quantity</th>
                                    <th style={{ border: '1px solid gray', padding: '10px' }}>Size(cm)</th>
                                    <th style={{ border: '1px solid gray', padding: '10px' }}>Weight</th>
                                    <th style={{ border: '1px solid gray', padding: '10px' }}>Shipping</th>
                                    <th style={{ border: '1px solid gray', padding: '10px' }}>Shipping Fee</th>
                                </tr>
                                {isArrayCheck(data?.products) &&
                                    data?.products?.map((prod) => (
                                        <tr style={{ border: '1px solid gray' }}>
                                            <td style={{ border: '1px solid gray', padding: '10px' }}>{data?._id}</td>
                                            <td style={{ border: '1px solid gray', padding: '10px' }}>{prod?.productId?.name}</td>
                                            <td style={{ border: '1px solid gray', padding: '10px' }}>{prod?.quantity}</td>
                                            <td style={{ border: '1px solid gray', padding: '10px' }}>
                                                {prod?.productId?.length + ',' + prod?.productId?.breadth + ',' + prod?.productId?.height}
                                            </td>
                                            <td style={{ border: '1px solid gray', padding: '10px' }}>{prod?.productId?.weight}</td>
                                            <td style={{ border: '1px solid gray', padding: '10px' }}>
                                                {isArrayCheck(prod?.responseDHL) && prod?.responseDHL[0]?.responseShipping?.productName}
                                            </td>
                                            <td style={{ border: '1px solid gray', padding: '10px' }}>
                                                {isArrayCheck(prod?.responseDHL) && prod?.responseDHL[0]?.shippingFee}
                                            </td>
                                        </tr>
                                    ))}
                            </table>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            onClick={handleClose}
                            className="btn text-white px-5 mx-2"
                            style={{ backgroundColor: '#8c5d2f' }}
                            type="button"
                        >
                            Cancel
                        </button>

                        <button onClick={createPDF} className="btn text-white px-5" style={{ backgroundColor: '#8c5d2f' }} type="button">
                            Download
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InvoiceDetail;
