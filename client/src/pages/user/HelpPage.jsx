import PageLayout from '../../components/layouts/PageLayout';
import {
	Typography,
	Grid,
	Stack,
	Box,
	Link,
	List,
	ListItem,
	ListItemText
} from '@mui/material';

export default function HelpPage() {
	return (
		<PageLayout>
			<Stack
				sx={{
					ml: '1.6rem',
					mt: '1rem'
				}}
			>
				<Typography
					variant='h4'
					component='h1'
					sx={{
						fontWeight: 'bold',
						mb: '3rem',
						color: '#050A44',
						fontSize: {
							xs: '1.5rem',
							md: '2rem'
						}
					}}
				>
					How to navigate file server
				</Typography>

				<Box>
					<Typography
						variant='h5'
						component='h2'
						sx={{
							fontWeight: 'bold',
							mb: '1.2rem',
							fontSize: {
								xs: '1.2rem',
								md: '1.7rem'
							}
						}}
					>
						1. Dashboard
					</Typography>

					<Grid container spacing={{ xs: 2, md: 3 }}></Grid>
				</Box>
				<Box sx={{ mt: '6rem' }}>
					<Typography
						variant='h5'
						component='h2'
						sx={{
							fontWeight: 'bold',
							mb: '1.2rem',
							fontSize: {
								xs: '1.2rem',
								md: '1.7rem'
							}
						}}
					>
						2. File Download and Email
					</Typography>

					<Grid container spacing={{ xs: 6, xl: 12 }}>
						<Grid item xl={6}>
							<Typography
								variant='h6'
								component='h3'
								gutterBottom
								sx={{
									fontWeight: 'semi-bold',
									fontSize: {
										xs: '1rem',
										md: '1.2rem'
									}
								}}
							>
								Downloading Files
							</Typography>
							<Typography
								variant='body1'
								component='p'
								gutterBottom
								sx={{
									height: '72px'
								}}
							>
								To download a file, simply click on the{' '}
								<Typography
									component='span'
									sx={{
										fontWeight: 'medium'
									}}
								>
									downlod icon
								</Typography>{' '}
								under the field name called{' '}
								<Typography
									component='span'
									sx={{
										fontWeight: 'medium'
									}}
								>
									&apos;Download&apos;
								</Typography>{' '}
								in the file list. Your browser will prompt you to save the file
								to your computer.
							</Typography>
							<Box
								sx={{
									backgroundImage: 'url(/images/help/downloading-files.PNG)',
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'contain',
									backgroundPosition: 'center',
									height: '250px',
									mt: '1.5rem'
								}}
							/>
						</Grid>
						<Grid item xl={6}>
							<Typography
								variant='h6'
								component='h3'
								gutterBottom
								sx={{
									fontWeight: 'semi-bold',
									fontSize: {
										xs: '1rem',
										md: '1.2rem'
									}
								}}
							>
								Emailing Files
							</Typography>
							<Typography
								variant='body1'
								component='p'
								gutterBottom
								sx={{
									height: '72px'
								}}
							>
								You can email files directly from the app. Simply fill out the
								form with the recipient&apos;s email, subject, and message, then
								select the file you want to attach.
							</Typography>
							<Box
								sx={{
									backgroundImage: 'url(/images/help/emailing-file.PNG)',
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'contain',
									backgroundPosition: 'center',
									height: '250px',
									mt: '1.5rem'
								}}
							/>
						</Grid>
					</Grid>
				</Box>
				<Box sx={{ mt: '6rem' }}>
					<Typography
						variant='h5'
						component='h2'
						sx={{
							fontWeight: 'bold',
							mb: '1.2rem',
							fontSize: {
								xs: '1.2rem',
								md: '1.7rem'
							}
						}}
					>
						3. User Authentication and Authorization
					</Typography>

					<Grid container spacing={{ xs: 6, xl: 12 }}>
						<Grid item xl={6}>
							<Typography
								variant='h6'
								component='h3'
								gutterBottom
								sx={{
									fontWeight: 'semi-bold',
									fontSize: {
										xs: '1rem',
										md: '1.2rem'
									}
								}}
							>
								Signing Up
							</Typography>
							<Typography
								variant='body1'
								component='p'
								gutterBottom
								sx={{
									height: '96px'
								}}
							>
								To access the file server, you&apos;ll need to sign up for an
								account. Fill out the registration form with your personal
								information (name and email), and you&apos;ll be able to log in
								and manage your files.
							</Typography>
							<Box
								sx={{
									backgroundImage: 'url(/images/help/signing-up.PNG)',
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'contain',
									backgroundPosition: 'center',
									height: '250px',
									mt: '1.5rem'
								}}
							/>
						</Grid>
						<Grid item xl={6}>
							<Typography
								variant='h6'
								component='h3'
								gutterBottom
								sx={{
									fontWeight: 'semi-bold',
									fontSize: {
										xs: '1rem',
										md: '1.2rem'
									}
								}}
							>
								Logging in
							</Typography>
							<Typography
								variant='body1'
								component='p'
								gutterBottom
								sx={{
									height: '96px'
								}}
							>
								To access the file server, you&apos;ll also need to log into
								your account. Fill out the log in form with your personal
								information(email and password) , and you&apos;ll be able to log
								in and manage your files.
							</Typography>
							<Box
								sx={{
									backgroundImage: 'url(/images/help/logging-in.PNG)',
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'contain',
									backgroundPosition: 'center',
									height: '250px',
									mt: '1.5rem'
								}}
							/>
						</Grid>
						<Grid item xl={6}>
							<Typography
								variant='h6'
								component='h3'
								gutterBottom
								sx={{
									fontWeight: 'semi-bold',
									fontSize: {
										xs: '1rem',
										md: '1.2rem'
									}
								}}
							>
								Forgot Password
							</Typography>
							<Typography
								variant='body1'
								component='p'
								gutterBottom
								sx={{
									height: '96px'
								}}
							>
								In case you forget your password, you have the ability to reset
								by filling in your user email address. A link will then be sent
								to your email so you can reset your password
							</Typography>
							<Box
								sx={{
									backgroundImage: 'url(/images/help/forgot-password.PNG)',
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'contain',
									backgroundPosition: 'center',
									height: '250px',
									mt: '1.5rem'
								}}
							/>
						</Grid>
						<Grid item xl={6}>
							<Typography
								variant='h6'
								component='h3'
								gutterBottom
								sx={{
									fontWeight: 'semi-bold',
									fontSize: {
										xs: '1rem',
										md: '1.2rem'
									}
								}}
							>
								Reset Password
							</Typography>
							<Typography
								variant='body1'
								component='p'
								gutterBottom
								sx={{
									height: '96px'
								}}
							>
								Once you access the reset link available in your email, you can
								now proceed to reset your password by entering the new password
								and confirming it
							</Typography>
							<Box
								sx={{
									backgroundImage: 'url(/images/help/reset-password.PNG)',
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'contain',
									backgroundPosition: 'center',
									height: '250px',
									mt: '1.5rem'
								}}
							/>
						</Grid>
					</Grid>
				</Box>
				<Box sx={{ mt: '6rem' }}>
					<Typography
						variant='h5'
						component='h2'
						sx={{
							fontWeight: 'bold',
							fontSize: {
								xs: '1.2rem',
								md: '1.7rem'
							}
						}}
					>
						4. Technical Support
					</Typography>

					<List>
						<ListItem>
							<ListItemText primary='Email: mke.appiah@gmail.com' />
						</ListItem>
						<ListItem>
							<ListItemText primary='Phone: (+233)-717-1866' />
						</ListItem>
						<ListItem>
							<ListItemText primary='Support Hours: Monday to Friday, 9 AM - 5 PM' />
						</ListItem>
					</List>

					<Typography paragraph>
						For more detailed technical documentation and source code, please
						refer to our GitHub repository:{' '}
						<Link
							href='https://github.com/escapingyouth/fileServer'
							target='_blank'
							rel='noopener'
						>
							GitHub - File Server
						</Link>
					</Typography>
				</Box>
			</Stack>
		</PageLayout>
	);
}
