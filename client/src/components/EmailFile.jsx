import { Typography, TextField, Button } from '@mui/material';
import PageLayout from './layouts/PageLayout';
import SelectFile from './SelectFile';
import SendIcon from '@mui/icons-material/Send';

export default function EmailFile() {
	return (
		<PageLayout>
			<form action='' noValidate>
				<Typography
					component='h2'
					variant='h6'
					sx={{
						mb: '1rem'
					}}
				>
					Email File(s)
				</Typography>
				<TextField
					label='To'
					id='recipient'
					name='recipient'
					variant='outlined'
					color='primary'
					type='email'
					fullWidth
					placeholder='Enter email address'
					required
					sx={{
						mb: '1rem'
					}}
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
					sx={{
						mb: '1rem'
					}}
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
					sx={{
						mb: '1rem'
					}}
				/>

				<SelectFile />

				<Typography
					component='h2'
					variant='h6'
					sx={{
						mb: '0.8rem',
						textAlign: 'center',
						color: 'primary.main'
					}}
				>
					OR
				</Typography>

				{/* <FileUploadInput placeholder='Upload File(s)' /> */}

				<Button
					type='submit'
					color='secondary'
					variant='contained'
					endIcon={<SendIcon />}
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
					Send
				</Button>
			</form>
		</PageLayout>
	);
}
