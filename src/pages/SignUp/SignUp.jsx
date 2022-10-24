import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { date, months, years } from '../../assets/mockData';
import { useGlobalContext } from '../../context/ContextProvider';
import { db } from '../../firebase';
import './SignUp.scss';

const SignUp = () => {
	const { signUp } = useGlobalContext();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		day: 1,
		month: 'Jan',
		year: 1950,
		gender: null,
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const value = e.target.value;
		const id = e.target.id;
		const name = e.target.name;
		const type = e.target.type;

		setData((prev) => {
			if (type === 'radio') {
				return {
					...prev,
					[name]: id,
				};
			}
			return {
				...prev,
				[id]: value,
			};
		});
	};

	const handleSubmit = async (e) => {
		setError(false);
		e.preventDefault();
		if (data.password !== data.passwordConfirm) {
			return setError(true);
		}

		try {
			setLoading(true);
			const { user } = await signUp(data.email, data.password);
			navigate('/');
			await setDoc(doc(db, 'users', user?.uid), {
				...data,
				timeStamp: serverTimestamp(),
			});
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	return (
		<div className="signup_page">
			<div className="signup_page-container">
				<div className="signup_img">
					<img src="./images/Login_img.svg" alt="" />
				</div>
				<div className="signup_form-container">
					<h2>Sign Up</h2>
					<form onSubmit={handleSubmit}>
						<div className="form-username">
							<input
								type="text"
								autoComplete="off"
								placeholder="First name"
								required
								id="firstName"
								onChange={handleChange}
							/>
							<input
								type="text"
								autoComplete="off"
								placeholder="Second name"
								required
								id="secondName"
								onChange={handleChange}
							/>
						</div>

						<input
							type="email"
							placeholder="Email address"
							required
							className="same_input"
							id="email"
							onChange={handleChange}
						/>

						<input
							type="password"
							placeholder="Password"
							required
							className={`same_input ${error && 'error'}`}
							id="password"
							onChange={handleChange}
						/>

						<input
							type="password"
							placeholder="Password"
							required
							className={`same_input ${error && 'error'}`}
							id="passwordConfirm"
							onChange={handleChange}
						/>

						<div className="form-dob">
							<span>Date of birth</span>
							<div className="select_container">
								<select id="day" onChange={handleChange}>
									{date.map((item) => (
										<option value={item} key={item}>
											{item}
										</option>
									))}
								</select>

								<select id="month" onChange={handleChange}>
									{months.map((item) => (
										<option value={item} key={item}>
											{item}
										</option>
									))}
								</select>

								<select id="year" onChange={handleChange}>
									{years.map((item) => (
										<option value={item} key={item}>
											{item}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="form-gender">
							<span>Gender</span>
							<div className="label_container">
								<label htmlFor="female">
									Female
									<input type="radio" name="gender" id="female" onChange={handleChange} />
								</label>

								<label htmlFor="male">
									Male
									<input type="radio" name="gender" id="male" onChange={handleChange} />
								</label>
							</div>
						</div>

						<button className="signup_btn" disabled={loading}>
							Sign Up
						</button>
					</form>
					<span className="already">
						Already have an account?
						<Link to="/login"> Log In </Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
