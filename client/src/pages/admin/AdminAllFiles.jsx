import { Typography } from '@mui/material';
import AdminFileTable from '../../components/admin/AdminFileTable';
import PageLayout from '../../components/layouts/PageLayout';

export default function AdminAllFiles() {
	return (
		<PageLayout isAdmin={true}>
			<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
				All Files
			</Typography>
			<AdminFileTable />
		</PageLayout>
	);
}
