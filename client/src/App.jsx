import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminDashboard from './components/AdminDashboard';
import AllFiles from './components/AllFiles';
import EmailFile from './components/EmailFile';

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<Signup />} />
			<Route path='/files' element={<AllFiles />} />
			<Route path='/admin/*'>
				<Route path='dashboard' element={<AdminDashboard />} />
			</Route>
			<Route path='/user/*'>
				<Route path='email' element={<EmailFile />} />
			</Route>
		</Routes>
	);
}

export default App;
