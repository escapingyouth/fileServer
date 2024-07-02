import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from '../../contexts/SnackbarContext';
import {
	Box,
	CircularProgress,
	Card,
	CardContent,
	Typography,
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Stack
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function ResetPassword() {
	const { token } = useParams();

	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const { resetPassword, loading, submitted, setSubmitted } = useAuth();
	const { showSnackbar } = useSnackbar();

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		if (!password || !passwordConfirm) {
			showSnackbar('Please fill out all the fields', 'error');
			return;
		}
		await resetPassword(token, password, passwordConfirm);
	};
	return (
		<Stack
			direction='row'
			justifyContent='center'
			alignItems='center'
			sx={{
				height: '100dvh'
			}}
		>
			<Box>
				<Box style={{ textAlign: 'center', marginBottom: 20 }}>
					<Typography
						variant='h4'
						component='h1'
						fontWeight='600'
						color='primary'
						sx={{
							mb: '0.50rem',
							fontSize: '1.7rem'
						}}
					>
						Reset Password
					</Typography>
					<Typography variant='body1' color='textSecondary'>
						Fill the form below to reset your password.
					</Typography>
				</Box>
				<form autoComplete='off' noValidate onSubmit={handleSubmit}>
					<Card
						sx={{
							py: 4
						}}
					>
						<CardContent sx={{ mb: 0, py: 0 }}>
							<TextField
								label='New Password'
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
						</CardContent>
						<CardContent sx={{ mb: 0, py: 0 }}>
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
						</CardContent>
						<CardContent sx={{ mb: 0, py: 0 }}>
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
									<CircularProgress
										size={25}
										sx={{ color: '#fff' }}
										disableShrink
									/>
								) : (
									'Reset Password'
								)}
							</Button>
						</CardContent>
					</Card>
				</form>
			</Box>
		</Stack>
	);
}
