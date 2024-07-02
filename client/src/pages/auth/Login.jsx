import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from '../../contexts/SnackbarContext';
import AuthLayout from '../../components/layouts/AuthLayout';
import {
	Box,
	Typography,
	TextField,
	InputAdornment,
	IconButton,
	CircularProgress,
	Button,
	Link
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [showPassword, setShowPassword] = useState(false);

	const { login, loading, submitted, setSubmitted } = useAuth();
	const { showSnackbar } = useSnackbar();

	const navigate = useNavigate();

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		if (!email || !password) {
			showSnackbar('Please fill out all required fields.', 'error');
			return;
		}

		await login(email, password);
	};

	return (
		<AuthLayout
			bgImage='login.jpg'
			bgHeading='Welcome Back!✨'
			bgSubHeading='Enter your details to access your files 📁'
			formHeading='Log In'
			formSubHeading='Welcome back! Sign in to your account.'
		>
			<form autoComplete='off' noValidate onSubmit={handleSubmit}>
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
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={submitted && !email}
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
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={submitted && !password}
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
					disabled={loading}
				>
					{loading ? (
						<CircularProgress size={25} sx={{ color: '#fff' }} disableShrink />
					) : (
						'Log in'
					)}
				</Button>
			</form>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end'
				}}
			>
				<Link
					color='#5C677D'
					onClick={() => navigate('/auth/forgot-password')}
					variant='body2'
					underline='hover'
					sx={{
						cursor: 'pointer'
					}}
				>
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
					onClick={() => navigate('/auth/signup')}
					sx={{
						fontWeight: 'medium',
						marginLeft: '0.3rem',
						cursor: 'pointer'
					}}
				>
					Sign Up
				</Link>
			</Typography>
		</AuthLayout>
	);
}
