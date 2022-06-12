import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from './UserContext';
import { useState} from "react";

import {Routes, Route, Navigate, Link, Outlet, useNavigate} from 'react-router-dom';

import API from './api';
import { Container, Nav, Navbar} from "react-bootstrap";
import {LoginPage, LogoutButton} from "./Components/LoginPage";
import DefaultRouting from "./Components/DefultRouting";


function App() {
	const [user, setUser] = useState(undefined);
	const [loggedIn, setLoggedIn] = useState(false);
	const [loginErr, setLoginErr] = useState(undefined)

	const navigate = useNavigate();
	const handleLogin = async (credentials) => {
		try {
			const user = await API.logIn(credentials);
			setLoginErr(undefined);
			setLoggedIn(true);
			setUser(user);
			navigate('/');

		} catch (err) {

			setLoginErr(err);
			navigate('/login');
		}
	};

	const handleLogout = async () => {
		await API.logOut();
		setLoggedIn(false);
		setUser(undefined);
		navigate('/');
	};




	return (
		<div className="App">
			<Container fluid="true">
				<Navbar bg="light">
					<Container>
						<Navbar.Brand> StudyPlan</Navbar.Brand>
						<Nav>
							<Link to={loggedIn ?
								"logout" : "login"}> {loggedIn ? "logout" : "login"} </Link>

						</Nav>
					</Container>
				</Navbar>
				<Outlet/>

				<UserContext.Provider value={user}>
					<Routes>
						<Route path="/">
							<Route path='login' element={

								loggedIn ? <Navigate replace to='/'/> :
									<LoginPage login={handleLogin} err={loginErr}/>
							}/>
							<Route path='logout' element={
								<LogoutButton logout={handleLogout}/>
							}/>

							<Route index element={<DefaultRouting />}/>
						</Route>
					</Routes>
				</UserContext.Provider>
			</Container>
		</div>
	);
}

export default App;
