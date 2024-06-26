import PropTypes from 'prop-types';

import NavigationMenu from '../NavigationMenu';

import { Box, Toolbar } from '@mui/material';

export default function PageLayout({ isAdmin, children }) {
	const drawerWidth = 240;

	return (
		<Box sx={{ display: 'flex' }}>
			<NavigationMenu isAdmin={isAdmin} />

			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					// height:''
					width: { sm: `calc(100% - ${drawerWidth}px)` }
				}}
			>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
}

PageLayout.propTypes = {
	isAdmin: PropTypes.bool,
	children: PropTypes.node
};
