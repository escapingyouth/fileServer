import { Box, Grid, Typography } from '@mui/material';
import { useFile } from '../../contexts/FileContext';
import { useAuth } from '../../contexts/AuthContext';
import DashboardCard from '../../components/DashboardCard';
import PageLayout from '../../components/layouts/PageLayout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Face2Icon from '@mui/icons-material/Face2';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { BarChart } from '@mui/x-charts';
import RecentFiles from '../../components/RecentFiles';

const AdminDashboard = () => {
	const { fileStats } = useFile();
	const { userStats } = useAuth();

	const averageSizeMB =
		`${(fileStats.averageFileSize / 1048576).toFixed(2)} MB` || '';

	const barData = {
		xAxis: [
			{
				id: 'categories',
				data: [
					'Total Users',
					'Verified Users',
					'Total Files',
					'Total Downloads',
					'Average File Size'
				],
				scaleType: 'band'
			}
		],
		series: [
			{
				data: [
					userStats.totalUsers,
					userStats.verifiedUsers,
					fileStats.totalFiles,
					fileStats.totalDownloads,
					(fileStats.averageFileSize / 1048576).toFixed(2)
				]
			}
		],
		colors: ['#20c997']
	};

	return (
		<PageLayout>
			<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
				Admin Dashboard
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
								<PeopleAltIcon
									sx={{
										color: '#fff',
										fontSize: '3rem'
									}}
								/>
							}
							title='Total Users'
							value={userStats.totalUsers}
							description='Total number of users'
							color='#508AFF'
						/>
					</Grid>
					<Grid item xs={12} lg={6} xl={3}>
						<DashboardCard
							color='#FFC966'
							title='Total Verified Users'
							description='Total number of active users'
							icon={
								<Face2Icon
									sx={{
										color: '#fff',
										fontSize: '3rem'
									}}
								/>
							}
							value={userStats.verifiedUsers}
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
							title='Average File Size'
							value={averageSizeMB}
							description='Average file size in MB'
							icon={
								<FolderZipIcon
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

export default AdminDashboard;
