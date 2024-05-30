import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<Layout>
						<h1>Hello world</h1>
					</Layout>
				}
			/>
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<Signup />} />
		</Routes>
	);
}

export default App;
