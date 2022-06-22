import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from './UserContext';
import {useEffect, useState} from "react";

import {Routes, Route, Navigate, Link, Outlet, useNavigate} from 'react-router-dom';

import API from './api';
import {Container, Nav, Navbar} from "react-bootstrap";
import {LoginPage, LogoutButton} from "./Components/Auth/LoginPage";
import DefaultRouting from "./Components/DefultRouting";
import DeletePlan from "./Components/StudyPlan/DeletePlan";

function App() {
	const [user, setUser] = useState(undefined);
	const [loggedIn, setLoggedIn] = useState(false);
	const [loginErr, setLoginErr] = useState(undefined);
	const [studyPlan, setStudyPlan] = useState([]);
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const user = await API.getUserInfo(); // we have the user info here
				setLoginErr(undefined);
				setLoggedIn(true);
				if (user.studyplan !== 0) {
					const courseList = await API.getStudyPlan(user.id);
					setStudyPlan(courseList);
				}
				setUser(user);
			} catch (e) {
				console.log(e)
			}
		};
		checkAuth();
	}, []);

	const navigate = useNavigate();
	const handleLogin = async (credentials) => {
		try {
			const user = await API.logIn(credentials);
			setLoginErr(undefined);
			setLoggedIn(true);
			if (user.studyplan !== 0) {
				const courseList = await API.getStudyPlan(user.id);
				setStudyPlan(courseList);
			}
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
	const ChangeUserPType = (Nplan) => {
		const userUpdate = {...user}
		userUpdate.studyplan = Nplan;
		setUser(userUpdate);
	}

	const addCourse = (course) => {
		setStudyPlan([...studyPlan, course]);
	}
	const deleteCourse = (course) => {
		setStudyPlan(studyPlan.filter(e => e !== course));
	}
	const resetPlan = (courses) => {
		setStudyPlan([...courses]);
	}
	return (
		<div className="App flex">
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
							<Route path="editPlan" element={!loggedIn ? <Navigate replace to='/'/>
								: <DefaultRouting
									studyPlan={studyPlan}
									addCourse={addCourse}
									deleteCourse={deleteCourse}
									resetPlan={resetPlan}
									ChangeUserPType={ChangeUserPType}
								/>}/>
							<Route path="deletePlan" element={<DeletePlan ChangeUserPType={ChangeUserPType} />} />
							<Route index element={
								<DefaultRouting
									studyPlan={studyPlan}
									addCourse={addCourse}
									deleteCourse={deleteCourse}
									resetPlan={resetPlan}
									ChangeUserPType={ChangeUserPType}
								/>}/>
						</Route>
					</Routes>
				</UserContext.Provider>
			</Container>
		</div>
	);
}

export default App;
