import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import GradeIcon from '@mui/icons-material/Grade';
import HelpIcon from '@mui/icons-material/Help';

export const adminMenuItems = [
	{
		text: 'Dashboard',
		icon: <DashboardIcon color='#fff' />,
		path: '/admin/dashboard'
	},
	{
		text: 'All Files',
		icon: <DescriptionIcon color='#fff' />,
		path: '/admin/files'
	},
	{
		text: 'Statistics',
		icon: <BarChartIcon color='#fff' />,
		path: '/admin/statistics'
	},
	{
		text: 'Upload File',
		icon: <UploadFileIcon color='#fff' />,
		path: '/admin/upload'
	},
	{
		text: 'Bin',
		icon: <DeleteIcon color='#fff' />,
		path: '/admin/trash'
	}
];

export const userMenuItems = [
	{
		text: 'Dashboard',
		icon: <DashboardIcon color='#fff' />,
		path: '/user/dashboard'
	},
	{
		text: 'All Files',
		icon: <DescriptionIcon color='#fff' />,
		path: '/user/files'
	},

	{
		text: 'Email File',
		icon: <EmailIcon color='#fff' />,
		path: '/user/email'
	},
	{
		text: 'Favourites',
		icon: <GradeIcon color='#fff' />,
		path: '/user/favourites'
	},
	{
		text: 'Help',
		icon: <HelpIcon color='#fff' />,
		path: '/user/help'
	}
];
