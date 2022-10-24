import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/ContextProvider';
import './Login.scss';
const Login = () => {
	const { login } = useGlobalContext();
	const [error, setError] = useState(false);
	const emailRef = useRef();
	const passRef = useRef();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!emailRef.current.value || !passRef.current.value) {
			return setError(true);
		}

		try {
			await login(emailRef.current.value, passRef.current.value);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="login_page">
			<div className="login_page-container">
				<div className="login_text">
					<h1>Note App</h1>
					<span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, et.</span>
				</div>
				<div className="login_form-container">
					<form onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Email address or phone number"
							ref={emailRef}
							className={`${error && 'error'}`}
						/>

						<input
							type="password"
							placeholder="Password"
							ref={passRef}
							className={`${error && 'error'}`}
						/>

						<button className="login_btn">Log in</button>
					</form>
					<Link to="/forget" className="forget">
						Forget password?
					</Link>

					<hr />

					<button className="create_btn">
						<Link to="/sign-up">Create New Account</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
