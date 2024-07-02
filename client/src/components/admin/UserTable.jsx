import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../contexts/SnackbarContext';
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
	const [users, setUsers] = useState([]);
	const [loading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { showSnackbar } = useSnackbar();

	useEffect(() => {
		async function fetchUsers() {
			try {
				setIsLoading(true);

				const res = await axios.get(`${url}/api/users`, {
					withCredentials: true
				});
				const users = res.data.data.users;
				console.log(res);
				console.log(users);

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
				showSnackbar(`${error.message}. Try refreshing the page`, 'error');
			} finally {
				setIsLoading(false);
			}
		}
		fetchUsers();
	}, []);

	const handleEditUser = async (userId) => {
		navigate(`/admin/edit/user/${userId}`);
	};
	const handleDeleteUser = async (userId) => {
		try {
			axios
				.delete(`${url}/api/users/${userId}`, {
					withCredentials: true
				})
				.then(() => {
					showSnackbar('User deleted!', 'warning');
					setUsers(users.filter((user) => user.id !== userId));
				})
				.catch((error) => {
					showSnackbar(error.message, 'error');
				});
		} catch (error) {
			console.log(error);
			showSnackbar(error.message, 'error');
		}
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
