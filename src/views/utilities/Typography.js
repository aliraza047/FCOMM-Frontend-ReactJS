// project imports
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
const Typography = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const [alignment, setAlignment] = useState('web');

    const [devices, setDevices] = React.useState(() => ['phone']);

    const handleAlignment = (event, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
    };
  
    const handleDevices = (event, newDevices) => {
      if (newDevices.length) {
        setDevices(newDevices);
      }
    };
    return (
        <>
            <div className="add-thread">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="input-field">
                            <label htmlFor="user-name">User Name</label>
                            <input type="text" className="form-control " name="user-name" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control " name="password" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="first-name">First Name</label>
                            <input type="text" className="form-control " name="first-name" />
                        </div>
                        <div className="input-field search-fields">
                            <span>Role</span>
                            <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control " name="email" />
                        </div>
                        <div className="input-field">
                            <label htmlFor="phone-number">Phone Number</label>
                            <input type="number" className="form-control " name="phone-number" />
                        </div>
                        <div className="approved">
                            <div className="d-flex align-items-center justify-content-between">
                                <h3>Approved</h3>
                                <div className="toggle">
                                    <ToggleButtonGroup color="primary" value={alignment} exclusive  onChange={handleAlignment}
        aria-label="text alignment">
                                        <ToggleButton value="web">Yes</ToggleButton>
                                        <ToggleButton value="android">No</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center my-5">
                            <div className="btn btn-primary">Add User</div>
                        </div>
                    </div>
                    <div className="col-lg-6"></div>
                </div>
            </div>
        </>
    );
};

export default Typography;
