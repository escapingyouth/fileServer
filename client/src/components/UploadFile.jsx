import React from 'react';
import { MuiFileInput } from 'mui-file-input';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function UploadFile() {
	const [value, setValue] = React.useState(null);

	const handleChange = (newValue) => {
		setValue(newValue);
	};

	return (
		<MuiFileInput
			value={value}
			onChange={handleChange}
			fullWidth
			multiple
			variant='outlined'
			placeholder='Upload Files'
			InputProps={{
				startAdornment: <AttachFileIcon color='primary' />
			}}
			sx={{
				mb: '2rem',
				fontFamily: 'inherit',
				'& .css-1fel157 span.MuiFileInput-placeholder': {
					color: 'primary.main'
				}
			}}
		/>
	);
}
