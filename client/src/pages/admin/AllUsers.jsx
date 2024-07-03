import { Typography } from '@mui/material';
import PageLayout from '../../components/layouts/PageLayout';
import UserTable from '../../components/admin/UserTable';

export default function AllUsers() {
	return (
		<PageLayout>
			<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
				Users
			</Typography>
			<UserTable />
		</PageLayout>
	);
}
