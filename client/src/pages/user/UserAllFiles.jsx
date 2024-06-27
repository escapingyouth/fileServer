import { Typography } from '@mui/material';
import UserFileTable from '../../components/user/UserFileTable';
import PageLayout from '../../components/layouts/PageLayout';

export default function UserAllFiles() {
	return (
		<PageLayout>
			<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
				Files
			</Typography>
			<UserFileTable />
		</PageLayout>
	);
}
