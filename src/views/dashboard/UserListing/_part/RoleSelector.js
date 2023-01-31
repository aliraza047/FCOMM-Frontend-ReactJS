import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { getNativeSelectUtilityClasses } from '@mui/material';

const names = ['admin', 'user', 'designer', 'manufacturer', 'logistic'];
const names2 = ['designer', 'manufacturer'];
const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};
export default function RoleSelector({ setrole, role, register = false }) {
    console.log('Selector', role);
    const [personName, setPersonName] = React.useState(role);
    const [arrRole, setarrRole] = React.useState(register ? names2 : names);
    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        console.log('selector role',value)
        setrole(typeof value === 'string' ? value.split(',') : value);
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
        console.log('Change', value);
        setrole(value);
    };

    return (
        <div>
            {!register ? (
                <FormControl sx={{ width: '100%' }}>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        displayEmpty
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (arrRole?.length === 0) {
                                return <em>Placeholder</em>;
                            }

                            return selected.join(', ');
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem disabled value="">
                            <em>Select</em>
                        </MenuItem>
                        {arrRole.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                <FormControl>
                    {/* <InputLabel id="demo-multiple-checkbox-label">Role</InputLabel> */}
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        displayEmpty
                        value={personName}
                        input={<OutlinedInput />}
                        onChange={handleChange}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Role</em>;
                            }

                            return selected.join(', ');
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem disabled value="">
                            <em>Select</em>
                        </MenuItem>
                        {names2.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </div>
    );
}
