import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import card4 from '../../../../../assets/images/home/card4.PNG';

function VariationCard({ data, setVisibleModal, setsingleData }) {
    return (
        <div className="variationCard">
            <div>
                <img src={card4} alt="" />
            </div>
            <div>Name : {data?.sku}</div>
            <div>Sku : {data?.sku}</div>
            <div>Email : {data?.sku}</div>
            <div>Address : {data?.sku}</div>
            <div
                className="btn btn-primary brownBtn"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setsingleData(data);
                    setVisibleModal(true);
                }}
            >
                Update
            </div>
        </div>
    );
}

export default VariationCard;
