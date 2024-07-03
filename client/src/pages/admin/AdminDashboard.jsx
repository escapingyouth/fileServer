import { Box, Grid, Typography } from '@mui/material';
import DashboardCard from '../../components/DashboardCard';
import PageLayout from '../../components/layouts/PageLayout';

const Dashboard = () => {
	const data = [
		{
			title: 'Total Users',
			value: '78,250',
			percentage: '70.5%',
			description: 'You made an extra 8,900 this year',
			positive: true
		},
		{
			title: 'Total Files',
			value: '78,250',
			percentage: '70.5%',
			description: 'You made an extra 8,900 this year',
			positive: true
		},
		{
			title: 'Total Downloads',
			value: '78,250',
			percentage: '70.5%',
			description: 'You made an extra 8,900 this year',
			positive: true
		},
		{
			title: 'Total Emails',
			value: '78,250',
			percentage: '70.5%',
			description: 'You made an extra 8,900 this year',
			positive: true
		}
	];

	return (
		<PageLayout>
			<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
				Admin Dashboard
			</Typography>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					{data.map((item, index) => (
						<Grid item xs={12} sm={6} md={3} key={index}>
							<DashboardCard {...item} />
						</Grid>
					))}
				</Grid>
			</Box>
		</PageLayout>
	);
};

export default Dashboard;
