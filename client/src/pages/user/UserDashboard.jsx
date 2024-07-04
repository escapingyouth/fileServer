import { Box, Grid, Typography } from '@mui/material';
import { useFile } from '../../contexts/FileContext';
import DashboardCard from '../../components/DashboardCard';
import PageLayout from '../../components/layouts/PageLayout';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DescriptionIcon from '@mui/icons-material/Description';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { BarChart } from '@mui/x-charts';
import RecentFiles from '../../components/RecentFiles';

const UserDashboard = () => {
	const { fileStats } = useFile();

	const barData = {
		xAxis: [
			{
				id: 'categories',
				data: [
					'Total Downloads',
					'Total Favorites',
					'Total Files',
					'Total Emails',
					'Average File Size'
				],
				scaleType: 'band'
			}
		],
		series: [
			{
				data: [
					fileStats.totalDownloads,
					fileStats.favoriteFilesCount,
					fileStats.totalFiles,
					fileStats.totalEmails,
					(fileStats.averageFileSize / 1048576).toFixed(2)
				]
			}
		],
		colors: ['#6741d9']
	};

	return (
		<PageLayout>
			<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
				User Dashboard
			</Typography>
			<Box
				sx={{
					flexGrow: 1,
					p: 4,
					backgroundColor: '#fff',
					border: '0.92px solid #EFF0F6',
					borderRadius: '10px'
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={12} lg={6} xl={3}>
						<DashboardCard
							icon={
								<BrowserUpdatedIcon
									sx={{
										color: '#fff',
										fontSize: '3rem'
									}}
								/>
							}
							title='Total Downloads'
							value={fileStats.totalDownloads}
							description='Total number of downloads'
							color='#508AFF'
						/>
					</Grid>
					<Grid item xs={12} lg={6} xl={3}>
						<DashboardCard
							color='#FFC966'
							title='Favorite Count'
							description='Total number of favorite files'
							icon={
								<FavoriteIcon
									sx={{
										color: '#fff',
										fontSize: '3rem'
									}}
								/>
							}
							value={fileStats.favoriteFilesCount}
						/>
					</Grid>
					<Grid item xs={12} lg={6} xl={3}>
						<DashboardCard
							color='#FF7EAD'
							title='Total Files'
							value={fileStats.totalFiles}
							description='Total number of files on server'
							icon={
								<DescriptionIcon
									sx={{
										color: '#fff',
										fontSize: '3rem'
									}}
								/>
							}
						/>
					</Grid>
					<Grid item xs={12} lg={6} xl={3}>
						<DashboardCard
							color='#6FE9A0'
							title='Total Emails Sent'
							value={fileStats.totalEmails}
							description='Total number of emails sent'
							icon={
								<MarkEmailReadIcon
									sx={{
										color: '#fff',
										fontSize: '3rem'
									}}
								/>
							}
						/>
					</Grid>
				</Grid>
			</Box>

			<Typography component='h2' variant='h6' sx={{ mt: '4rem' }}>
				Bar Chart
			</Typography>
			<Box
				sx={{
					mt: '1rem',
					backgroundColor: '#fff',
					border: '0.92px solid #EFF0F6',
					borderRadius: '10px'
				}}
			>
				<BarChart
					xAxis={barData.xAxis}
					series={barData.series}
					colors={barData.colors}
					height={500}
					sx={{
						width: '100%'
					}}
				/>
			</Box>

			<Typography component='h2' variant='h6' sx={{ mt: '4rem' }}>
				Recent Files
			</Typography>
			<Box
				sx={{
					mt: '1rem',
					backgroundColor: '#fff',
					border: '0.92px solid #EFF0F6',
					borderRadius: '10px'
				}}
			>
				<RecentFiles />
			</Box>
		</PageLayout>
	);
};

export default UserDashboard;
