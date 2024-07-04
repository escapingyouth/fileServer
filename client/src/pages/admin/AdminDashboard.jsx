import { Box, Grid, Typography } from '@mui/material';
import { useFile } from '../../contexts/FileContext';
import { useAuth } from '../../contexts/AuthContext';
import DashboardCard from '../../components/DashboardCard';
import PageLayout from '../../components/layouts/PageLayout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Face2Icon from '@mui/icons-material/Face2';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { BarChart, LineChart } from '@mui/x-charts';

const Dashboard = () => {
	const { fileStats } = useFile();
	const { userStats } = useAuth();

	const averageSizeMB = `${(fileStats.averageFileSize / 1048576).toFixed(
		2
	)} MB`;

	const barData = {
		xAxis: [
			{
				id: 'categories',
				data: ['Total Files', 'Favorite Files', 'Total Downloads'],
				scaleType: 'band'
			}
		],
		series: [
			{
				data: [
					fileStats.totalFiles,
					fileStats.favoriteFilesCount,
					fileStats.totalDownloads
				]
			}
		],
		colors: ['#FF7EAD']
	};

	const lineXAxisData = fileStats.uploadsOverTime.map((item) => item._id);
	const lineSeriesData = fileStats.uploadsOverTime.map((item) => item.count);

	return (
		<PageLayout>
			<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
				Admin Dashboard
			</Typography>
			<Box sx={{ flexGrow: 1 }}>
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
							value={200}
							description='Total number of users'
							color='#508AFF'
						/>
					</Grid>
					<Grid item xs={12} lg={6} xl={3}>
						<DashboardCard
							color='#FFC966'
							title='Total Active Users'
							description='Total number of active users'
							icon={
								<Face2Icon
									sx={{
										color: '#fff',
										fontSize: '3rem'
									}}
								/>
							}
							value={20}
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
			<Box sx={{ mt: '4rem' }}>
				<BarChart
					xAxis={barData.xAxis}
					series={barData.series}
					colors={barData.colors}
					height={500}
					sx={{
						width: '100%'
					}}
				/>

				<LineChart
					xAxis={[{ data: lineXAxisData }]}
					series={[{ data: lineSeriesData }]}
					height={300}
					sx={{
						width: '100%'
					}}
				/>
			</Box>
		</PageLayout>
	);
};

export default Dashboard;
