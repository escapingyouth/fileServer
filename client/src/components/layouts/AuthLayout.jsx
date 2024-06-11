import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';

export default function AuthLayout({
	bgImage,
	bgHeading,
	bgSubHeading,
	formHeading,
	formSubHeading,
	children
}) {
	return (
		<Box height='100dvh'>
			<Stack direction='row' height='100%'>
				<Stack
					direction='column'
					justifyContent='center'
					alignItems='center'
					sx={{
						backgroundImage: `url(images/${bgImage})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						width: '50%',
						display: {
							xs: 'none',
							lg: 'flex'
						},

						textAlign: 'center'
					}}
				>
					<Typography
						color='#fff'
						variant='h3'
						component='h1'
						marginBottom='0.4rem'
						sx={{
							fontSize: {
								lg: '2.2rem',
								xl: '3rem'
							}
						}}
					>
						{bgHeading}
					</Typography>
					<Typography color='#fff' variant='body2' component='span'>
						{bgSubHeading}
					</Typography>
				</Stack>
				<Stack
					direction='row'
					justifyContent='center'
					alignItems='center'
					sx={{
						width: {
							xs: '100%',
							lg: '50%'
						}
					}}
				>
					<Box
						sx={{
							width: {
								xs: '90%',
								sm: '75%',
								md: '55%',
								lg: '85%',
								xl: '55%'
							}
						}}
					>
						<Box
							sx={{
								marginBottom: '4rem'
							}}
						>
							<Typography
								variant='h4'
								component='h1'
								fontWeight='600'
								color='primary'
							>
								{formHeading}
							</Typography>
							<Typography variant='body1' component='span' color='#5C677D'>
								{formSubHeading}
							</Typography>
						</Box>
						{children}
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
}

AuthLayout.propTypes = {
	bgImage: PropTypes.string,
	bgHeading: PropTypes.string,
	bgSubHeading: PropTypes.string,
	formHeading: PropTypes.string,
	formSubHeading: PropTypes.string,
	children: PropTypes.node
};
