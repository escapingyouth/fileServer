import { Box, Stack, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
	const navigate = useNavigate();
	return (
		<Stack
			component='main'
			sx={{
				backgroundImage: 'url(images/welcome.jpg)',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100dvh',
				textAlign: 'center'
			}}
		>
			<Box>
				<Typography
					color='#fff'
					variant='h2'
					component='h1'
					marginBottom='2rem'
					sx={{
						fontSize: {
							xs: '1.8rem',
							md: '2.2rem',
							lg: '2.2rem',
							xl: '3rem'
						},
						fontWeight: 'bold'
					}}
				>
					Welcome to File Server!
				</Typography>
				<Box
					sx={{
						display: {
							xs: 'block',
							md: 'flex'
						},
						alignItems: 'center',
						gap: '1rem'
					}}
				>
					<Button
						fullWidth
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
						onClick={() => navigate('/auth/signup')}
					>
						Sign up
					</Button>
					<Button
						fullWidth
						variant='contained'
						sx={{
							textTransform: 'capitalize',
							paddingY: '0.8rem ',
							marginTop: '1rem',
							backgroundColor: '#fff',
							color: '#050A44',
							'&:hover': {
								opacity: 0.9,
								backgroundColor: '#fff',
								color: '#050A44'
							}
						}}
						onClick={() => navigate('/auth/login')}
					>
						Log in
					</Button>
				</Box>
			</Box>
		</Stack>
	);
}
