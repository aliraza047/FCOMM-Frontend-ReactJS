import jwt from 'jsonwebtoken';
import { avatar_url } from './config';
import moment from 'moment';
import { isArrayCheck } from 'views/utilities/common';
import makeToast from './Toaster';
import { jwt_secret } from 'utils/config';
export const AddInLocalStorage = (value) => {
    localStorage.setItem('@active', value);
};
export function isEmptyOrSpaces(str) {
    let EMPTY_REGEX = /^\s+$/;
    const Empty = EMPTY_REGEX.test(str);

    return str === null || str.match(/^ *$/) !== null || Empty;
}

export const countWords = (str) => {
    return str.trim().split(/\s+/).length;
};

export const formatedDate = (date) => {
    return moment(date).format('MMM DD YYYY');
};
export const formatedReportDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
};

export const formatedTime = (date) => {
    return moment(date).format('HH:MM:SS');
};
// "processToManufacture",
// "orderMakingDone",
// "shipped",
// "received",

export const orderStatusText = (data) => {
    if (data === 'unapproved') {
        return 'Order Placed';
    } else if (data === 'processToManufacture') {
        return 'Order Process to Manufacturer';
    } else if (data === 'orderMakingDone') {
        return 'Order Making Complete';
    } else if (data === 'pickupManufacture') {
        return 'Pick Up Manufacture';
    } else if (data === 'sentToCountry') {
        return 'Sent To Country';
    } else if (data === 'shipped') {
        return 'Order Shipped';
    } else if (data === 'received') {
        return 'Order Received';
    } else {
        return data;
    }
};

export function isValidUrl(string) {
    try {
        // new URL(string);
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return res !== null;
    } catch (_) {
        return false;
    }

    return true;
}

export function image_url(url) {
    if (url && url.includes('https')) {
        return url;
    } else {
        return avatar_url + url;
    }
}

export const addDefaultSrc = (ev) => {
    ev.target.src = 'https://www.w3schools.com/html/img_avatar.png';
};

export const console_log = (key = '', value) => {
    console.log(key + ' : ', value);
};

export const Log = (key = '', value) => {
    console.log(key + ' : ', value);
};

export const getColorForOrderStatus = (status) => {
    if (status === 'approved') {
        return '#9C5E00';
    } else if (status === 'shipped' || status === 'orderMakingDone' || status === 'processToManufacture') {
        return '#0C9C00';
    } else if (status === 'unapproved') {
        return '#9C2500';
    } else if (status === 'received') {
        return '#00809C';
    }
};

export const getAvgRating = (arr) => {
    let sum = 0;
    if (isArrayCheck(arr)) {
        arr.map((data) => {
            sum += Number(data?.rating);
        });
        return sum / arr?.length;
    }
    return 0;
};

export const getLatestDate = (arr) => {
    let date = 'No date';
    let arrRev = arr.reverse();
    console.log('Array Recverse', arrRev);
    if (isArrayCheck(arr)) {
        date = arrRev[0]?.created_at;
        return formatedDate(date);
    }
    return date;
};

export const getProductSoldQuantity = (arr, user) => {
    let sum = 0;
    if (isArrayCheck(arr)) {
        for (let i = 0; i < arr.length; i++) {
            Log('Loop i =>', arr[i]);
            arr[i]?.products?.map((data) => {
                Log('Loop Map =>', data);
                if (user === null) {
                    sum += Number(data?.quantity);
                } else {
                    if (data?.designer === user?.user?._id) {
                        sum += Number(data?.quantity);
                        Log('IF =>', sum, data);
                    }
                }
            });
        }
        return sum;
    }
    return 0;
};

export const getOrdersByStatus = (arr, status) => {
    let sum = 0;
    if (isArrayCheck(arr)) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]?.delivery?.status === status) {
                sum += 1;
            }
        }

        return sum;
    }
    return 0;
};

export const getAvgProfitDesigner = (arr) => {
    let sum = 0;
    if (isArrayCheck(arr)) {
        for (let i = 0; i < arr.length; i++) {
            Log('Loop i =>', arr[i]);
            for (let j = 0; j < arr[i]?.products?.length; j++) {
                Log('Loop J =>', arr[i]?.products[j]);
                if (arr[i]?.delivery?.status === 'received') {
                    // let shippingFee = Number(arr[i]?.products[j]?.shippingFee) > 0 ? Number(arr[i]?.products[j]?.shippingFee) : 0;
                    let shippingFee = 0;
                    let qty = Number(arr[i]?.products[j]?.quantity) > 0 ? Number(arr[i]?.products[j]?.quantity) : 1;
                    let designerPrice = Number(arr[i]?.products[j]?.designerPrice) > 0 ? Number(arr[i]?.products[j]?.designerPrice) : 0;
                    sum += qty * designerPrice;
                }
            }
        }
        return sum;
    }
    return 0;
};

export const getRevenueForProduct = (data) => {
    console.log(
        'Revenue',
        data?.name,
        Number(data?.makerPrice),
        Number(data?.totalPrice),
        Number(data?.shipping),
        Number(data?.saleCount),
        (Number(data?.makerPrice) + Number(data?.totalPrice)) * Number(data?.saleCount) + Number(data?.shipping) * Number(data?.saleCount)
    );
    return (
        (Number(data?.makerPrice) + Number(data?.totalPrice)) * Number(data?.saleCount) + Number(data?.shipping) * Number(data?.saleCount)
    );
};

export const getProfitForProduct = (data) => {
    console.log(
        'Profit',
        data?.name,
        Number(data?.makerPrice),
        Number(data?.totalPrice),
        Number(data?.shipping),
        Number(data?.saleCount),
        (Number(data?.makerPrice) + Number(data?.totalPrice)) * Number(data?.saleCount) +
            Number(data?.shipping) * Number(data?.saleCount) -
            Number(data?.makerPrice) * Number(data?.saleCount)
    );
    return (
        (Number(data?.makerPrice) + Number(data?.totalPrice) + Number(data?.shipping)) * Number(data?.saleCount) -
        (Number(data?.makerPrice) + Number(data?.shipping)) * Number(data?.saleCount)
    );
};

export const getCostForProduct = (data) => {
    console.log(
        'Cost',
        data?.name,
        Number(data?.makerPrice),
        Number(data?.shipping),
        Number(data?.saleCount),
        Number(data?.makerPrice) * Number(data?.saleCount) + Number(data?.shipping) * Number(data?.saleCount)
    );
    return Number(data?.makerPrice) * Number(data?.saleCount) + Number(data?.shipping) * Number(data?.saleCount);
};

// orderStutus: [
//     "unapproved",
//     "processToManufacture",
//     "orderMakingDone",
//     "shipped",
//     "received",
//     "cancelled",
//   ]
export const getOrderStatusText = (status) => {
    if (status === 'processToManufacture') {
        return 'Process To Manufacture';
    } else if (status === 'shipped') {
        return 'Shipped';
    } else if (status === 'received') {
        return 'Received';
    } else if (status === 'orderMakingDone') {
        return 'Order Making Done';
    } else if (status === 'cancelled') {
        return 'Cancelled';
    } else if (status === 'pickupManufacture') {
        return 'Pick Up Manufacture';
    } else if (status === 'delivered') {
        return 'Delivered';
    } else if (status === 'sentToCountry') {
        return 'Sent To Country';
    } else if (status === 'unapproved') {
        return 'Placed';
    } else {
        return status;
    }
};
export const addMethodArray = (arrayData, objectToAdd) => {
    let arr = arrayData ? arrayData : [];
    arr.push(objectToAdd);
    Log('Add Method ==>', arr);
    return arr;
};
export const removeMethodArray = (arrayData, objectToRemoved) => {
    console.log('objectToRemoved', objectToRemoved);
    console.log('arrayData', arrayData);
    let arr = arrayData ? arrayData : [];
    let arrfilter = arr?.filter((data) => data?._id != objectToRemoved?._id);
    Log('Remove Method Before==>', arrayData);
    Log('Remove Method After==>', arrfilter);

    return arrfilter;
};

export const removeMethodArray2 = (arrayData, objectToRemoved) => {
    console.log('objectToRemoved', objectToRemoved);
    console.log('arrayData', arrayData);
    let arr = arrayData ? arrayData : [];
    let arrfilter = arr?.filter((data) => data != objectToRemoved?._id);
    Log('Remove Method Before==>', arrayData);
    Log('Remove Method After==>', arrfilter);

    return arrfilter;
};
export const removeArrayShipping = (arrayData, objectToRemoved) => {
    let arr = arrayData ? arrayData : [];
    let arrfilter = arr?.filter((data) => data?.productId != objectToRemoved?.productId);
    Log('Remove Method Before==>', arrayData);
    Log('Remove Method After==>', arrfilter);

    return arrfilter;
};

export const removeMethodArrayForSlider = (arrayData, objectToRemoved) => {
    let arr = arrayData ? arrayData : [];
    arr = arr?.filter((data) => data?.image != objectToRemoved?.image);
    Log('Remove Method Before==>', arrayData);
    Log('Remove Method After==>', arr);

    return arr;
};

export const updateMethodArray = (arrayData, objectToUpdated, updatedValue) => {
    return arrayData.map((data) => (data?._id === objectToUpdated?._id ? { ...data, ...updatedValue } : data));
};

export const getTotalPriceForProducts = (products) => {
    let value = 0;
    let data =
        isArrayCheck(products) &&
        products?.map((x) => {
            value += Number(x.totalPrice);
        });
    return value;
};
export const getTotalOfPlainArray = (arr) => {
    let value = 0;
    let data =
        isArrayCheck(arr) &&
        arr?.map((x) => {
            value += Number(x);
        });
    return value;
};

export const getTotalPriceForSelectedProducts = (products) => {
    let value = 0;
    let data =
        isArrayCheck(products) &&
        products?.map((x) => {
            value += Number(x.total);
        });
    console.log('Redux Total Price', value);
    return value;
};
export const getTotalShippingForSelectedProducts = (products) => {
    let value = 0;
    let data =
        isArrayCheck(products) &&
        products?.map((x) => {
            value += Number(x.shippingCost);
        });
    console.log('Redux Total Shipping', value);
    return value;
};

export const checkValueInArray = (arr, keyValue, valueToBeChecked) => {
    return isArrayCheck(arr) && arr.find((data) => String(data[keyValue]) === String(valueToBeChecked));
};
export const checkValueInArrayCart = (arr, valueToBeChecked) => {
    return isArrayCheck(arr) && arr.find((data) => data?.productId?._id === valueToBeChecked);
};
export const getTotalPriceForProductsCheckout = (products) => {
    let value = 0;
    let data =
        isArrayCheck(products) &&
        products?.map((x) => {
            value += Number(x.price);
        });
    return value;
};

export const setPriceLocally = (value, type) => {
    const price = localStorage.getItem('@price');
    try {
        if (type === 'add') {
            localStorage.setItem('@price', Number(price) + Number(value));
        } else if (type === 'minus') {
            localStorage.setItem('@price', Number(price) - Number(value));
        } else {
            localStorage.setItem('@price', Number(value));
        }
    } catch (error) {
        Log('Error Add Price', error);
    }
};

export const getPriceLocally = () => {
    const price = localStorage.getItem('@price');
    if (price) {
        return price;
    } else {
        return 0;
    }
};

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
export const CheckEmail = (email) => {
    if (!validateEmail(email)) {
        makeToast('error', 'Email is not valid');
    }
    return true;
};

export const graphSeriesMethod = (data, selField) => {
    if (isArrayCheck(data)) {
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < data?.length; i++) {
            if (data[i]?._id?.month) {
                arr[data[i]?._id?.month - 1] = Math.round(data[i]?.[selField]);
            }
        }
        return arr;
    }
    return null;
};

export const getGraphSeriestotal = (arr) => {
    let value = 0;
    isArrayCheck(arr) &&
        arr?.map((x) => {
            value += Number(x);
        });
    return value;
};

export const getRecieverId = (arr, myId) => {
    console.log(arr, myId);
    if (isArrayCheck(arr)) {
        return arr.filter((x) => String(x) != String(myId))[0];
    }
    return null;
};

export const onlyUniqueArrayData = (value, index, self) => {
    return self.indexOf(value) === index;
};

export const downloadCSV = (array) => {
    console.log('downloadCSV', array);
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
};

export const convertArrayOfObjectsToCSV = (array) => {
    console.log('convertArrayOfObjectsToCSV array', array);
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);
    console.log('convertArrayOfObjectsToCSV array 2', keys);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
        let ctr = 0;
        keys.forEach((key) => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];

            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
};

export const getOrderExportdata = (arrayData, role) => {
    if (role == 'admin') {
        return (
            isArrayCheck(arrayData) &&
            arrayData?.map((data, id) => ({
                Order_Id: data?._id,
                Manufacturer: data?.products[0]?.manufacturer?.fullname,
                Buyer: data?.createdBy?.fullname,
                Designer_Price: data?.products[0]?.designerPrice,
                Cost_Price: data?.products[0]?.costPrice,
                Shipping: data?.shippingCost,
                Total_Price: Number(data?.totalAmount).toFixed(2),
                Status: getOrderStatusText(data?.delivery?.status),
                Created_Date: data?.created_at
            }))
        );
    } else if (role == 'designer') {
        return (
            isArrayCheck(arrayData) &&
            arrayData?.map((data, id) => ({
                Order_Id: data?._id,
                Manufacturer: data?.products[0]?.manufacturer?.fullname,
                Buyer_Name: data?.createdBy?.fullname,
                Designer_Price: data?.products[0]?.designerPrice,
                Status: getOrderStatusText(data?.delivery?.status),
                Created_Date: data?.created_at
            }))
        );
    } else if (role == 'manufacturer') {
        return (
            isArrayCheck(arrayData) &&
            arrayData?.map((data, id) => ({
                Order_Id: data?._id,
                Manufacturer: data?.products[0]?.manufacturer?.fullname,
                Buyer_Name: data?.createdBy?.fullname,
                Cost_Price: data?.products[0]?.costPrice,
                Status: getOrderStatusText(data?.delivery?.status),
                Created_Date: data?.created_at
            }))
        );
    } else if (role == 'logistic') {
        return (
            isArrayCheck(arrayData) &&
            arrayData?.map((data, id) => ({
                Order_Id: data?._id,
                Manufacturer: data?.products[0]?.manufacturer?.fullname,
                Manufacturer_Address:
                    data?.products[0]?.manufacturer?.myAddresses[0]?.country +
                    ' ' +
                    data?.products[0]?.manufacturer?.myAddresses[0]?.state +
                    ' ' +
                    data?.products[0]?.manufacturer?.myAddresses[0]?.city +
                    ' ' +
                    data?.products[0]?.manufacturer?.address,
                Buyer: data?.createdBy?.fullname,
                Buyer_Address:
                    data?.billingAddress?.houseNo +
                    ' ' +
                    data?.billingAddress?.poBoxNo +
                    ' ' +
                    data?.billingAddress?.state +
                    ' ' +
                    data?.billingAddress?.streetNo,
                Shipping: data?.shippingCost,
                Status: getOrderStatusText(data?.delivery?.status),
                Created_Date: data?.created_at
            }))
        );
    }
};

export const getRandomIdForkanva = () => {
    return 'Id' + Math.floor(Math.random() * 99999);
};

export const checkProtectSite = () => {
    const token = localStorage.getItem('tokenProtectSite');

    if (token !== undefined && token !== null && token !== '') {
        return jwt.verify(token, jwt_secret ? jwt_secret : 'xxxxxx', function (err, token_decoded) {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
    }

    return false;
};

export const getTotalShipping = (data) => {
    const arrShipping = isArrayCheck(data) ? data : [];
    const dt = arrShipping.map((dat) => dat?.shippingFee);
    let value = 0;
    isArrayCheck(dt) &&
        dt?.map((x) => {
            value += Number(x);
        });
    return value;
};

export const getProductShippingFee = (productShipping, productId) => {
    if (isArrayCheck(productShipping)) {
        return productShipping?.find((ship) => ship?.productId === productId);
    }
};

export const getOrderShippingFee = (shipping, data) => {
    if (!shipping || !data) {
        return 0;
    }

    console.log('getOrderShippingFee', shipping, data);
    var total = shipping;
    for (let i = 0; i < data.length; i++) {
        total += shipping * (data[i]?.shipping ? Number(data[i]?.shipping) / 100 : 1 / 100);
        total = total * (data[i].qty ? data[i].qty : 1);
    }
    return Number(total).toFixed(2);
};

export const getProductDilveryObj = (productShipping, productId) => {
    console.log('getProductShippingFee', productShipping);
    if (isArrayCheck(productShipping)) {
        const filtData = productShipping?.find((ship) => ship?.productId === productId);
        console.log('kk', filtData);
        const resData = {
            name: filtData?.responseShipping?.productName,
            price: filtData?.responseShipping?.totalPrice[0]?.price,
            typeCode: filtData?.responseShipping?.deliveryCapabilities?.deliveryTypeCode,
            estimateDateTime: filtData?.responseShipping?.deliveryCapabilities?.estimatedDeliveryDateAndTime
        };
        return resData;
    }
};

export const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const getPerValue = (total, perAmount) => {
    const result = (perAmount * total) / 100;
    return result.toFixed(2);
};
