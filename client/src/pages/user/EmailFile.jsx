import { useState } from 'react';
import { useFile } from '../../contexts/FileContext';
import {
	Typography,
	TextField,
	Button,
	CircularProgress,
	Select,
	MenuItem
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PageLayout from '../../components/layouts/PageLayout';
import { useSnackbar } from '../../contexts/SnackbarContext';

export default function EmailFile() {
	const { files, emailFile, loading, submitted, setSubmitted } = useFile();

	const filteredFiles = files.filter((file) => !file.isTrashed);

	const { showSnackbar } = useSnackbar();

	const [formState, setFormState] = useState({
		recipient: '',
		subject: '',
		message: '',
		selectedFileId: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		if (
			!formState.recipient ||
			!formState.subject ||
			!formState.message ||
			!formState.selectedFileId
		) {
			showSnackbar('Please fill out all required fields.', 'error');
			return;
		}

		await emailFile({
			recipient: formState.recipient,
			subject: formState.subject,
			message: formState.message,
			fileId: formState.selectedFileId
		});
	};

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250
			}
		}
	};

	return (
		<PageLayout>
			<form onSubmit={handleSubmit} autoComplete='off' noValidate>
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

				<Select
					labelId='file-select-label'
					id='file-select'
					name='selectedFileId'
					value={formState.selectedFileId}
					onChange={handleChange}
					fullWidth
					MenuProps={MenuProps}
					sx={{ mb: '1rem' }}
					required
					error={submitted && !formState.selectedFileId}
				>
					{filteredFiles.map((file) => (
						<MenuItem key={file._id} value={file._id}>
							{file.title}
						</MenuItem>
					))}
				</Select>

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
