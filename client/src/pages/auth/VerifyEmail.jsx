import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

const url = import.meta.env.VITE_SERVER_URL;

const VerifyEmail = () => {
	const { token } = useParams();
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
		<Container component='main' maxWidth='xs'>
			<Typography component='h1' variant='h5'>
				{message}
			</Typography>
		</Container>
	);
};

export default VerifyEmail;
