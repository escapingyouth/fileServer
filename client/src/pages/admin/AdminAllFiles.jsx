import { Typography } from '@mui/material';
import AdminFileTable from '../../components/admin/AdminFileTable';
import PageLayout from '../../components/layouts/PageLayout';

export default function AdminAllFiles() {
	return (
		<PageLayout>
			<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
				Files
			</Typography>
			<AdminFileTable />
		</PageLayout>
	);
}
