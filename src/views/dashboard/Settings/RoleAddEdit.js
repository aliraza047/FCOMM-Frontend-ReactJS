import React from 'react';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const RoleAddEdit = () => {
    const [alignment, setAlignment] = React.useState(false);

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

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className="row">
            <div className="roleaddedit">
                <div className="heading">
                    <h2>Settings - Roles - Add / Edit</h2>
                </div>
                <div className="col-md-6">
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Name
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="Write name..." />
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Typography className="label mt-4" variant="p" component="p">
                                Description
                            </Typography>
                            <TextareaAutosize
                                className="w-100 form-control"
                                aria-label="minimum height"
                                minRows={4}
                                placeholder="Write description..."
                                onChange={(e) => setdescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Is Active
                        </label>
                        <div className="col-lg-6 col-md-6">
                            <div className="approved">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="toggle">
                                        <ToggleButtonGroup color="primary" value={alignment} exclusive  onChange={handleAlignment}
        aria-label="text alignment">
                                            <ToggleButton value={true}>ON</ToggleButton>
                                            <ToggleButton value={false}>OFF</ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="input-field">
                            <label className="label" htmlFor="user-name">
                                Functions
                            </label>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox  />} label="Allow user to approve designers / manufactures" />
                                <FormControlLabel control={<Checkbox  />} label="Allow user to approve products" />
                                <FormControlLabel control={<Checkbox  />} label="Allow user to update orders" />
                                <FormControlLabel control={<Checkbox  />} label="Allow user to add / edit stories" />
                                <FormControlLabel control={<Checkbox  />} label="Allow users to add / edit promotions" />
                                <FormControlLabel control={<Checkbox  />} label="Allow user to add / edit users" />
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <div className="save-btn">
                    <Button variant="contained" className="savebtn">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RoleAddEdit;
