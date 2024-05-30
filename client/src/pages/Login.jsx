import { useState } from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import {
	Box,
	Typography,
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Link
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<AuthLayout
			bgImage='login.jpg'
			bgHeading='Welcome Back!🎉'
			bgSubHeading='Enter your personal details to continue your journey'
			formHeading='Log In'
			formSubHeading='Welcome back! Sign in to your account.'
		>
			<form action='' noValidate>
				<TextField
					label='Email'
					id='email'
					variant='outlined'
					color='primary'
					type='email'
					fullWidth
					required
					sx={{
						marginBottom: '1rem'
					}}
				/>
				<TextField
					label='Password'
					id='password'
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									color='primary'
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge='end'
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						)
					}}
					type={showPassword ? 'text' : 'password'}
					fullWidth
					required
				/>
				<Button
					type='submit'
					color='primary'
					variant='contained'
					fullWidth
					sx={{
						textTransform: 'capitalize',
						paddingY: '0.8rem ',
						marginY: '1rem',
						'&:hover': {
							opacity: 0.9
						}
					}}
				>
					Log in
				</Button>
			</form>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end'
				}}
			>
				<Link color='#5C677D' href='#' variant='body2' underline='hover'>
					Forgot password?
				</Link>
			</Box>

			<Typography
				color='primary'
				variant='body2'
				component='p'
				align='center'
				sx={{
					marginTop: '5rem'
				}}
			>
				Don&apos;t have an account?
				<Link
					href='/signup'
					sx={{
						fontWeight: 'medium',
						marginLeft: '0.3rem'
					}}
				>
					Sign Up
				</Link>
			</Typography>
		</AuthLayout>
	);
}
