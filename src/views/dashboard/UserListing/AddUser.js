// project imports
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { addUser } from 'redux/action/User';
import { useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import RoleSelector from './_part/RoleSelector';
const AddUserNew = () => {
    const [isLoading, setLoading] = useState(true);
    const [userName, setuserName] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [role, setrole] = useState([]);
    const [phone, setphone] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(false);
    }, []);
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setrole(event.target.value);
    };
    const [alignment, setAlignment] = useState(0);

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

    const addNewUser = () => {
        if (userName && lastName && email && password && role) {
            dispatch(
                addUser(
                    {
                        username: userName,
                        password: password,
                        role: role,
                        fullname: lastName,
                        email: email,
                        phone_number: phone,
                        approve: alignment,
                        first_name: userName
                    },
                    navigate
                )
            );
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };
    return (
        <>
            <div className="add-thread">
                <h2>Add User</h2>
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="user-name">User Name</label>
                            <input
                                type="text"
                                className="form-control "
                                value={userName}
                                name="user-name"
                                onChange={(e) => setuserName(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                className="form-control "
                                value={firstName}
                                name="first-name"
                                onChange={(e) => setfirstName(e.target.value)}
                            />
                        </div>
                    </div> */}
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="first-name">Full Name</label>
                            <input
                                type="text"
                                className="form-control "
                                value={lastName}
                                name="first-name"
                                onChange={(e) => setlastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="phone-number">Phone Number</label>
                            <input
                                type="number"
                                className="form-control "
                                value={phone}
                                name="phone-number"
                                onChange={(e) => setphone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control "
                                value={email}
                                name="email"
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="password" value={password}>
                                Password
                            </label>
                            <input className="form-control " name="password" onChange={(e) => setpassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        {' '}
                        <div className="input-field search-fields">
                            <span>Role</span>
                            {/* <Select value={role} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value={'admin'}>Admin</MenuItem>
                                <MenuItem value={'designer'}>Designer</MenuItem>
                                <MenuItem value={'manufacturer'}>Manufacturer</MenuItem>
                            </Select> */}
                            <RoleSelector role={role} setrole={setrole} />
                        </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-6">
                        <div className="approved">
                            <div className="d-flex align-items-center justify-content-between">
                                <h3>Approved</h3>
                                <div className="toggle">
                                    <ToggleButtonGroup color="primary" value={alignment} exclusive  onChange={handleAlignment}
        aria-label="text alignment">
                                        <ToggleButton value={1}>Yes</ToggleButton>
                                        <ToggleButton value={0}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="d-flex justify-content-center my-5">
                    <div className="btn btn-primary brownBtn" onClick={addNewUser}>
                        Add User
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUserNew;
