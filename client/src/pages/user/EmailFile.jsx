import { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PageLayout from '../../components/layouts/PageLayout';
import { useSnackbar } from '../../contexts/SnackbarContext';

const api = import.meta.env.VITE_APP_API;

export default function EmailFile() {
	const [loading, setIsLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const { showSnackbar } = useSnackbar();

	const [formState, setFormState] = useState({
		recipient: '',
		subject: '',
		message: '',
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		if (
			!formState.recipient ||
			!formState.subject ||
			!formState.message ||
			!formState.uploadedFile
		) {
			showSnackbar('Please fill out all required fields.', 'error');
			return;
		}

		const formData = new FormData();

		formData.append('recipient', formState.recipient);
		formData.append('subject', formState.subject);
		formData.append('message', formState.message);
		formData.append('file', formState.uploadedFile);

		try {
			setIsLoading(true);

			await axios.post(`${api}/files/email`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			showSnackbar('Email sent successfully!');
			setSubmitted(false);
		} catch (error) {
			showSnackbar(error.message, 'error');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<PageLayout>
			<form
				onSubmit={handleSubmit}
				autoComplete='off'
				noValidate
				encType='multipart/form-data'
			>
				<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
					Email File
				</Typography>

				<TextField
					label='To'
					id='recipient'
					name='recipient'
					variant='outlined'
					color='primary'
					type='email'
					fullWidth
					placeholder='Enter recipient email address'
					required
					value={formState.recipient}
					onChange={handleChange}
					sx={{ mb: '1rem' }}
					error={submitted && !formState.recipient}
				/>
				<TextField
					label='Subject'
					id='subject'
					name='subject'
					variant='outlined'
					color='primary'
					type='text'
					fullWidth
					placeholder='Enter subject'
					required
					value={formState.subject}
					onChange={handleChange}
					sx={{ mb: '1rem' }}
					error={submitted && !formState.subject}
				/>
				<TextField
					label='Message'
					id='message'
					name='message'
					variant='outlined'
					color='primary'
					type='text'
					placeholder='Enter message'
					multiline
					rows={4}
					fullWidth
					required
					value={formState.message}
					onChange={handleChange}
					sx={{ mb: '1rem' }}
					error={submitted && !formState.message}
				/>
				<TextField
					type='file'
					name='file'
					fullWidth
					sx={{ mb: '2rem' }}
					onChange={handleChange}
					error={submitted && !formState.uploadedFile}
				/>
				<Button
					type='submit'
					color='secondary'
					variant='contained'
					endIcon={loading ? '' : <SendIcon />}
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
						'Send'
					)}
				</Button>
			</form>
		</PageLayout>
	);
}