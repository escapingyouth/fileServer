import PropTypes from 'prop-types';

import NavigationMenu from '../NavigationMenu';

import { Box, Toolbar } from '@mui/material';

export default function PageLayout({ children }) {
	const drawerWidth = 240;

	return (
		<Box sx={{ display: 'flex' }}>
			<NavigationMenu />

			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
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
	children: PropTypes.node
};
