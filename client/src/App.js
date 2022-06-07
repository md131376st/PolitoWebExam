import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from './UserContext';
import {useEffect, useState} from "react";

import {Routes, Route, Navigate} from 'react-router-dom';

import API from './api';
import {Alert, Col, Container, Navbar, Row, Spinner} from "react-bootstrap";
import CourseTable from "./Components/courseTable";

function App() {
	const [user, setUser] = useState(undefined);
	const [loggedIn, setLoggedIn] = useState(false);
	const [course, setCourse] = useState([]);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const getCourses = async () => {
		try {
			const courseList = await API.getAllCourses();
			setCourse(courseList);
			setLoading(false);
		}
		catch (e) {
			setErrorMessage(e)
			setLoading(false);
		}

	};
	useEffect(() => {
		getCourses();
		setLoading(true)
	}, []);
	return (
		<div className="App">
			<Container  fluid ="true">
			<Navbar bg="light">
				<Container>
					<Navbar.Brand> StudyPlan</Navbar.Brand>
				</Container>
			</Navbar>
			<Container className="vheight-100"  >
				<Row className="col-ms-2 minSpace"/>
				<Row  >
					<Col  >
						{loading &&
							< Spinner animation="border" variant="primary" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						}
						{
							!loading && !errorMessage &&
							<CourseTable course={course}/>
						}
						{
							errorMessage &&
							<Alert  variant={"secondary"}>
								{errorMessage }
							</Alert>
						}
					</Col>
				</Row>
				<Row className="col-ms-2 minSpace"/>
			</Container>

			<UserContext.Provider value={user}>
				{/*<Routes>*/}

				{/*</Routes>*/}
			</UserContext.Provider>
			</Container>
		</div>
	);
}

export default App;
