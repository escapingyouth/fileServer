import NavigationMenu from './NavigationMenu';

import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

const menuItems = [
	{
		text: 'Dashboard',
		icon: <DashboardIcon color='#fff' />,
		path: '/dashboard'
	},
	{
		text: 'All Files',
		icon: <DescriptionIcon color='#fff' />,
		path: '/files'
	},
	{
		text: 'Statistics',
		icon: <BarChartIcon color='#fff' />,
		path: '/statistics'
	},
	{
		text: 'Upload File',
		icon: <UploadFileIcon color='#fff' />,
		path: '/upload'
	},
	{
		text: 'Bin',
		icon: <DeleteIcon color='#fff' />,
		path: '/trash'
	}
];

export default function AdminDashboard() {
	return (
		<>
			<NavigationMenu menuItems={menuItems} />
		</>
	);
}
