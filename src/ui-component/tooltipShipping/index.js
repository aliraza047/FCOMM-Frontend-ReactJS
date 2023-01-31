import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import { IconInfoCircle } from '@tabler/icons';

const TooltipShipping = ({ 
	text,
	markupShipping,
	qty,
	responseShipping,
	...props
}) => {
	const renderTooltipEl = () => {
		if (!responseShipping) {
			return "";
		}

		let detailBreakdown = [];
		let subtotal = 0;

		if (responseShipping?.detailedPriceBreakdown.length > 0) {
			responseShipping?.detailedPriceBreakdown[0].breakdown.map((breakdown) => {
				subtotal += breakdown.price;
				detailBreakdown.push({
					name: breakdown.name,
					value: `$${breakdown.price}`
				})
			});
			
			detailBreakdown.push({
				name: "Subtotal",
				value: `$${subtotal.toFixed(2)}`,
				fwbold: true
			})
		}

		detailBreakdown.push({
			name: "Markup Shipping",
			value: `${markupShipping}%`
		})

		detailBreakdown.push({
			name: "Result Markup",
			value: `$${(subtotal + (subtotal * Number(markupShipping) / 100))?.toFixed(2)}`,
			fwbold: true
		})

		detailBreakdown.push({
			name: "Quantity Product",
			value: `${qty}`
		})

		detailBreakdown.push({
			name: "Total",
			value: text,
			fwbold: true
		});

		return (
			<div className="tooltip-ship">
				{
					detailBreakdown.map((item) => (
						<div style={{fontWeight: `${item.fwbold ? "bold" : "normal"}`}}>
							<span>{item.name}</span>
							<span>{item.value}</span>
						</div>
					))
				}
			</div>
		)
	}

	return (
		responseShipping ? (
			<Tooltip title={renderTooltipEl()}>
				<div {...props}>
					<span style={{marginRight: "5px"}}>
						{text}
					</span>
					<IconInfoCircle style={{position: "relative", top: "-3px"}} />
				</div>
			</Tooltip>
		) : (
			text
		)
	);
}

TooltipShipping.propTypes = {
  text: PropTypes.string,
  responseShipping: PropTypes.object,
};

TooltipShipping.defaultProps = {
  text: false,
  responseShipping: null,
};


export default TooltipShipping;
