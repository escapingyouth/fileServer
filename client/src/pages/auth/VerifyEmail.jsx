import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, Button } from '@mui/material';
0;

const url = import.meta.env.VITE_SERVER_URL;

const VerifyEmail = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const [message, setMessage] = useState('');

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				const res = await axios.get(`${url}/api/users/verify/${token}`);

				setMessage(res.data.message);
			} catch (err) {
				setMessage('Verification failed. Invalid or expired token.');
			}
		};

		verifyEmail();
	}, [token]);

	return (
		<Container
			component='main'
			sx={{
				minHeight: '100dvh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
				px: 4,
				py: 12
			}}
		>
			<Box textAlign='center' maxWidth='md' mx='auto'>
				<Box mx='auto' height={48} width={48} color='success.main' />
				<Typography
					component='h1'
					variant='h4'
					fontWeight='bold'
					sx={{
						mt: 4,
						color: 'text.primary',
						letterSpacing: 'tight',
						fontSize: {
							xs: '1.5rem',
							md: '2rem'
						}
					}}
				>
					{message}
				</Typography>

				<Button
					type='submit'
					color='primary'
					variant='contained'
					sx={{
						textTransform: 'capitalize',
						paddingY: '0.8rem ',
						marginTop: '1rem',
						'&:hover': {
							opacity: 0.9
						}
					}}
					onClick={() => navigate('/')}
				>
					Go to Homepage
				</Button>
			</Box>
		</Container>
	);
};

export default VerifyEmail;
