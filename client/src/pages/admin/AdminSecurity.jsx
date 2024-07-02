import { useState } from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Typography,
	TextField,
	Button,
	Container,
	CircularProgress,
	Box,
	InputAdornment,
	IconButton
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import PageLayout from '../../components/layouts/PageLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from '../../contexts/SnackbarContext';

export default function AdminSecurity() {
	const { updateMyPassword, deleteMe, loading, submitted, setSubmitted } =
		useAuth();
	const { showSnackbar } = useSnackbar();
	const [passwordCurrent, setPasswordCurrent] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		if (!passwordCurrent || !password || !passwordConfirm) {
			showSnackbar('Please fill out all required fields.', 'error');
			return;
		}

		await updateMyPassword(passwordCurrent, password, passwordConfirm);
	};

	const handleAccountDelete = async () => {
		await deleteMe();
	};

	return (
		<PageLayout>
			<Container maxWidth='md' sx={{ py: 4 }}>
				<Box sx={{ mb: 4 }}>
					<Typography
						variant='h4'
						component='h1'
						sx={{
							fontWeight: 'semi-bold',
							mb: '0.5rem'
						}}
					>
						Admin Account Security
					</Typography>
					<Typography color='textSecondary'>
						Manage your account security preferences.
					</Typography>
				</Box>
				<Box sx={{ mb: 4 }}>
					<form onSubmit={handleSubmit} encType='multipart/form-data'>
						<Card sx={{ px: 5, py: 2 }}>
							<CardHeader
								title='Change Password'
								subheader='Update your password here.'
							/>
							<CardContent>
								<Box sx={{ mb: 2 }}>
									<TextField
										label='Current password'
										id='passwordCurrent'
										name='passwordCurrent'
										type='password'
										fullWidth
										value={passwordCurrent}
										onChange={(e) => setPasswordCurrent(e.target.value)}
										error={submitted && !passwordCurrent}
										sx={{
											marginBottom: '1rem'
										}}
									/>
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
										value={passwordConfirm}
										onChange={(e) => setPasswordConfirm(e.target.value)}
										error={submitted && !passwordConfirm}
									/>
								</Box>
							</CardContent>
							<CardActions>
								<Button
									type='submit'
									color='secondary'
									variant='contained'
									sx={{
										paddingY: '0.8rem',
										'&:hover': {
											opacity: 0.9
										},
										ml: 'auto'
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
										'Save Changes'
									)}
								</Button>
							</CardActions>
						</Card>
					</form>
					<Button
						color='error'
						variant='contained'
						sx={{
							paddingY: '0.8rem',
							'&:hover': {
								opacity: 0.9
							},
							mt: '2rem'
						}}
						onClick={handleAccountDelete}
					>
						Delete Account
					</Button>
				</Box>
			</Container>
		</PageLayout>
	);
}
