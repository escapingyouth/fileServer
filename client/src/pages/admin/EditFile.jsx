import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFile } from '../../contexts/FileContext';
import { useSnackbar } from '../../contexts/SnackbarContext';
import PageLayout from '../../components/layouts/PageLayout';
import { Typography, TextField, Button, CircularProgress } from '@mui/material';

export default function EditFile() {
	const { id } = useParams();

	const { getFile, updateFile, loading, submitted, setSubmitted } = useFile();
	const { showSnackbar } = useSnackbar();

	const [file, setFile] = useState({ title: '', description: '' });
	console.log(file);

	useEffect(() => {
		async function fetchFile() {
			setFile(await getFile(id));
		}
		fetchFile();
	}, [id]);

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
		await updateFile(id, file);
	};

	return (
		<PageLayout>
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
