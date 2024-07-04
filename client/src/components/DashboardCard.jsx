import PropTypes from 'prop-types';
import { useFile } from '../contexts/FileContext';
import { Typography, Paper, Box, CircularProgress } from '@mui/material';

const DashboardCard = ({ icon, title, value, description, color }) => {
	const { loading } = useFile();
	return (
		<Paper
			elevation={2}
			sx={{
				px: 2,
				py: 3,
				display: 'flex',
				alignItems: 'center',
				minWidth: 250,
				backgroundColor: color,
				color: '#fff',
				'&:hover': {
					opacity: 0.9
				}
			}}
		>
			<Box>
				<Box
					sx={{
						mb: '1rem'
					}}
				>
					{icon}
				</Box>
				<Typography variant='h6' component='h2'>
					{title}
				</Typography>

				<Typography variant='h6' sx={{ marginY: 1 }}>
					{loading ? (
						<CircularProgress size={25} sx={{ color: '#fff' }} disableShrink />
					) : (
						value
					)}
				</Typography>

				<Typography variant='body2'>{description}</Typography>
			</Box>
		</Paper>
	);
};

DashboardCard.propTypes = {
	icon: PropTypes.element,
	title: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	description: PropTypes.string,
	color: PropTypes.string
};

export default DashboardCard;
