import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import { IconInfoCircle } from '@tabler/icons';

const TooltipAddProduct = ({ text, ...props }) => {
    return (
        <Tooltip
            title={
                <div className="tooltipStyle">
                    <ul>
                        <h5>Creation Product Flow:</h5>
                        <li>1. Designer create product</li>
                        <li>2. Waiting for admin approval</li>
                        <li>3. Last approval from designer before listing out</li>
                    </ul>
                </div>
            }
        >
            <div {...props}>
                <span style={{ marginRight: '5px' }}>{text}</span>
                <IconInfoCircle style={{ position: 'relative', top: '1px', cursor: 'pointer' }} />
            </div>
        </Tooltip>
    );
};

TooltipAddProduct.propTypes = {
    text: PropTypes.string,
    responseShipping: PropTypes.object
};

TooltipAddProduct.defaultProps = {
    text: false,
    responseShipping: null
};

export default TooltipAddProduct;
