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
	const [fileStats, setFileStats] = useState({});

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

	useEffect(() => {
		const fetchFileStats = async () => {
			setLoading(true);
			try {
				const { data } = await axios.get(`${url}/api/files/stats`);

				setFileStats(data.data.stats);
			} catch (error) {
				showSnackbar(error.response.data.message, 'error');
			} finally {
				setLoading(false);
			}
		};
		fetchFileStats();
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

	const moveToTrash = async (id) => {
		try {
			await axios.patch(`${url}/api/files/trash/${id}`, {});

			setFiles((prevFiles) =>
				prevFiles.filter((file) => file._id !== id && !file.isTrashed)
			);
			showSnackbar('File moved to trash successfully!', 'warning');
		} catch (error) {
			showSnackbar(error.response.data.message, 'error');
		}
	};

	const restoreFile = async (id) => {
		try {
			const { data } = await axios.patch(`${url}/api/files/restore/${id}`, {});

			const restoredFile = data.data.file;

			setFiles((prevFiles) => [
				...prevFiles.filter((file) => file._id !== id),
				restoredFile
			]);
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
			const { data } = await axios.patch(`${url}/api/files/${id}`, updateData);

			const updatedFile = data.data.file;

			setFiles((prevFiles) => {
				const updatedFiles = prevFiles.map((file) => {
					if (file._id === updatedFile._id) {
						return updatedFile;
					}
					return file;
				});
				return updatedFiles;
			});

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
			await axios.post(`${url}/api/files/email`, emailData);
			showSnackbar('File emailed successfully!');
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
				moveToTrash,
				restoreFile,
				favoriteFile,
				deleteFile,
				updateFile,
				emailFile,
				fileStats,
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
