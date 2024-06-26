import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box } from '@mui/material';
import { useSnackbar } from '../../contexts/SnackbarContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const api = import.meta.env.VITE_APP_API;

const columns = (handleDeleteFile) => [
	{
		field: 'filename',
		headerName: 'File name',
		width: 250
	},
	{
		field: 'description',
		headerName: 'Description',
		width: 400
	},
	{
		field: 'dateModified',
		headerName: 'Date Modified',
		width: 150
	},
	{
		field: 'size',
		headerName: 'Size',
		width: 150,
		type: 'number',
		valueFormatter: (params) => formatFileSize(params)
	},
	{
		field: 'fileType',
		headerName: 'File Type',
		width: 100,
		renderCell: (params) => params.value
	},
	{
		field: 'delete',
		headerName: 'Delete',
		width: 100,
		renderCell: (params) => (
			<DeleteForeverIcon onClick={() => handleDeleteFile(params.row.id)} />
		)
	}
];

const formatFileSize = (sizeInBytes) => {
	if (sizeInBytes < 1024) {
		return `${sizeInBytes} Bytes`;
	} else if (sizeInBytes < 1048576) {
		return `${(sizeInBytes / 1024).toFixed(2)} KB`;
	} else {
		return `${(sizeInBytes / 1048576).toFixed(2)} MB`;
	}
};

const formatDate = (dateString) => {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, options);
};

const getFileIcon = (mimetype) => {
	const extension = mimetype.split('/').pop().toLowerCase();
	switch (extension) {
		case 'pdf':
			return <PictureAsPdfIcon color='warning' />;
		case 'jpg':
		case 'jpeg':
		case 'png':
		case 'gif':
			return <ImageIcon color='success' />;
		case 'doc':
		case 'docx':
		case 'txt':
			return <DescriptionIcon color='info' />;
		default:
			return <InsertDriveFileIcon color='info' />;
	}
};

export default function TrashPage() {
	const [files, setFiles] = useState([]);
	const [loading, setIsLoading] = useState(false);
	const { showSnackbar } = useSnackbar();

	useEffect(() => {
		async function fetchFiles() {
			try {
				setIsLoading(true);
				const res = await axios.get(`${api}/files`);
				const files = res.data.data.files;

				setFiles(
					files
						.filter((file) => file.isTrashed)
						.map((file) => ({
							id: file._id,
							filename: file.title,
							size: file.size,
							dateModified: formatDate(file.uploadedAt),
							fileType: getFileIcon(file.mimetype),
							description: file.description
						}))
				);
			} catch (error) {
				showSnackbar(error.message, 'error');
			} finally {
				setIsLoading(false);
			}
		}
		fetchFiles();
	}, []);

	const handleDeleteFile = async (fileId) => {
		try {
			await axios.delete(`${api}/files/${fileId}`);
			setFiles(files.filter((file) => file.id !== fileId));
			showSnackbar('File deleted successfully!');
		} catch (error) {
			showSnackbar(error.message, 'error');
		}
	};

	return (
		<Box sx={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={files}
				columns={columns(handleDeleteFile)}
				loading={loading}
			/>
		</Box>
	);
}
