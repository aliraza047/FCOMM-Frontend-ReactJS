// project imports
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { addUser, editUser, removeUser } from 'redux/action/User';
import { useLocation, useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import RoleSelector from './_part/RoleSelector';

const UserDetail = () => {
    const { state } = useLocation();
    const [isLoading, setLoading] = useState(true);
    const [userName, setuserName] = useState(state.username);
    const [firstName, setfirstName] = useState(state.first_name);
    const [lastName, setlastName] = useState(state.fullname);
    const [role, setrole] = useState(state.role);
    const [phone, setphone] = useState(state.phone_number);
    const [alignment, setAlignment] = useState(state.approve ? 1 : 0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(false);
    }, []);

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

    const updateUser = () => {
        if (userName && role && lastName) {
            dispatch(
                editUser(
                    {
                        id: state._id,
                        username: userName,
                        fullname: lastName,
                        role: role,
                        phone_number: phone,
                        approve: alignment
                    },
                    null,
                    navigate
                )
            );
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };

    const deleteUser = () => {
        dispatch(removeUser({ id: state._id }, navigate));
    };
    return (
        <>
            <div className="add-thread">
                <h2>User Detail</h2>
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
                        <div className="input-field search-fields">
                            <span>Role</span>
                            <RoleSelector role={role} setrole={setrole} />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
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
                    </div>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <div className="btn btn-primary brownBtn" onClick={updateUser}>
                        Update User
                    </div>
                    <div className="btn btn-primary brownBtn" onClick={deleteUser}>
                        Remove User
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDetail;
