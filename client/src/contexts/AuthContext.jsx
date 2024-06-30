import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSnackbar } from './SnackbarContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const { showSnackbar } = useSnackbar();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { data } = await axios.get('http://localhost:8000/api/users/me', {
					withCredentials: true
				});
				setUser(data.data.user);
				console.log(data.data.user);
			} catch (error) {
				setUser(null);
			}
			setLoading(false);
		};
		checkAuth();
	}, [user]);

	const login = async (email, password) => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				'http://localhost:8000/api/users/login',
				{
					email,
					password
				},
				{
					withCredentials: true
				}
			);
			setUser(data.data.user);
			console.log(data.data.user);
			showSnackbar('Log in successful!');
			setSubmitted(false);
			navigate('user/dashboard');
		} catch (error) {
			console.log(error);
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	const signup = async (name, email, password, passwordConfirm) => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				'http://localhost:8000/api/users/signup',
				{ name, email, password, passwordConfirm },
				{ withCredentials: true }
			);

			setUser(data.data.user);
			showSnackbar('Sign up successful!');
			setSubmitted(false);
			navigate('user/dashboard');
		} catch (error) {
			console.log(error);
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		try {
			setLoading(true);
			await axios.get('http://localhost:8000/api/users/logout', {
				withCredentials: true
			});
			setUser(null);
			showSnackbar('User logged out');
			navigate('/login');
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, login, signup, logout, loading, submitted, setSubmitted }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

AuthProvider.propTypes = {
	children: PropTypes.node
};
