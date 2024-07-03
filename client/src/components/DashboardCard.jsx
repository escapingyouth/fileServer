import { Typography, Paper, Box } from '@mui/material';

const DashboardCard = ({ title, value, percentage, description, positive }) => {
	return (
		<Paper
			elevation={3}
			sx={{
				px: 2,
				py: 3,
				display: 'flex',
				alignItems: 'center',
				minWidth: 250
			}}
		>
			<Box>
				<Typography
					variant='body1'
					component='h2'
					sx={{
						color: '#8c8c8c'
					}}
				>
					{title}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '1rem'
					}}
				>
					<Typography variant='h6' sx={{ marginY: 1 }}>
						{value}
					</Typography>
					<Typography
						variant='subtitle1'
						color={positive ? 'primary' : 'error'}
					>
						{positive ? '▲' : '▼'} {percentage}
					</Typography>
				</Box>
				<Typography variant='body2' color='textSecondary'>
					{description}
				</Typography>
			</Box>
		</Paper>
	);
};

export default DashboardCard;
