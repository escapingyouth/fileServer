import { useState } from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Typography,
	TextField,
	Avatar,
	Button,
	Container,
	CircularProgress,
	Box
} from '@mui/material';
import PageLayout from '../../components/layouts/PageLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from '../../contexts/SnackbarContext';

const url = import.meta.env.VITE_SERVER_URL;

export default function AdminProfile() {
	const { user, updateMe, loading } = useAuth();
	const { showSnackbar } = useSnackbar();

	const [name, setName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email || '');
	const [profilePicture, setProfilePicture] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !email) {
			showSnackbar('Please fill out all required fields.', 'error');
			return;
		}

		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		if (profilePicture) {
			formData.append('photo', profilePicture);
		}

		await updateMe(formData);
	};

	return (
		<PageLayout isAdmin={true}>
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
						Admin Profile
					</Typography>
					<Typography color='textSecondary'>
						Manage your account information and preferences.
					</Typography>
				</Box>
				<Box sx={{ mb: 4 }}>
					<form onSubmit={handleSubmit} encType='multipart/form-data'>
						<Card sx={{ px: 5, py: 2 }}>
							<CardHeader
								title='Personal Information'
								subheader='Update your name, email, and profile picture.'
							/>
							<CardContent>
								<Box sx={{ mb: 2 }}>
									<TextField
										id='name'
										name='name'
										label='Name'
										value={name}
										fullWidth
										variant='outlined'
										margin='normal'
										onChange={(e) => setName(e.target.value)}
									/>
								</Box>
								<Box sx={{ mb: 2 }}>
									<TextField
										id='email'
										label='Email'
										name='email'
										type='email'
										value={email}
										fullWidth
										variant='outlined'
										margin='normal'
										onChange={(e) => setEmail(e.target.value)}
									/>
								</Box>
								{/* <Box sx={{ mb: 2 }}>
								<TextField
									id='currentPassword'
									name='currentPassword'
									label='Current Password'
									type='password'
									defaultValue='********'
									fullWidth
									variant='outlined'
									margin='normal'
								/>
								<TextField
									id='password'
									label='New Password'
									name='password'
									type='password'
									fullWidth
									variant='outlined'
									margin='normal'
								/>
								<TextField
									id='passwordConfirm'
									label='Confirm Password'
									name='passwordConfirm'
									type='password'
									fullWidth
									variant='outlined'
									margin='normal'
								/>
							</Box> */}
								<Box
									sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}
								>
									<Box>
										{user ? (
											<Avatar
												sx={{ width: 70, height: 70 }}
												src={`${url}/img/users/${user.photo}`}
												alt='Profile Picture'
											/>
										) : (
											<Avatar
												sx={{ width: 70, height: 70 }}
												src='/broken-image.jpg'
												alt='Profile Picture'
											/>
										)}
									</Box>

									<TextField
										id='photo'
										accept='image/*'
										onChange={(e) => setProfilePicture(e.target.files[0])}
										name='photo'
										type='file'
										fullWidth
										variant='outlined'
										margin='normal'
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
				</Box>
			</Container>
		</PageLayout>
	);
}
