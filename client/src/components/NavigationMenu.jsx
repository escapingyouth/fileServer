import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	CssBaseline,
	Divider,
	Drawer
} from '@mui/material';

import Logo from './Logo';
import TopMenu from './TopMenu';

import { adminMenuItems, userMenuItems } from './MenuItems';

const drawerWidth = 240;

function DrawerItems({ isAdmin }) {
	const menuItemsToRender = isAdmin ? adminMenuItems : userMenuItems;
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();

	return (
		<div>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					...theme.mixins.toolbar
				}}
			>
				<Logo />
			</Box>

			<Divider />
			<List>
				{menuItemsToRender?.map((item) => (
					<ListItem
						key={item.text}
						disablePadding
						sx={{
							display: 'block',
							color: '#fff',
							'&:hover': {
								backgroundColor: '#393A3B'
							},
							...(location.pathname === item.path && {
								'&:active': {
									backgroundColor: '#393A3B'
								}
							})
						}}
						onClick={() => navigate(item.path)}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: 3,
									justifyContent: 'center',
									color: '#fff'
								}}
							>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);
}

DrawerItems.propTypes = {
	isAdmin: PropTypes.bool
};

export default function NavigationMenu({ isAdmin }) {
	const theme = useTheme();

	const [mobileOpen, setMobileOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};

	return (
		<>
			<CssBaseline />
			<TopMenu onHandleDrawerToggle={handleDrawerToggle} />
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'
			>
				<Drawer
					variant='temporary'
					open={mobileOpen}
					onTransitionEnd={handleDrawerTransitionEnd}
					onClose={handleDrawerClose}
					ModalProps={{
						keepMounted: true
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							backgroundColor: theme.palette.secondary.main
						}
					}}
				>
					<DrawerItems isAdmin={isAdmin} />
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
							backgroundColor: theme.palette.secondary.main
						}
					}}
					open
				>
					<DrawerItems isAdmin={isAdmin} />
				</Drawer>
			</Box>
		</>
	);
}

NavigationMenu.propTypes = {
	isAdmin: PropTypes.bool
};
