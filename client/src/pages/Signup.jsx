import { useState } from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import {
	Typography,
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Link
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Signup() {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<AuthLayout
			bgImage='signup.jpg'
			bgHeading='Hello, Friend!👋'
			bgSubHeading='Enter your personal details to start your journey'
			formHeading='Sign Up'
			formSubHeading='Create an account to get started.'
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
					sx={{
						marginBottom: '1rem'
					}}
				/>
				<TextField
					label='Confirm password'
					id='confirmPassword'
					type='password'
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
						marginTop: '1rem',
						'&:hover': {
							opacity: 0.9
						}
					}}
				>
					Sign up
				</Button>
			</form>

			<Typography
				color='primary'
				variant='body2'
				component='p'
				align='center'
				sx={{
					marginTop: '5rem'
				}}
			>
				Already have an account?
				<Link
					href='/login'
					sx={{
						fontWeight: 'medium',
						marginLeft: '0.3rem'
					}}
				>
					Log In
				</Link>
			</Typography>
		</AuthLayout>
	);
}
