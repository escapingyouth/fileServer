import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from '../../contexts/SnackbarContext';
import AuthLayout from '../../components/layouts/AuthLayout';
import {
	Typography,
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Link,
	CircularProgress
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const { signup, submitted, setSubmitted, loading } = useAuth();
	const { showSnackbar } = useSnackbar();
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		if (!name || !email || !password || !passwordConfirm) {
			showSnackbar('Please fill out all required fields.', 'error');
			return;
		}

		await signup(name, email, password, passwordConfirm);
	};

	return (
		<AuthLayout
			bgImage='signup.jpg'
			bgHeading='Hello, File Explorer! 🗂️'
			bgSubHeading='Enter your personal details to start your journey'
			formHeading='Sign Up'
			formSubHeading='Create an account to get started.'
		>
			<form autoComplete='off' noValidate onSubmit={handleSubmit}>
				<TextField
					label='Name'
					name='name'
					id='name'
					variant='outlined'
					color='primary'
					type='text'
					fullWidth
					required
					sx={{
						marginBottom: '1rem'
					}}
					value={name}
					onChange={(e) => setName(e.target.value)}
					error={submitted && !name}
				/>
				<TextField
					label='Email'
					name='email'
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
					name='password'
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
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error={submitted && !password}
				/>
				<TextField
					label='Confirm password'
					id='passwordConfirm'
					name='passwordConfirm'
					type='password'
					fullWidth
					required
					value={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
					error={submitted && !passwordConfirm}
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
					disabled={loading}
				>
					{loading ? (
						<CircularProgress size={25} sx={{ color: '#fff' }} disableShrink />
					) : (
						'Sign up'
					)}
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
					onClick={() => navigate('/auth/login')}
					sx={{
						fontWeight: 'medium',
						marginLeft: '0.3rem',
						cursor: 'pointer'
					}}
				>
					Log In
				</Link>
			</Typography>
		</AuthLayout>
	);
}
