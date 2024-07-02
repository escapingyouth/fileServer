import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from '../../contexts/SnackbarContext';
import {
	Box,
	CircularProgress,
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	Stack,
	Link
} from '@mui/material';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');

	const navigate = useNavigate();
	const { forgotPassword, loading, submitted, setSubmitted } = useAuth();
	const { showSnackbar } = useSnackbar();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		if (!email) {
			showSnackbar('Please fill out the email field', 'error');
			return;
		}
		await forgotPassword(email);
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
						Forgot Password
					</Typography>
					<Typography variant='body1' color='textSecondary'>
						Enter your email below to reset your password.
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
								label='Email'
								name='email'
								id='email'
								variant='outlined'
								color='primary'
								type='email'
								fullWidth
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								error={submitted && !email}
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
									'Submit'
								)}
							</Button>
						</CardContent>
						<CardContent>
							<Link
								onClick={() => navigate('/auth/login')}
								sx={{
									fontWeight: 'medium',
									marginLeft: '0.3rem',
									cursor: 'pointer'
								}}
							>
								Back to Login
							</Link>
						</CardContent>
					</Card>
				</form>
			</Box>
		</Stack>
	);
}
