import React, { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiChevronDown, BiSearch } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/ContextProvider';
import './Navbar.scss';
const Navbar = () => {
	const [dropdown, setDropdown] = useState(false);
	const { user, logout } = useGlobalContext();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate('/login');
	};

	return (
		<header className="header">
			<nav className="nav">
				<div className="left">
					<h3>Note App</h3>
				</div>

				<div className="middle">
					<input type="text" autoComplete="off" placeholder="Search" />
					<BiSearch />
				</div>

				<div className="right">
					<div className="profile_div">
						<img src="./images/default_profile.png" alt="" />
					</div>
					<span>{user?.displayName || user?.email?.slice(0, user.email.indexOf('@'))}</span>

					<div className="dropdown_container">
						<button className="arrow_down" onClick={() => setDropdown((prev) => !prev)}>
							<BiChevronDown />
						</button>
						<div className={`dropdown ${dropdown && 'active'}`}>
							<button>
								<Link to="/setting">
									<IoIosSettings />
									Setting
								</Link>
							</button>
							<button onClick={handleLogout}>
								<AiOutlineLogout />
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
