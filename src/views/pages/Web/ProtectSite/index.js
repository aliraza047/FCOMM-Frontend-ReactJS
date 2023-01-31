import React, { useState } from 'react';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { loginProtectSite } from 'redux/action/Auth';

const BackgroundBox = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	filter: blur(5px);
`;

const StyledFakeBg = styled.div`
	background-image: none !important;
`;

const StyledBox = styled.div`
	min-width: 350px;
	z-index: 100;
	background: rgba(203,175,150,.9686274509803922);
	padding: 30px;

	p {
		font-family: quigley!important;
		font-size: 32px;
    	text-align: center;
		color: white;
		margin-bottom: 0px;
	}

	> div {
		display: block;
		width: 100%;
	}

	.MuiInputBase-formControl {
		width: 100%;
	}

	button, button:hover {
		width: 100%;
		background: #8c5d2f;
		box-shadow: none;
		color: #fff;
		margin-bottom: 10px;
		font-family: Mulish-SemiBold!important;
		margin-top: 30px;
	}

	.MuiInputLabel-root,
	.MuiInputLabel-root.Mui-focused {
		font-family: Mulish-SemiBold!important;
		color: #8c5d2f!important;
	}
	.MuiInputLabel-root.Mui-focused {
		font-size: 18px;
	}
	.MuiInput-root:after {
		border-color: #8c5d2f!important;
	}
`;

function ProtectSite() {
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		loginProtectSite({password: password});
	}

    return (
        <div>
			<BackgroundBox className="login-register" />

			<StyledFakeBg className="login-register">
				<StyledBox>
					<p>Protected Password</p>

					<TextField
						id="standard-basic"
						label="Password"
						variant="standard"
						type={'password'}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button className="login-register-btn" onClick={() => handleLogin()}>
						Login
					</Button>
				</StyledBox>
			</StyledFakeBg>
        </div>
    );
}

export default ProtectSite;
