import { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, CircularProgress } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PageLayout from '../../components/layouts/PageLayout';
import { useSnackbar } from '../../contexts/SnackbarContext';

const api = import.meta.env.VITE_APP_API;

export default function UploadFile() {
	const [loading, setIsLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const { showSnackbar } = useSnackbar();

	const [formState, setFormState] = useState({
		title: '',
		description: '',
		uploadedFile: null
	});

	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === 'file') {
			setFormState({
				...formState,
				uploadedFile: files[0]
			});
		} else {
			setFormState({
				...formState,
				[name]: value
			});
		}
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		if (!formState.title || !formState.description || !formState.uploadedFile) {
			showSnackbar('Please fill out all required fields.', 'error');
			return;
		}

		const formData = new FormData();

		formData.append('title', formState.title);
		formData.append('description', formState.description);
		formData.append('file', formState.uploadedFile);

		try {
			setIsLoading(true);

			await axios.post(`${api}/files`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			showSnackbar('File uploaded successfully!', 'success');

			setSubmitted(false);
		} catch (error) {
			console.log(error);
			showSnackbar(error.response.data.message, 'error');
			showSnackbar(error.message, 'error');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<PageLayout isAdmin={true}>
			<form onSubmit={handleUpload} noValidate encType='multipart/form-data'>
				<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
					Upload a File
				</Typography>
				<TextField
					label='Title'
					id='title'
					name='title'
					variant='outlined'
					color='primary'
					type='text'
					fullWidth
					placeholder='Enter file title'
					required
					sx={{ mb: '1rem' }}
					value={formState.title}
					onChange={handleChange}
					error={submitted && !formState.title}
				/>

				<TextField
					label='Description'
					id='description'
					name='description'
					variant='outlined'
					color='primary'
					type='text'
					placeholder='Enter file description'
					multiline
					rows={4}
					fullWidth
					required
					sx={{ mb: '1rem' }}
					value={formState.description}
					onChange={handleChange}
					error={submitted && !formState.description}
				/>

				<TextField
					type='file'
					name='file'
					fullWidth
					onChange={handleChange}
					sx={{ mb: '2rem' }}
					error={submitted && !formState.uploadedFile}
				/>

				<Button
					type='submit'
					color='secondary'
					variant='contained'
					endIcon={loading ? '' : <FileUploadIcon />}
					disabled={loading}
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
				>
					{loading ? (
						<CircularProgress size={25} sx={{ color: '#fff' }} disableShrink />
					) : (
						'Upload'
					)}
				</Button>
			</form>
		</PageLayout>
	);
}
