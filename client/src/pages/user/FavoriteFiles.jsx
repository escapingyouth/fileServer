import PageLayout from '../../components/layouts/PageLayout';
import { Typography } from '@mui/material';
import FavoriteFileTable from '../../components/user/FavoriteFileTable';

export default function FavoriteFiles() {
	return (
		<PageLayout>
			<Typography component='h2' variant='h6' sx={{ mb: '1rem' }}>
				Favourite Files
			</Typography>
			<FavoriteFileTable />
		</PageLayout>
	);
}
