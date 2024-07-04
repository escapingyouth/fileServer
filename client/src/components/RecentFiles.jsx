import { useFile } from '../contexts/FileContext';
import { DataGrid } from '@mui/x-data-grid';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { Box } from '@mui/material';

const columns = [
	{
		field: 'filename',
		headerName: 'File name',
		width: 240
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
		width: 150,
		renderCell: (params) => params.value
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

export default function RecentFiles() {
	const { fileStats, loading } = useFile();

	const recentFiles =
		fileStats?.recentFiles?.map((file) => ({
			id: file._id,
			filename: file.title,
			size: file.size,
			dateModified: formatDate(file.uploadedAt),
			fileType: getFileIcon(file.mimetype),
			description: file.description
		})) || [];

	return (
		<Box sx={{ height: '400px', width: '100%' }}>
			<DataGrid
				rows={recentFiles}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 }
					}
				}}
				pageSizeOptions={[5, 10]}
				autoPageSize={true}
				disableColumnResize={true}
				disableRowSelectionOnClick={true}
				disableColumnSorting={true}
				disableColumnSelector={true}
				disableColumnMenu={true}
				loading={loading}
				sx={{
					'& .MuiDataGrid-columnHeader': {
						backgroundColor: '#F9FAFC',
						color: '#6B7280',
						textAlign: 'center',
						justifyContent: 'center',
						display: 'flex',
						alignItems: 'center'
					},
					'& .MuiDataGrid-cell': {
						textAlign: 'center',
						justifyContent: 'center',
						display: 'flex',
						alignItems: 'center'
					},
					'& .MuiDataGrid-columnHeaderDraggableContainer': {
						width: 'max-content'
					},
					'& .MuiDataGrid-row': {
						'& .MuiDataGrid-cell': {
							padding: '8px'
						}
					}
				}}
			/>
		</Box>
	);
}
