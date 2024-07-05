import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Tooltip, IconButton, Avatar } from '@mui/material';

const url = import.meta.env.VITE_SERVER_URL;

const columns = (handleEditUser, handleDeleteUser) => [
	{
		field: 'name',
		headerName: 'Name',
		width: 250
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 250
	},
	{
		field: 'photo',
		headerName: 'Photo',
		width: 250,
		renderCell: (params) => (
			<Avatar
				alt={params.row.name}
				src={`${url}/img/users/${params.row.photo}`}
				sx={{
					width: 35,
					height: 35
				}}
			/>
		)
	},
	{
		field: 'edit',
		headerName: 'Edit User',
		width: 150,
		renderCell: (params) => (
			<Tooltip title='Edit'>
				<IconButton onClick={() => handleEditUser(params.row.id)}>
					<EditIcon color='info' />
				</IconButton>
			</Tooltip>
		)
	},

	{
		field: 'delete',
		headerName: 'Delete User',
		width: 150,
		renderCell: (params) => (
			<Tooltip title='Delete'>
				<IconButton onClick={() => handleDeleteUser(params.row.id)}>
					<DeleteForeverIcon color='error' />
				</IconButton>
			</Tooltip>
		)
	}
];

export default function UserTable() {
	const { users, deleteUser, loading } = useAuth();
	const navigate = useNavigate();

	const handleEditUser = async (userId) => {
		navigate(`/admin/edit/user/${userId}`);
	};
	const handleDeleteUser = async (userId) => {
		await deleteUser(userId);
	};

	return (
		<>
			<Box sx={{ height: 400, width: '100%' }}>
				<DataGrid
					rows={users}
					columns={columns(handleEditUser, handleDeleteUser)}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 }
						}
					}}
					pageSizeOptions={[5, 10]}
					disableColumnResize={true}
					disableRowSelectionOnClick={true}
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
		</>
	);
}
