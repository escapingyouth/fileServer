import PropTypes from 'prop-types';
import { Typography, Paper, Box } from '@mui/material';

const DashboardCard = ({ icon, title, value, description, color }) => {
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
					{value}
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
