import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminDashboard from './components/AdminDashboard';

function App() {
	return (
		<Routes>
			<Route path='login' element={<Login />} />
			<Route path='signup' element={<Signup />} />
			<Route path='admin/dashboard' element={<AdminDashboard />} />
		</Routes>
	);
}

export default App;
