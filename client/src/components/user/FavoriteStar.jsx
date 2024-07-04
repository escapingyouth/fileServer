import { useState } from 'react';
import { useFile } from '../../contexts/FileContext';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

export default function FavoriteStar({ fileId, isFavorite }) {
	const [favorite, setFavorite] = useState(isFavorite);
	const { favoriteFile } = useFile();

	const handleToggleFavorite = async () => {
		await favoriteFile(fileId, !favorite);
		setFavorite(!favorite);
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
	isFavorite: PropTypes.bool
};
