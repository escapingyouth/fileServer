import { Routes, Route } from 'react-router-dom';

import Welcome from './pages/landing/Welcome';

import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAllFiles from './pages/admin/AdminAllFiles';
import AdminProfile from './pages/admin/AdminProfile';
import AdminSecurity from './pages/admin/AdminSecurity';
import AllUsers from './pages/admin/AllUsers';
import UploadFile from './pages/admin/UploadFile';
import EditFile from './pages/admin/EditFile';
import EditUser from './pages/admin/EditUser';
import TrashPage from './pages/admin/Trash';

import UserDashboard from './pages/user/UserDashboard';
import UserAllFiles from './pages/user/UserAllFiles';
import EmailFile from './pages/user/EmailFile';
import FavoriteFiles from './pages/user/FavoriteFiles';
import UserProfile from './pages/user/UserProfile';
import UserSecurity from './pages/user/UserSecurity';
import HelpPage from './pages/user/HelpPage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Welcome />} />
			<Route path='auth/login' element={<Login />} />
			<Route path='auth/signup' element={<Signup />} />
			<Route path='auth/forgot-password' element={<ForgotPassword />} />
			<Route path='auth/reset-password/:token' element={<ResetPassword />} />

			<Route path='/admin/*'>
				<Route path='dashboard' element={<AdminDashboard />} />
				<Route path='users' element={<AllUsers />} />
				<Route path='upload' element={<UploadFile />} />
				<Route path='files' element={<AdminAllFiles />} />
				<Route path='trash' element={<TrashPage />} />
				<Route path='edit/file/:id' element={<EditFile />} />
				<Route path='edit/user/:id' element={<EditUser />} />
				<Route path='profile' element={<AdminProfile />} />
				<Route path='security' element={<AdminSecurity />} />
			</Route>

			<Route path='/user/*'>
				<Route path='dashboard' element={<UserDashboard />} />
				<Route path='email' element={<EmailFile />} />
				<Route path='files' element={<UserAllFiles />} />
				<Route path='favorites' element={<FavoriteFiles />} />
				<Route path='help' element={<HelpPage />} />
				<Route path='profile' element={<UserProfile />} />
				<Route path='security' element={<UserSecurity />} />
			</Route>
		</Routes>
	);
}

export default App;
