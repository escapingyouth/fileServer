import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { useSnackbar } from '../../contexts/SnackbarContext';
import axios from 'axios';
import PageLayout from '../../components/layouts/PageLayout';
import { Typography, TextField, Button, CircularProgress } from '@mui/material';

const url = import.meta.env.VITE_SERVER_URL;

export default function EditUser() {
	const [user, setUser] = useState({ name: '', email: '' });
	const { id } = useParams();
	const { showSnackbar } = useSnackbar();
	const { updateUser, loading, submitted, setSubmitted } = useAuth();

	useEffect(() => {
		async function fetchUser() {
			try {
				const { data } = await axios.get(`${url}/api/users/${id}`, {
					withCredentials: true
				});
				setUser(data.data.user);
			} catch (error) {
				console.error(error);
				showSnackbar(error.response.data.message, 'error');
			}
		}
		fetchUser();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({ ...prevUser, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		if (!user.name || !user.email) {
			showSnackbar('Please fill out all required fields.', 'error');
			return;
		}
		await updateUser(id, user);
	};

	return (
		<PageLayout>
			<form onSubmit={handleSubmit}>
				<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
					Edit User
				</Typography>
				<TextField
					label='Name'
					id='name'
					name='name'
					variant='outlined'
					color='primary'
					type='text'
					fullWidth
					placeholder='Enter new name'
					value={user.name}
					onChange={handleChange}
					sx={{ mb: '1rem' }}
					error={submitted && !user.name}
				/>
				<TextField
					label='Email'
					id='email'
					name='email'
					variant='outlined'
					color='primary'
					type='email'
					fullWidth
					placeholder='Enter new email'
					value={user.email}
					onChange={handleChange}
					sx={{ mb: '1rem' }}
					error={submitted && !user.email}
				/>

				<Button
					type='submit'
					color='secondary'
					variant='contained'
					sx={{
						paddingY: '0.8rem ',
						'&:hover': {
							opacity: 0.9
						},
						width: {
							xs: '100%',
							md: '30%',
							lg: '20%'
						}
					}}
					disabled={loading}
				>
					{loading ? (
						<CircularProgress size={25} sx={{ color: '#fff' }} disableShrink />
					) : (
						'Save'
					)}
				</Button>
			</form>
		</PageLayout>
	);
}
