import { ButtonGroup, ToggleButton } from '@mui/material';
import React, { useEffect } from 'react';

function DesignerProductTabs({ radios, handleRadio, radioValue }) {
    useEffect(() => {
        return () => {
            handleRadio('');
        };
    }, []);
    return (
        <div className="list-orders">
            <div className="tabs-btn">
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => handleRadio(e)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    );
}

export default DesignerProductTabs;
