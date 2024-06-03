import { Typography, Stack } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

export default function Logo() {
	return (
		<Stack
			direction='row'
			alignItems='center'
			sx={{
				'& > img': {
					width: '25px',
					height: '100%',
					objectFit: 'contain'
				},
				width: '100%',
				paddingLeft: 1.6,
				gap: '1.5rem',
				color: '#fff'
			}}
		>
			<StorageIcon fontSize='medium' />
			<Typography
				component='h1'
				variant='h6'
				sx={{
					fontWeight: 'bold'
				}}
			>
				FileServer
			</Typography>
		</Stack>
	);
}
