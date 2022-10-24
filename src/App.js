import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Dashboard, Error, Forget, Login, SignUp, Update } from './pages';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="/forget" element={<Forget />} />
			<Route path="/sign-up" element={<SignUp />} />
			<Route path="/setting" element={<Update />} />
			<Route path="*" element={<Error />} />
		</Routes>
	);
}

export default App;
