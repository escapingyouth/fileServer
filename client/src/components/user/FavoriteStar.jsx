import { useState } from 'react';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import { useSnackbar } from '../../contexts/SnackbarContext';
import PropTypes from 'prop-types';

const api = import.meta.env.VITE_APP_API;

export default function FavoriteStar({ fileId, isFavorite, onFavoriteChange }) {
	const { showSnackbar } = useSnackbar();
	const [favorite, setFavorite] = useState(isFavorite);

	const handleToggleFavorite = async () => {
		try {
			await axios.patch(`${api}/files/${fileId}`, {
				isFavorite: !favorite
			});
			setFavorite(!favorite);
			onFavoriteChange(fileId, !favorite);
			showSnackbar('File successfully favorited!', 'info');
		} catch (error) {
			console.log(error);
			showSnackbar(error.message, 'error');
		}
	};

	return (
		<Tooltip title='Favorite'>
			<IconButton onClick={handleToggleFavorite}>
				{favorite ? <StarIcon style={{ color: 'gold' }} /> : <StarBorderIcon />}
			</IconButton>
		</Tooltip>
	);
}

FavoriteStar.propTypes = {
	fileId: PropTypes.string,
	isFavorite: PropTypes.bool,
	onFavoriteChange: PropTypes.func
};
