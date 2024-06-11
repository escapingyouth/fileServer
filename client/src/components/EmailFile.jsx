import { Typography, TextField, Button } from '@mui/material';
import PageLayout from './layouts/PageLayout';
import SelectFile from './SelectFile';
import UploadFile from './UploadFile';

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
					id='receipient'
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

				<UploadFile />

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
				>
					Send
				</Button>
			</form>
		</PageLayout>
	);
}
