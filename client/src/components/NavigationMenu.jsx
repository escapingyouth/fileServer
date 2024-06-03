import { useState } from 'react';
import PropTypes from 'prop-types';

import { styled, useTheme } from '@mui/material/styles';
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	CssBaseline,
	Divider,
	IconButton
} from '@mui/material';

import MuiDrawer from '@mui/material/Drawer';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Logo from './Logo';
import TopMenu from './TopMenu';

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden'
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`
	}
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme)
	})
}));

export default function NavigationMenu({ menuItems }) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<TopMenu open={open} onHandleDrawerOpen={handleDrawerOpen} />

			<Drawer
				variant='permanent'
				open={open}
				sx={{
					'& .MuiDrawer-paper': {
						backgroundColor: theme.palette.secondary.main
					}
				}}
			>
				<DrawerHeader>
					<Logo />

					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon
								sx={{
									color: '#fff'
								}}
							/>
						) : (
							<ChevronLeftIcon
								sx={{
									color: '#fff'
								}}
							/>
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{menuItems?.map((item) => (
						<ListItem
							key={item.text}
							disablePadding
							sx={{
								display: 'block',
								color: '#fff',
								'&:hover': {
									backgroundColor: '#1E2736'
								},
								'&:active': {
									backgroundColor: '#1E2736'
								}
							}}
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
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
										color: '#fff'
									}}
								>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									primary={item.text}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
			</Box>
		</Box>
	);
}

NavigationMenu.propTypes = {
	menuItems: PropTypes.array
};
