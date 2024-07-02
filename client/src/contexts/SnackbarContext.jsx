import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success'
	});

	const showSnackbar = (message, severity = 'success') => {
		setSnackbar({ open: true, message, severity });
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({ ...snackbar, open: false });
	};

	return (
		<SnackbarContext.Provider value={{ showSnackbar }}>
			{children}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={2000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={snackbar.severity}
					variant='filled'
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};

export function useSnackbar() {
	const context = useContext(SnackbarContext);
	if (!context) {
		throw new Error('useSnackbar must be used within a SnackbarProvider');
	}
	return context;
}

SnackbarProvider.propTypes = {
	children: PropTypes.node
};
