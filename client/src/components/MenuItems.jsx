import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
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
		text: 'Files',
		icon: <DescriptionIcon color='#fff' />,
		path: '/admin/files'
	},
	{
		text: 'Users',
		icon: <PersonIcon color='#fff' />,
		path: '/admin/users'
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
		path: '/user/favorites'
	},
	{
		text: 'Help',
		icon: <HelpIcon color='#fff' />,
		path: '/user/help'
	}
];
