import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: { main: '#050A44' },
		secondary: { main: '#101727' },
		tertiary: { main: '#0057FF' }
	},
	typography: {
		fontFamily: 'Inter, sans-serif',
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 600
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			'2xl': 1536
		}
	}
});

export default theme;
