import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSnackbar } from './SnackbarContext';

const AuthContext = createContext();

const url = import.meta.env.VITE_SERVER_URL;

export const AuthProvider = ({ children }) => {
	const { showSnackbar } = useSnackbar();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { data } = await axios.get(`${url}/api/users/me`, {
					withCredentials: true
				});
				setUser(data.data.user);
			} catch (error) {
				setUser(null);
			}
			setLoading(false);
		};
		checkAuth();
	}, []);

	const login = async (email, password) => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${url}/api/users/login`,
				{
					email,
					password
				},
				{
					withCredentials: true
				}
			);
			setUser(data.data.user);

			showSnackbar('Log in successful!');
			setSubmitted(false);

			if (data.data.user.role === 'admin') {
				navigate('admin/dashboard');
			} else {
				navigate('user/dashboard');
			}
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
				`${url}/api/users/signup`,
				{ name, email, password, passwordConfirm },
				{ withCredentials: true }
			);

			setUser(data.data.user);
			showSnackbar('Sign up successful!');
			setSubmitted(false);

			if (data.data.user.role === 'admin') {
				navigate('admin/dashboard');
			} else {
				navigate('user/dashboard');
			}
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
			await axios.get(`${url}/api/users/logout`, {
				withCredentials: true
			});
			setUser(null);
			showSnackbar('Logged out!');
			navigate('/auth/login');
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	const forgotPassword = async (email) => {
		try {
			setLoading(true);
			await axios.post(
				`${url}/api/users/forgotPassword`,
				{ email },
				{ withCredentials: true }
			);

			showSnackbar('Password reset link sent! Check your email');
			setSubmitted(false);
		} catch (error) {
			console.log(error);
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	const resetPassword = async (token, password, passwordConfirm) => {
		try {
			setLoading(true);
			await axios.patch(
				`${url}/api/users/resetPassword/${token}`,
				{ password, passwordConfirm },
				{ withCredentials: true }
			);

			showSnackbar('Password reset successful!');
			setSubmitted(false);
			navigate('/auth/login');
		} catch (error) {
			console.log(error);
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	const updateMe = async (formData) => {
		try {
			setLoading(true);
			const { data } = await axios.patch(
				`${url}/api/users/updateMe`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					withCredentials: true
				}
			);
			console.log(formData);
			console.log(data);

			setUser(data.data.user);
			showSnackbar('User successfully updated!');

			navigate('user/dashboard');
		} catch (error) {
			console.log(error);
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};
	const updateMyPassword = async (
		passwordCurrent,
		password,
		passwordConfirm
	) => {
		try {
			setLoading(true);
			const { data } = await axios.patch(
				`${url}/api/users/updateMyPassword`,
				{ passwordCurrent, password, passwordConfirm },
				{
					withCredentials: true
				}
			);

			setUser(data.data.user);
			showSnackbar('Password successfully updated!');
			setSubmitted(false);

			navigate('user/dashboard');
		} catch (error) {
			console.log(error);
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	const deleteMe = async () => {
		try {
			await axios.delete(`${url}/api/users/deleteMe`, {
				withCredentials: true
			});
			setUser(null);
			showSnackbar('User account deleted!');
			navigate('/');
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				signup,
				forgotPassword,
				resetPassword,
				logout,
				updateMe,
				updateMyPassword,
				deleteMe,
				loading,
				submitted,
				setSubmitted
			}}
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
