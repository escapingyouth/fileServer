import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './utils/theme.js';
import { SnackbarProvider } from './contexts/SnackbarContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<SnackbarProvider>
					<AuthProvider>
						<App />
					</AuthProvider>
				</SnackbarProvider>
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
);
