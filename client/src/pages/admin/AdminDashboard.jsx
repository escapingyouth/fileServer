import { Typography } from '@mui/material';
import PageLayout from '../../components/layouts/PageLayout';

export default function AdminDashboard() {
	return (
		<PageLayout isAdmin={true}>
			<Typography>Admin Dashboard</Typography>
		</PageLayout>
	);
}
