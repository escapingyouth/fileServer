import { useState } from 'react';
import { useFile } from '../../contexts/FileContext';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

export default function ActionMenu({ fileId }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const { moveToTrash, deleteFile } = useFile();
	const navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		navigate(`/admin/edit/file/${fileId}`);
		handleClose();
	};

	const handleDelete = async () => {
		await deleteFile(fileId);
		handleClose();
	};
	const handleMoveToTrash = async () => {
		await moveToTrash(fileId);
		handleClose();
	};

	return (
		<div>
			<IconButton
				aria-label='more'
				aria-controls={open ? 'action-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup='true'
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id='action-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch'
					}
				}}
			>
				<MenuItem onClick={handleEdit}>Edit</MenuItem>
				<MenuItem onClick={handleMoveToTrash}>Trash</MenuItem>
				<MenuItem onClick={handleDelete}>Delete</MenuItem>
			</Menu>
		</div>
	);
}

ActionMenu.propTypes = {
	fileId: PropTypes.string
};
