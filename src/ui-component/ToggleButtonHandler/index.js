import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import { Switch } from '@mui/material';

export default function ToggleButtonHandler({ selected, setSelected }) {
    return <Switch checked={selected} onChange={(e) => setSelected(e.target.checked)} name="sdm" size="small" />;
}
