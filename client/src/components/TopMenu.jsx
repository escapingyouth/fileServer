import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import {
	Avatar,
	Box,
	IconButton,
	Toolbar,
	MenuItem,
	Menu,
	InputBase,
	Tooltip,
	Typography
} from '@mui/material';

import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreIcon from '@mui/icons-material/MoreVert';

const url = import.meta.env.VITE_SERVER_URL;

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto'
	}
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '40ch'
		}
	}
}));

export default function TopMenu({ onHandleDrawerToggle }) {
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const isUserMenuOpen = Boolean(anchorElUser);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleUserMenuOpen = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleUserMenuClose = () => {
		setAnchorElUser(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleLogoutClick = async () => {
		handleUserMenuClose();
		await logout();
	};

	const handleProfileClick = () => {
		handleUserMenuClose();

		user.role === 'admin'
			? navigate('/admin/profile')
			: navigate('/user/profile');
	};
	const handleSecurityClick = () => {
		handleUserMenuClose();
		user.role === 'admin'
			? navigate('/admin/security')
			: navigate('/user/security');
	};

	const mobileMenuId = 'menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
			sx={{
				'& .MuiList-root': {
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
					backgroundColor: 'secondary.main'
				},

				mt: '45px'
			}}
		>
			<MenuItem
				onClick={handleUserMenuOpen}
				sx={{
					width: '100%',
					alignContent: 'center',
					display: 'flex',
					gap: 1
				}}
			>
				<IconButton
					color='inherit'
					sx={{
						padding: '0rem'
					}}
				>
					<SettingsIcon
						sx={{
							color: '#fff'
						}}
					/>
				</IconButton>
				<Typography
					variant='body2'
					component='p'
					sx={{
						color: '#fff',
						fontSize: '0.9rem'
					}}
				>
					Settings
				</Typography>
			</MenuItem>
			<MenuItem
				sx={{
					width: '100%',
					alignContent: 'center',
					display: 'flex',
					gap: 1
				}}
			>
				{user ? (
					<Avatar
						src={`${url}/img/users/${user.photo}`}
						alt={user.name}
						sx={{
							width: 24,
							height: 24
						}}
					/>
				) : (
					<Avatar
						src='/broken-image.jpg'
						alt='Profile Picture'
						sx={{
							width: 24,
							height: 24
						}}
					/>
				)}

				<Typography
					variant='body2'
					component='p'
					sx={{
						color: '#fff',
						fontSize: '0.9rem',
						textTransform: 'capitalize'
					}}
				>
					{user ? user.name : 'user'}
				</Typography>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='fixed'
				color='secondary'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` }
				}}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={onHandleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>

					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<Tooltip title='Open settings'>
							<IconButton
								size='large'
								color='inherit'
								onClick={handleUserMenuOpen}
								sx={{ p: 0 }}
							>
								<SettingsIcon />
							</IconButton>
						</Tooltip>
					</Box>
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{user ? (
							<Avatar
								src={`${url}/img/users/${user.photo}`}
								alt='Profile Picture'
								sx={{ marginLeft: 2, width: 24, height: 24 }}
							/>
						) : (
							<Avatar
								src='/broken-image.jpg'
								alt='Profile Picture'
								sx={{ marginLeft: 2, width: 24, height: 24 }}
							/>
						)}
						<Typography
							component='span'
							sx={{
								textTransform: 'capitalize',
								ml: '0.5rem'
							}}
						>
							{user ? user.name : ''}
						</Typography>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			<Menu
				sx={{
					mt: '45px',
					'& .MuiList-root': {
						backgroundColor: 'secondary.main'
					}
				}}
				id='menu-appbar'
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				open={isUserMenuOpen}
				onClose={handleUserMenuClose}
			>
				<MenuItem onClick={handleProfileClick}>
					<Typography
						textAlign='center'
						sx={{
							color: '#fff',
							fontSize: '0.9rem'
						}}
					>
						Profile
					</Typography>
				</MenuItem>
				<MenuItem onClick={handleSecurityClick}>
					<Typography
						textAlign='center'
						sx={{
							color: '#fff',
							fontSize: '0.9rem'
						}}
					>
						Security
					</Typography>
				</MenuItem>
				<MenuItem onClick={handleLogoutClick}>
					<Typography
						textAlign='center'
						sx={{
							color: '#fff',
							fontSize: '0.9rem'
						}}
					>
						Log out
					</Typography>
				</MenuItem>
			</Menu>
		</Box>
	);
}

TopMenu.propTypes = {
	onHandleDrawerToggle: PropTypes.func
};
