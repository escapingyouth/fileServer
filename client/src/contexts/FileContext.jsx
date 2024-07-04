import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSnackbar } from './SnackbarContext';

const FileContext = createContext();

const url = import.meta.env.VITE_SERVER_URL;

export const FileProvider = ({ children }) => {
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const { showSnackbar } = useSnackbar();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchFiles = async () => {
			setLoading(true);
			try {
				const { data } = await axios.get(`${url}/api/files`);
				setFiles(data.data.files);
			} catch (error) {
				showSnackbar(error.response.data.message, 'error');
			} finally {
				setLoading(false);
			}
		};
		fetchFiles();
	}, []);

	const getFile = async (id) => {
		try {
			const { data } = await axios.get(`${url}/api/files/${id}`);
			return data.data.file;
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		}
	};

	const uploadFile = async (formData) => {
		try {
			setLoading(true);
			const { data } = await axios.post(`${url}/api/files`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			setFiles([...files, data.data.file]);
			showSnackbar('File uploaded successfully!');
			setSubmitted(false);
			navigate('/admin/files');
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	const downloadFile = async (id, fileName) => {
		try {
			const response = await axios.get(`${url}/api/files/download/${id}`, {
				responseType: 'blob'
			});
			console.log(response);

			const url = window.URL.createObjectURL(new Blob([response.data]));

			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', fileName);
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);

			showSnackbar('File successfully downloaded!');
		} catch (error) {
			console.log(error);
			// showSnackbar(error.response.data.message, 'error');
		}
	};

	const moveToTrash = async (id) => {
		try {
			await axios.patch(`${url}/api/files/trash/${id}`, {});
			setFiles(files.filter((file) => file._id !== id));
			showSnackbar('File moved to trash successfully!', 'warning');
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		}
	};

	const restoreFile = async (id) => {
		try {
			await axios.patch(`${url}/api/files/restore/${id}`, {});
			setFiles(files.filter((file) => file._id !== id));
			showSnackbar('File restored!');
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		}
	};

	const deleteFile = async (id) => {
		try {
			await axios.delete(`${url}/api/files/${id}`);
			setFiles(files.filter((file) => file._id !== id));
			showSnackbar('File deleted successfully!');
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		}
	};

	const updateFile = async (id, updateData) => {
		try {
			setLoading(true);
			await axios.patch(`${url}/api/files/${id}`, updateData);

			showSnackbar('File updated successfully!', 'info');
			setSubmitted(false);
			navigate('/admin/files');
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	const favoriteFile = async (id, isFavorite) => {
		try {
			await axios.patch(`${url}/api/files/${id}`, {
				isFavorite
			});
			setFiles(
				files.map((file) => (file._id === id ? { ...file, isFavorite } : file))
			);
			showSnackbar('Done!', 'info');
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		}
	};

	const emailFile = async (emailData) => {
		try {
			setLoading(true);
			await axios.post(`${url}/api/files/email`, emailData, {
				withCredentials: true
			});
			showSnackbar('File emailed successfully!');
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	const getFileStats = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`${url}/api/files/stats`, {
				withCredentials: true
			});
			return data.data.stats;
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<FileContext.Provider
			value={{
				files,
				getFile,
				uploadFile,
				downloadFile,
				moveToTrash,
				restoreFile,
				favoriteFile,
				deleteFile,
				updateFile,
				emailFile,
				getFileStats,
				loading,
				submitted,
				setSubmitted
			}}
		>
			{children}
		</FileContext.Provider>
	);
};

export function useFile() {
	const context = useContext(FileContext);
	if (!context) {
		throw new Error('useFile must be used within a FileProvider');
	}
	return context;
}

FileProvider.propTypes = {
	children: PropTypes.node.isRequired
};
