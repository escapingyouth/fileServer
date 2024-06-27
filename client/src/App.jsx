import { Routes, Route } from 'react-router-dom';

import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAllFiles from './pages/admin/AdminAllFiles';
import UploadFile from './pages/admin/UploadFile';
import EditFile from './pages/admin/EditFile';

import UserAllFiles from './pages/user/UserAllFiles';
import EmailFile from './pages/user/EmailFile';
import FavoriteFiles from './pages/user/FavoriteFiles';
import HelpPage from './pages/user/HelpPage';
import TrashPage from './pages/admin/Trash';

function App() {
	return (
		<Routes>
			<Route index path='/login' element={<Login />} />
			<Route path='/signup' element={<Signup />} />

			<Route path='/admin/*'>
				<Route path='dashboard' element={<AdminDashboard />} />
				<Route path='upload' element={<UploadFile />} />
				<Route path='files' element={<AdminAllFiles />} />
				<Route path='trash' element={<TrashPage />} />
				<Route path='edit/:id' element={<EditFile />} />
			</Route>

			<Route path='/user/*'>
				<Route path='email' element={<EmailFile />} />
				<Route path='files' element={<UserAllFiles />} />
				<Route path='favorites' element={<FavoriteFiles />} />
				<Route path='help' element={<HelpPage />} />
			</Route>
		</Routes>
	);
}

export default App;
