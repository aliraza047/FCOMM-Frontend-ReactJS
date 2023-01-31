import moment from 'moment';

export const columns = [
    // {
    //     id: 0,
    //     name: 'ID',
    //     width: '50px',
    //     selector: (row) => row.id,
    //     sortable: true,
    //     reorder: true,
    //     center: true
    // },
    {
        id: 0,
        name: 'Image',
        selector: (row) => row.image,
        sortable: true,
        reorder: true,
        center: true
    },

    {
        id: 1,
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Gender',
        selector: (row) => row.gender,
        sortable: true,
        center: true,
        reorder: true
    },
    {
        id: 3,
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
        center: true,
        reorder: true,
        width: '200px'
    },
    // {
    //     id: 5,
    //     name: 'Role',
    //     selector: (row) => row.role,
    //     sortable: true,
    //     center: true,
    //     reorder: true,
    //     width: '100px'
    // },
    // {
    //     id: 6,
    //     name: 'Approve',
    //     selector: (row) => row.approve,
    //     sortable: true,
    //     center: true,
    //     reorder: true,
    //     width: '100px'
    // },
    {
        id: 4,
        name: 'Action',
        selector: (row) => row.action,
        sortable: true,
        center: true,
        reorder: true,
        width: '350px'
    }
];

export const columns1 = [
    {
        id: 0,
        name: 'Min Price',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Max Price',
        selector: (row) => row.gender,
        sortable: true,
        center: true,
        reorder: true
    },

    {
        id: 4,
        name: 'Action',
        selector: (row) => row.action,
        sortable: true,
        center: true,
        reorder: true,
        width: '350px'
    }
];

export const column_product_listing_admin = [
    {
        id: 0,
        name: 'Product',
        selector: (row) => row.image,
        sortable: true,
        reorder: true,
        center: true,
        width: '200px'
    },
    {
        id: 1,
        name: 'Stock',
        selector: (row) => row.stock,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 2,
        name: 'Price',
        selector: (row) => row.totalPrice,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 3,
        name: 'SKU',
        selector: (row) => row.sku,
        sortable: true,
        center: true,
        reorder: true,
        width: '100px'
    },

    {
        id: 4,
        name: 'Action',
        selector: (row) => row.action,
        width: '380px',
        center: true
    }
];
export const column_product_listing = [
    {
        id: 0,
        name: 'Product',
        selector: (row) => row.image,
        sortable: true,
        reorder: true,
        center: true,
        width: '200px'
    },
    {
        id: 1,
        name: 'Stock',
        selector: (row) => row.stock,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 2,
        name: 'Price',
        selector: (row) => row.totalPrice,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 3,
        name: 'SKU',
        selector: (row) => row.sku,
        sortable: true,
        center: true,
        reorder: true,
        width: '100px'
    },
    {
        id: 4,
        name: 'Active',
        selector: (row) => row.isActive,
        width: '100px',
        reorder: true,
        center: true
    },
    {
        id: 5,
        name: 'Action',
        selector: (row) => row.action,
        width: '250px',
        center: true
    }
];
export const column_product_listing_unapproved = [
    {
        id: 0,
        name: 'Product',
        selector: (row) => row.image,
        sortable: true,
        reorder: true,
        center: true,
        width: '200px'
    },
    {
        id: 1,
        name: 'Stock',
        selector: (row) => row.stock,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 2,
        name: 'Price',
        selector: (row) => row.totalPrice,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 3,
        name: 'SKU',
        selector: (row) => row.sku,
        sortable: true,
        center: true,
        reorder: true,
        width: '100px'
    },
    {
        id: 4,
        name: 'Status',
        selector: (row) => row.status,
        width: '100px',
        reorder: true,
        center: true
    },
    {
        id: 5,
        name: 'Action',
        selector: (row) => row.action,
        width: '250px',
        center: true
    }
];
export const column_product_manufecturer_listing = [
    {
        id: 0,
        name: 'Product',
        selector: (row) => row.image,
        sortable: true,
        reorder: true,
        center: true,
        width: '200px'
    },
    {
        id: 1,
        name: 'Designer',
        selector: (row) => row.designer,
        sortable: true,
        reorder: true,
        center: true,
        width: '120px'
    },
    {
        id: 2,
        name: 'Stock',
        selector: (row) => row.stock,
        sortable: true,
        reorder: true,
        center: true,
        width: '120px'
    },
    {
        id: 3,
        name: 'SKU',
        selector: (row) => row.sku,
        sortable: true,
        center: true,
        reorder: true,
        width: '120px'
    },
    {
        id: 4,
        name: 'Price',
        selector: (row) => row.designerPrice,
        sortable: true,
        reorder: true,
        center: true,
        width: '120px'
    },
    {
        id: 5,
        name: 'Cost Price',
        selector: (row) => row.makerPrice,
        sortable: true,
        center: true,
        reorder: true,
        width: '120px'
    },
    {
        id: 6,
        name: 'Total Price',
        selector: (row) => row.totalPrice,
        sortable: true,
        center: true,
        reorder: true,
        width: '120px'
    },
    {
        id: 7,
        name: 'Action',
        selector: (row) => row.action,
        width: '250px',
        center: true
    }
];
export const column_information_display = [
    {
        id: 0,
        name: 'Image',
        selector: (row) => row.image,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 1,
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 2,
        name: 'Gender',
        selector: (row) => row.gender,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 3,
        name: 'Action',
        selector: (row) => row.action,
        width: '380px',
        center: true
    }
];
export const column_settings_roles = [
    {
        id: 0,
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 1,
        name: 'Description',
        selector: (row) => row.desscription,
        sortable: true,
        reorder: true,
        center: true,
        width: '250px'
    },
    {
        id: 2,
        name: 'Action',
        selector: (row) => row.action,
        width: '150px',
        center: true
    }
];
export const column_variation_listing = [
    {
        id: 0,
        name: 'Product',
        selector: (row) => row.image,
        sortable: true,
        reorder: true,
        center: true,
        width: '100px'
    },
    {
        id: 1,
        name: 'Size',
        selector: (row) => row.size,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Color',
        selector: (row) => row.color,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Stock',
        selector: (row) => row.stock,
        sortable: true,
        center: true,
        reorder: true
    },
    {
        id: 4,
        name: 'Price',
        selector: (row) => row.price,
        sortable: true,
        center: true,
        reorder: true
    },
    {
        id: 5,
        name: 'Cost Price',
        selector: (row) => row.makerPrice,
        sortable: true,
        center: true,
        reorder: true,
        width: '120px'
    },
    {
        id: 6,
        name: 'Total Price',
        selector: (row) => row.totalPrice,
        sortable: true,
        center: true,
        reorder: true,
        width: '120px'
    },
    {
        id: 7,
        name: 'SKU',
        selector: (row) => row.sku,
        sortable: true,
        center: true,
        reorder: true
    }
];
export const column_variation_manufecturer_listing = [
    {
        id: 0,
        name: 'Product',
        selector: (row) => row.image,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 1,
        name: 'Size',
        selector: (row) => row.size,
        sortable: true,
        reorder: true,
        center: true,
        width: '100px'
    },
    {
        id: 2,
        name: 'Color',
        selector: (row) => row.color,
        sortable: true,
        reorder: true,
        center: true,
        width: '100px'
    },
    {
        id: 3,
        name: 'Stock',
        selector: (row) => row.stock,
        sortable: true,
        reorder: true,
        center: true,
        width: '100px'
    },
    {
        id: 4,
        name: 'Price',
        selector: (row) => row.makerPrice,
        sortable: true,
        reorder: true,
        center: true,
        width: '100px'
    },
    {
        id: 5,
        name: 'Cost Price',
        selector: (row) => row.makerPrice,
        sortable: true,
        center: true,
        reorder: true,
        width: '150px'
    },
    {
        id: 6,
        name: 'Total Price',
        selector: (row) => row.makerPrice,
        sortable: true,
        center: true,
        reorder: true,
        width: '150px'
    },
    {
        id: 7,
        name: 'SKU',
        selector: (row) => row.sku,
        sortable: true,
        center: true,
        reorder: true,
        width: '100px'
    }
];
export const BlogColumns = [
    {
        id: 0,
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 1,
        name: 'Description',
        selector: (row) => row.description,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    // {
    //     id: 2,
    //     name: 'Start Time',
    //     selector: (row) => row.starttime,
    //     sortable: true,
    //     center: true,
    //     reorder: true,
    //     width: '150px'
    // },
    // {
    //     id: 3,
    //     name: 'End Time',
    //     selector: (row) => row.endtime,
    //     sortable: true,
    //     center: true,
    //     reorder: true,
    //     width: '150px'
    // },
    {
        id: 2,
        name: 'Status',
        selector: (row) => row.status,
        sortable: true,
        center: true,
        reorder: true,
        width: '120px'
    },
    {
        id: 3,
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
        center: true,
        reorder: true,
        width: '180px'
    },
    {
        id: 3,
        name: 'Created By',
        selector: (row) => row.createdBy,
        sortable: true,
        center: true,
        reorder: true,
        width: '180px'
    },
    {
        id: 4,
        name: 'Action',
        selector: (row) => row.action,
        sortable: true,
        center: true,
        reorder: true,
        width: '300px'
    }
];

export const BlogColumns2 = [
    {
        id: 0,
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 1,
        name: 'Description',
        selector: (row) => row.description,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    // {
    //     id: 2,
    //     name: 'Start Time',
    //     selector: (row) => row.starttime,
    //     sortable: true,
    //     center: true,
    //     reorder: true,
    //     width: '150px'
    // },
    // {
    //     id: 3,
    //     name: 'End Time',
    //     selector: (row) => row.endtime,
    //     sortable: true,
    //     center: true,
    //     reorder: true,
    //     width: '150px'
    // },
    {
        id: 2,
        name: 'Status',
        selector: (row) => row.status,
        sortable: true,
        center: true,
        reorder: true,
        width: '120px'
    },
    {
        id: 4,
        name: 'Action',
        selector: (row) => row.action,
        sortable: true,
        center: true,
        reorder: true,
        width: '300px'
    }
];

export const RequestPaymentColumn = [
    // {
    //     id: 0,
    //     name: 'id',
    //     selector: (row) => row.id,
    //     sortable: true,
    //     reorder: true,
    //     center: true,
    //     width: '100px'
    // },
    {
        id: 1,
        name: 'Request Amount',
        selector: (row) => row.RequestAmount,
        // sortable: true,
        // reorder: true,
        center: true,
        width: '150px'
    },
    // {
    //     id: 2,
    //     name: 'Start Time',
    //     selector: (row) => row.starttime,
    //     sortable: true,
    //     center: true,
    //     reorder: true,
    //     width: '150px'
    // },
    {
        id: 2,
        name: 'Remarks',
        selector: (row) => row.remarks,
        // sortable: true,
        center: true,
        // reorder: true,
        width: '150px'
    },
    {
        id: 4,
        name: 'Role',
        selector: (row) => row.role,
        // sortable: true,
        center: true,
        // reorder: true,
        width: '120px'
    },
    {
        id: 5,
        name: 'Created At',
        selector: (row) => (row.created_at ? moment(row.created_at).format('DD/MM/YYYY') : ''),
        // sortable: true,
        // reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 3,
        name: 'Status',
        selector: (row) => row.status,
        // sortable: true,
        center: true,
        // reorder: true,
        width: '120px'
    },
    {
        id: 6,
        name: 'Action',
        selector: (row) => row.action,
        // sortable: true,
        center: true,
        // reorder: true,
        width: '300px'
    }
];

export const HistoryPaymentColumn = [
    {
        id: 1,
        name: 'Transfer Date',
        selector: (row) => moment(row.transferDate).format('DD-MM-YYYY') + ' ' + moment(row.created_at).format('HH:MM:SS'),
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 2,
        name: 'Transfer Account No',
        selector: (row) => row.transferAccountNo,
        sortable: true,
        center: true,
        reorder: true,
        width: '150px'
    },
    {
        id: 3,
        name: 'Transfer Amount',
        selector: (row) => row.transferAmount,
        sortable: true,
        center: true,
        reorder: true,
        width: '150px'
    },
    {
        id: 4,
        name: 'Currency',
        selector: (row) => row.currency,
        sortable: true,
        center: true,
        reorder: true,
        width: '120px'
    },
    {
        id: 5,
        name: 'Remarks',
        selector: (row) => row.remarks,
        sortable: true,
        center: true,
        reorder: true,
        width: '120px'
    },
    {
        id: 6,
        name: 'Images/Proof',
        selector: (row) => row.proof,
        sortable: true,
        center: true,
        reorder: true,
        width: '120px'
    }
];

export const RewardsPromotionsColumns = [
    {
        id: 0,
        name: 'Code',
        selector: (row) => row.code,
        sortable: true,
        reorder: true,
        center: true,
        width: '100px'
    },
    {
        id: 1,
        name: 'Discount Type',
        selector: (row) => row.discountType,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 2,
        name: 'Discount Value',
        selector: (row) => row.discountValue,
        sortable: true,
        center: true,
        reorder: true,
        width: '150px'
    },
    {
        id: 3,
        name: 'Total Usage Limit',
        selector: (row) => row.usageTotalLimit,
        sortable: true,
        center: true,
        reorder: true,
        width: '180px'
    },
    {
        id: 4,
        name: 'CreatedBy',
        selector: (row) => row.name,
        sortable: true,
        center: true,
        reorder: true,
        width: '180px'
    },
    {
        id: 5,
        name: 'Action',
        selector: (row) => row.action,
        sortable: true,
        center: true,
        reorder: true,
        width: '300px'
    }
];

export const RewardsTrackingColumn = [
    {
        id: 0,
        name: 'Code',
        selector: (row) => row.code,
        sortable: true,
        reorder: true,
        center: true,
        width: '100px'
    },
    {
        id: 1,
        name: 'Discount Type',
        selector: (row) => row.discountType,
        sortable: true,
        reorder: true,
        center: true,
        width: '150px'
    },
    {
        id: 2,
        name: 'Discount Value',
        selector: (row) => row.discountValue,
        sortable: true,
        center: true,
        reorder: true,
        width: '150px'
    },
    {
        id: 3,
        name: 'Used By',
        selector: (row) => row.useBy,
        sortable: true,
        center: true,
        reorder: true,
        width: '180px'
    },
    {
        id: 4,
        name: 'Used Date',
        selector: (row) => (row.useDate ? moment(row.useDate).format('DD-MM-YYYY HH:MM:SS') : ''),
        sortable: true,
        center: true,
        reorder: true,
        width: '180px'
    },
    {
        id: 5,
        name: 'Order Id',
        selector: (row) => row.orderId,
        sortable: true,
        center: true,
        reorder: true,
        width: '180px'
    },
    {
        id: 6,
        name: 'Action',
        selector: (row) => row.action,
        sortable: true,
        center: true,
        reorder: true,
        width: '180px'
    }
];

export const column_category_listing = [
    {
        id: 0,
        name: 'ID',
        width: '50px',
        selector: (row) => row.id,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Image',
        selector: (row) => row.image,
        sortable: true,
        reorder: true,
        center: true
    },

    {
        id: 3,
        name: 'Description',
        selector: (row) => row.description,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Featured',
        selector: (row) => row.featured,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 5,
        name: 'Action',
        selector: (row) => row.action,
        sortable: true,
        reorder: true,
        width: '300px',
        center: true
    }
];

export const column_orders_listing = [
    {
        id: 'index',
        name: 'No',
        width: '50px',
        selector: (row) => row.id,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 0,
        name: 'Order ID',
        width: '120px',
        selector: (row) => row?._id?.substring(0, 10),
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Manufacturer',
        width: '150px',
        selector: (row) => row.manufacturer,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Total Price',
        width: '150px',
        selector: (row) => row.price,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Buyer Name',
        width: '150px',
        selector: (row) => row.buyer,
        sortable: true,
        reorder: true,
        center: true
    },
    // {
    //     id: 4,
    //     name: 'Buyer Address',
    //     width: '150px',
    //     selector: (row) => row.buyerAddress,
    //     sortable: true,
    //     reorder: true,
    //     center: true
    // },
    {
        id: 5,
        name: 'Status Order',
        width: '150px',
        selector: (row) => row.status,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 'created',
        name: 'Created Date',
        selector: (row) => (row.created_at ? moment(row.created_at).format('DD-MM-YYYY HH:MM:SS') : ''),
        width: '150px',
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 6,
        name: 'Actions',
        width: '200px',
        selector: (row) => row.action,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_orders_listing_manufacture = [
    {
        id: 'index',
        name: 'No',
        width: '50px',
        selector: (row) => row.id,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 0,
        name: 'Order ID',
        width: '120px',
        selector: (row) => row?._id?.substring(0, 10),
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Manufacturer',
        width: '150px',
        selector: (row) => row.manufacturer,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Buyer Name',
        width: '150px',
        selector: (row) => row.buyer,
        sortable: true,
        reorder: true,
        center: true
    },
    // {
    //     id: 4,
    //     name: 'Buyer Address',
    //     width: '150px',
    //     selector: (row) => row.buyerAddress,
    //     sortable: true,
    //     reorder: true,
    //     center: true
    // },
    {
        id: 5,
        name: 'Status Order',
        width: '150px',
        selector: (row) => row.status,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 5,
        name: 'Cost Price',
        width: '150px',
        selector: (row) => row.costPrice,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 'created',
        name: 'Created Date',
        selector: (row) => (row.created_at ? moment(row.created_at).format('DD-MM-YYYY HH:MM:SS') : ''),
        width: '150px',
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 6,
        name: 'Actions',
        width: '200px',
        selector: (row) => row.action,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_orders_listing_logistic = [
    {
        id: 'index',
        name: 'No',
        width: '50px',
        selector: (row) => row.id,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 0,
        name: 'Order ID',
        width: '120px',
        selector: (row) => row?._id?.substring(0, 10),
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Manufacturer',
        width: '150px',
        selector: (row) => row.manufacturer,
        sortable: true,
        reorder: true,
        center: true
    },
    // {
    //     id: 2,
    //     name: 'Manufacturer Address',
    //     width: '250px',
    //     selector: (row) => row.manufacturerAddress,
    //     sortable: true,
    //     reorder: true,
    //     center: true
    // },
    {
        id: 3,
        name: 'Buyer Name',
        width: '150px',
        selector: (row) => row.buyer,
        sortable: true,
        reorder: true,
        center: true
    },
    // {
    //     id: 4,
    //     name: 'Delivery Address',
    //     width: '250px',
    //     selector: (row) => row.buyerAddress,
    //     sortable: true,
    //     reorder: true,
    //     center: true
    // },
    {
        id: 5,
        name: 'Shipping',
        width: '150px',
        selector: (row) => row.shipping,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 7,
        name: 'Status Order',
        width: '250px',
        selector: (row) => row.status,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 'created',
        name: 'Created Date',
        selector: (row) => (row.created_at ? moment(row.created_at).format('DD-MM-YYYY HH:MM:SS') : ''),
        width: '150px',
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 6,
        name: 'Actions',
        width: '350px',
        selector: (row) => row.action,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_delivery_status = [
    {
        id: 0,
        name: 'ID',
        width: '120px',
        selector: (row) => row.id,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 0,
        name: 'Status',
        width: '220px',
        selector: (row) => row.status,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Actions',
        width: '320px',
        selector: (row) => row.action,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_buyer_review_listing = [
    {
        id: 0,
        name: 'Product',
        width: '200px',
        selector: (row) => row.product,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Rating',
        width: '200px',
        selector: (row) => row.rating,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Average',
        width: '150px',
        selector: (row) => row.average,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Date Added',
        width: '150px',
        selector: (row) => row.date,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Actions',
        width: '200px',
        selector: (row) => row.action,
        sortable: true,
        reorder: true,
        center: true
    }
];
export const column_Product_review_listing = [
    {
        id: 0,
        name: 'Buyer',
        width: '100px',
        selector: (row) => row.buyer,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Name',
        width: '150px',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Review Note',
        width: '200px',
        selector: (row) => row.reviewNote,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Reply Note',
        width: '200px',
        selector: (row) => row.replyNote,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Rating',
        width: '150px',
        selector: (row) => row.rating,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 5,
        name: 'Average',
        width: '150px',
        selector: (row) => row.average,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 6,
        name: 'Review Date',
        width: '150px',
        selector: (row) => row.date,
        sortable: true,
        reorder: true,
        center: true
    }
    // {
    //     id: 7,
    //     name: 'Actions',
    //     width: '150px',
    //     selector: (row) => row.action,
    //     sortable: true,
    //     reorder: true,
    //     center: true
    // }
];

export const column_orders_listing_Designer = [
    {
        id: 'index',
        name: 'No',
        width: '50px',
        selector: (row) => row.id,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 0,
        name: 'Order ID',
        width: '120px',
        selector: (row) => row?._id?.substring(0, 10),
        sortable: true,
        reorder: true,
        center: true
    },
    // {
    //     id: 1,
    //     name: 'Total Price',
    //     width: '150px',
    //     selector: (row) => row.price,
    //     sortable: true,
    //     reorder: true,
    //     center: true
    // },
    {
        id: 2,
        name: 'Manufaturer',
        width: '150px',
        selector: (row) => row.manufacturer,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Buyer Name',
        width: '150px',
        selector: (row) => row.buyer,
        sortable: true,
        reorder: true,
        center: true
    },
    // {
    //     id: 4,
    //     name: 'Buyer Address',
    //     width: '150px',
    //     selector: (row) => row.buyerAddress,
    //     sortable: true,
    //     reorder: true,
    //     center: true
    // },
    {
        id: 5,
        name: 'Status Order',
        width: '150px',
        selector: (row) => row.status,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 0,
        name: 'Designer Price',
        width: '180px',
        selector: (row) => row?.designerPrice,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 'created',
        name: 'Created Date',
        selector: (row) => (row.created_at ? moment(row.created_at).format('DD-MM-YYYY HH:MM:SS') : ''),
        width: '150px',
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 6,
        name: 'Actions',
        width: '200px',
        selector: (row) => row.action,
        sortable: true,
        reorder: true,
        center: true
    }
];
export const column_user_orders_listing = [
    {
        id: 0,
        name: 'Order ID',
        width: '120px',
        selector: (row) => row.id,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Total Price',
        width: '120px',
        selector: (row) => row.price,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Manufaturer',
        width: '150px',
        selector: (row) => row.manufaturer,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Buyer Name',
        width: '150px',
        selector: (row) => row.buyer,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Buyer Address',
        width: '150px',
        selector: (row) => row.buyerAddress,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 5,
        name: 'Status Order',
        width: '150px',
        selector: (row) => row.status,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 6,
        name: 'Actions',
        width: '150px',
        selector: (row) => row.action,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_designer_report_profit = [
    {
        id: 0,
        name: 'Designer Name',
        width: '200px',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Country',
        width: '120px',
        selector: (row) => row.country,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Contact No.',
        width: '150px',
        selector: (row) => row.phone,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Email',
        width: '150px',
        selector: (row) => row.email,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Profit',
        width: '150px',
        selector: (row) => row.profit,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_designer_report_complete = [
    {
        id: 0,
        name: 'Designer Name',
        width: '200px',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Country',
        width: '120px',
        selector: (row) => row.country,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Contact No.',
        width: '150px',
        selector: (row) => row.phone,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Email',
        width: '150px',
        selector: (row) => row.email,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Completed Orders',
        width: '200px',
        selector: (row) => row.complete,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_designer_report_cancel = [
    {
        id: 0,
        name: 'Designer Name',
        width: '200px',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Country',
        width: '120px',
        selector: (row) => row.country,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Contact No.',
        width: '150px',
        selector: (row) => row.phone,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Email',
        width: '150px',
        selector: (row) => row.email,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Cancel Orders',
        width: '200px',
        selector: (row) => row.cancel,
        sortable: true,
        reorder: true,
        center: true
    }
];
export const column_designer_report_product_sold = [
    {
        id: 0,
        name: 'Designer Name',
        width: '200px',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Country',
        width: '120px',
        selector: (row) => row.country,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Contact No.',
        width: '150px',
        selector: (row) => row.phone,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Email',
        width: '150px',
        selector: (row) => row.email,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Product Sold',
        width: '150px',
        selector: (row) => row.productSold,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_product_report_profit = [
    {
        id: 0,
        name: 'Product Name',
        width: '200px',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Designer Name',
        width: '120px',
        selector: (row) => row.designer,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Country',
        width: '120px',
        selector: (row) => row.country,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Contact No.',
        width: '150px',
        selector: (row) => row.phone,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Email',
        width: '150px',
        selector: (row) => row.email,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 5,
        name: 'Average Profit',
        width: '150px',
        selector: (row) => row.profit,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_product_report_revenue = [
    {
        id: 0,
        name: 'Product Name',
        width: '200px',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Designer Name',
        width: '120px',
        selector: (row) => row.designer,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Country',
        width: '120px',
        selector: (row) => row.country,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Contact No.',
        width: '150px',
        selector: (row) => row.phone,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Email',
        width: '150px',
        selector: (row) => row.email,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 5,
        name: 'Revenue',
        width: '150px',
        selector: (row) => row.revenue,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_product_report_cost = [
    {
        id: 0,
        name: 'Product Name',
        width: '200px',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Designer Name',
        width: '120px',
        selector: (row) => row.designer,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Country',
        width: '120px',
        selector: (row) => row.country,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Contact No.',
        width: '150px',
        selector: (row) => row.phone,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Email',
        width: '150px',
        selector: (row) => row.email,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 5,
        name: 'Cost',
        width: '150px',
        selector: (row) => row.cost,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_payment_designer = [
    {
        id: 0,
        name: 'Designer Name',
        width: '150px',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Country',
        width: '120px',
        selector: (row) => row.country,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Email',
        width: '150px',
        selector: (row) => row.email,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 5,
        name: 'Paid Amount',
        width: '150px',
        selector: (row) => row.paidAmount,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Credit Amount',
        width: '150px',
        selector: (row) => row.creditAmount,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 6,
        name: 'Total Amount',
        width: '150px',
        selector: (row) => row.totalAmount,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 7,
        name: 'Actions',
        width: '150px',
        selector: (row) => row.action,
        sortable: true,
        reorder: true,
        center: true
    }
];

export const column_approval_payments = [
    {
        id: 0,
        name: 'Name',
        width: '150px',
        selector: (row) => row.name,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 1,
        name: 'Type',
        width: '150px',
        selector: (row) => row.type,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 2,
        name: 'Email',
        width: '120px',
        selector: (row) => row.email,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 3,
        name: 'Request Amount',
        width: '150px',
        selector: (row) => row.RequestAmount,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 5,
        name: 'Date',
        width: '150px',
        selector: (row) => (row.date ? moment(row.date).format('DD-MM-YYYY') : ''),
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 4,
        name: 'Status',
        width: '150px',
        selector: (row) => row.status,
        sortable: true,
        reorder: true,
        center: true
    },
    {
        id: 6,
        name: 'Actions',
        width: '280px',
        selector: (row) => row.action,
        sortable: true,
        reorder: true,
        center: true
    }
];
