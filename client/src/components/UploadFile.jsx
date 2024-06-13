import { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PageLayout from './layouts/PageLayout';

export default function UploadFile() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);

	const handleUpload = async (e) => {
		e.preventDefault();

		if (!selectedFile) {
			alert('Please select a file to upload');
			return;
		}

		const formData = new FormData();
		formData.append('file', selectedFile);
		formData.append('title', title);
		formData.append('description', description);

		try {
			await axios.post('http://localhost:8000/api/files/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			alert('File uploaded successfully');
		} catch (error) {
			console.error('Error uploading file:', error);
			alert('Error uploading file');
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
					value={title}
					variant='outlined'
					color='primary'
					type='text'
					fullWidth
					placeholder='Enter file title'
					required
					sx={{ mb: '1rem' }}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<TextField
					label='Description'
					id='description'
					name='description'
					value={description}
					variant='outlined'
					color='primary'
					type='text'
					placeholder='Enter file description'
					multiline
					rows={4}
					fullWidth
					required
					sx={{ mb: '1rem' }}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<TextField
					type='file'
					name='file'
					fullWidth
					onChange={(e) => setSelectedFile(e.target.files[0])}
					sx={{ mb: '2rem' }}
				/>

				<Button
					type='submit'
					color='secondary'
					variant='contained'
					endIcon={<FileUploadIcon />}
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
					Upload
				</Button>
			</form>
		</PageLayout>
	);
}
