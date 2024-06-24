import PageLayout from '../../components/layouts/PageLayout';
import { Typography, List, ListItem, ListItemText, Link } from '@mui/material';

export default function HelpPage() {
	return (
		<PageLayout>
			<Typography variant='h2' gutterBottom>
				File Server Help Page
			</Typography>

			<Typography variant='h4' gutterBottom>
				Getting Started
			</Typography>

			<Typography variant='h5' gutterBottom>
				Sign Up
			</Typography>
			<Typography paragraph>To create an account:</Typography>
			<List>
				<ListItem>
					<ListItemText primary='1. Go to the Sign-Up page.' />
				</ListItem>
				<ListItem>
					<ListItemText primary='2. Enter your email address and choose a password.' />
				</ListItem>
				<ListItem>
					<ListItemText primary="3. Click on the 'Sign Up' button." />
				</ListItem>
				<ListItem>
					<ListItemText primary='4. You will receive a verification email. Follow the instructions in the email to verify your account.' />
				</ListItem>
			</List>

			<Typography variant='h5' gutterBottom>
				Log In
			</Typography>
			<Typography paragraph>To log in to your account:</Typography>
			<List>
				<ListItem>
					<ListItemText primary='1. Go to the Log In page.' />
				</ListItem>
				<ListItem>
					<ListItemText primary='2. Enter your registered email address and password.' />
				</ListItem>
				<ListItem>
					<ListItemText primary="3. Click on the 'Log In' button." />
				</ListItem>
			</List>

			<Typography variant='h5' gutterBottom>
				Account Verification
			</Typography>
			<Typography paragraph>
				After signing up, you need to verify your email address:
			</Typography>
			<List>
				<ListItem>
					<ListItemText primary='1. Check your email for a verification message from File Server.' />
				</ListItem>
				<ListItem>
					<ListItemText primary='2. Click on the verification link provided in the email.' />
				</ListItem>
				<ListItem>
					<ListItemText primary='3. Your account will be verified, and you can now log in.' />
				</ListItem>
			</List>

			<Typography variant='h5' gutterBottom>
				Reset Password
			</Typography>
			<Typography paragraph>If you forget your password:</Typography>
			<List>
				<ListItem>
					<ListItemText primary='1. Go to the Reset Password page.' />
				</ListItem>
				<ListItem>
					<ListItemText primary='2. Enter your registered email address.' />
				</ListItem>
				<ListItem>
					<ListItemText primary="3. Click on the 'Reset Password' button." />
				</ListItem>
				<ListItem>
					<ListItemText primary='4. Check your email for a password reset link and follow the instructions to create a new password.' />
				</ListItem>
			</List>

			<Typography variant='h4' gutterBottom>
				User Guide
			</Typography>

			<Typography variant='h5' gutterBottom>
				Feed Page
			</Typography>
			<Typography paragraph>
				The Feed Page displays a list of available files for download. You can
				browse through the files to find the documents you need.
			</Typography>

			<Typography variant='h5' gutterBottom>
				Search Files
			</Typography>
			<Typography paragraph>To search for a specific file:</Typography>
			<List>
				<ListItem>
					<ListItemText primary='1. Use the search bar at the top of the Feed Page.' />
				</ListItem>
				<ListItem>
					<ListItemText primary='2. Enter keywords related to the file you are looking for.' />
				</ListItem>
				<ListItem>
					<ListItemText primary='3. Press Enter or click the search icon to view the results.' />
				</ListItem>
			</List>

			<Typography variant='h5' gutterBottom>
				Send Files via Email
			</Typography>
			<Typography paragraph>To send a file to an email address:</Typography>
			<List>
				<ListItem>
					<ListItemText primary='1. Find the file you want to send in the Feed Page or search results.' />
				</ListItem>
				<ListItem>
					<ListItemText primary="2. Click on the 'Send via Email' button next to the file." />
				</ListItem>
				<ListItem>
					<ListItemText primary="3. Enter the recipient's email address." />
				</ListItem>
				<ListItem>
					<ListItemText primary="4. Click on the 'Send' button." />
				</ListItem>
			</List>

			<Typography variant='h4' gutterBottom>
				Admin Guide
			</Typography>

			<Typography variant='h5' gutterBottom>
				Upload Files
			</Typography>
			<Typography paragraph>
				As an admin, you can upload new files to the server:
			</Typography>
			<List>
				<ListItem>
					<ListItemText primary='1. Log in to your admin account.' />
				</ListItem>
				<ListItem>
					<ListItemText primary='2. Go to the Admin Dashboard.' />
				</ListItem>
				<ListItem>
					<ListItemText primary="3. Click on the 'Upload File' button." />
				</ListItem>
				<ListItem>
					<ListItemText primary='4. Fill in the required details: title, description, and select the file to upload.' />
				</ListItem>
				<ListItem>
					<ListItemText primary="5. Click on the 'Upload' button to add the file to the server." />
				</ListItem>
			</List>

			<Typography variant='h5' gutterBottom>
				View File Statistics
			</Typography>
			<Typography paragraph>
				Admins can view the number of downloads and emails sent for each file:
			</Typography>
			<List>
				<ListItem>
					<ListItemText primary='1. Log in to your admin account.' />
				</ListItem>
				<ListItem>
					<ListItemText primary='2. Go to the Admin Dashboard.' />
				</ListItem>
				<ListItem>
					<ListItemText primary="3. Click on the 'File Statistics' section." />
				</ListItem>
				<ListItem>
					<ListItemText primary='4. Here, you can see the download count and email count for each file.' />
				</ListItem>
			</List>

			<Typography variant='h4' gutterBottom>
				Technical Support
			</Typography>

			<Typography paragraph>
				If you encounter any issues or need assistance, please contact our
				support team:
			</Typography>
			<List>
				<ListItem>
					<ListItemText primary='Email: support@fileserver.com' />
				</ListItem>
				<ListItem>
					<ListItemText primary='Phone: 123-456-7890' />
				</ListItem>
				<ListItem>
					<ListItemText primary='Support Hours: Monday to Friday, 9 AM - 5 PM' />
				</ListItem>
			</List>

			<Typography paragraph>
				For more detailed technical documentation and source code, please refer
				to our GitHub repository:{' '}
				<Link
					href='https://github.com/yourusername/fileserver'
					target='_blank'
					rel='noopener'
				>
					GitHub - File Server
				</Link>
			</Typography>

			<Typography paragraph>
				Thank you for using File Server! We hope this guide helps you make the
				most out of our platform. If you have any suggestions or feedback,
				please feel free to reach out to us.
			</Typography>
		</PageLayout>
	);
}
