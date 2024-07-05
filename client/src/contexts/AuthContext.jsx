import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSnackbar } from './SnackbarContext';

const AuthContext = createContext();

const url = import.meta.env.VITE_SERVER_URL;

export const AuthProvider = ({ children }) => {
	const { showSnackbar } = useSnackbar();
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [userStats, setUserStats] = useState({});

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchUsers() {
			try {
				setLoading(true);

				const { data } = await axios.get(`${url}/api/users`, {
					withCredentials: true
				});
				const users = data.data.users;

				setUsers(
					users.map((user) => ({
						id: user._id,
						name: user.name,
						email: user.email,
						photo: user.photo,
						active: user.active
					}))
				);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		fetchUsers();
	}, []);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { data } = await axios.get(`${url}/api/users/me`, {
					withCredentials: true
				});
				setUser(data.data.user);
			} catch (error) {
				console.log(error);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		checkAuth();
	}, []);

	useEffect(() => {
		const fetchUserStats = async () => {
			setLoading(true);
			try {
				const { data } = await axios.get(`${url}/api/users/stats`);
				setUserStats(data.data.stats);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchUserStats();
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
			console.log(error);
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

			setUser(data.data.user);
			showSnackbar('User successfully updated!');

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

	const updateUser = async (userId, formData) => {
		try {
			setLoading(true);
			await axios.patch(`${url}/api/users/${userId}`, formData, {
				withCredentials: true
			});
			showSnackbar('User edited successfully!', 'info');
			setSubmitted(false);

			navigate('admin/users');
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

	const deleteMe = async () => {
		try {
			await axios.delete(`${url}/api/users/deleteMe`, {
				withCredentials: true
			});
			setUser(null);
			showSnackbar('User account deleted!');
			navigate('/');
		} catch (error) {
			console.log(error);
			showSnackbar(error.response.data.message, 'error');
		}
	};
	const deleteUser = async (userId) => {
		try {
			await axios.delete(`${url}/api/users/${userId}`, {
				withCredentials: true
			});
			setUsers(users.filter((user) => user.id !== userId));
			showSnackbar('User deleted!', 'warning');
		} catch (error) {
			console.log(error);
			showSnackbar(error.response.data.message, 'error');
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				users,
				login,
				signup,
				forgotPassword,
				resetPassword,
				logout,
				updateMe,
				updateUser,
				updateMyPassword,
				deleteMe,
				deleteUser,
				userStats,
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
