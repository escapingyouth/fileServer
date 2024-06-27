import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../contexts/SnackbarContext';
import axios from 'axios';
import PageLayout from '../../components/layouts/PageLayout';
import { Typography, TextField, Button, CircularProgress } from '@mui/material';

const api = import.meta.env.VITE_APP_API;

export default function EditFile() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { showSnackbar } = useSnackbar();

	const [file, setFile] = useState({ title: '', description: '' });
	const [loading, setIsLoading] = useState(false);

	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		async function fetchFile() {
			try {
				const response = await axios.get(`${api}/files/${id}`);
				setFile(response.data.data.file);
			} catch (error) {
				console.error(error);
				showSnackbar(error.message, 'error');
			}
		}
		fetchFile();
	}, [id, showSnackbar]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFile((prevFile) => ({ ...prevFile, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		if (!file.title || !file.description) {
			showSnackbar('Please fill out all required fields.', 'error');
			return;
		}
		try {
			setIsLoading(true);

			await axios.patch(`${api}/files/${id}`, file);

			showSnackbar('File edited successfully!', 'info');
			setSubmitted(false);
			navigate('/admin/files');
		} catch (error) {
			console.error(error);
			showSnackbar(error.message, 'error');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<PageLayout isAdmin={true}>
			<form onSubmit={handleSubmit}>
				<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
					Edit File
				</Typography>
				<TextField
					label='Title'
					id='title'
					name='title'
					variant='outlined'
					color='primary'
					type='text'
					fullWidth
					placeholder='Enter new title'
					value={file.title}
					onChange={handleChange}
					sx={{ mb: '1rem' }}
					error={submitted && !file.title}
				/>
				<TextField
					label='Description'
					id='description'
					name='description'
					variant='outlined'
					color='primary'
					type='text'
					fullWidth
					placeholder='Enter new description'
					value={file.description}
					onChange={handleChange}
					sx={{ mb: '1rem' }}
					error={submitted && !file.description}
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
