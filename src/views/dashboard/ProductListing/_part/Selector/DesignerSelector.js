import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from 'redux/action/User';
import { isArrayCheck } from 'views/utilities/common';

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

const names = ['Designer', 'Designer1', 'Designer2', 'Designer3'];

export default function DesignerSelector({ setdesigner, designer }) {
    const [personName, setPersonName] = React.useState(designer);
    const { all_users } = useSelector((state) => state._user);

    const handleChange = (event) => {
        let arr = [];
        const {
            target: { value }
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
        setdesigner(value);
    };

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    return (
        <div>
            <FormControl sx={{ mt: 1, width: '100%' }}>
                {/* <InputLabel id="demo-multiple-checkbox-label">designer</InputLabel> */}
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {isArrayCheck(all_users) &&
                        all_users.map((data) => (
                            <MenuItem key={data?._id} value={data?._id}>
                                <Checkbox checked={personName.indexOf(data?._id) > -1} />
                                <ListItemText primary={data?.username || data?.fullname} />
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    );
}
