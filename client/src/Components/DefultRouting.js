import {Alert, Col, Container, Row, Spinner} from "react-bootstrap";
import CourseTable from "./courseTable";
import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import API from "../api";



const DefaultRouting = (props) => {

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [course, setCourse] = useState([]);
	const getCourses = async () => {
		try {
			const courseList = await API.getAllCourses();
			setCourse(courseList);
			setLoading(false);
		} catch (e) {
			setErrorMessage(e)
			setLoading(false);
		}

	};
	useEffect(() => {
		getCourses().catch(()=>{
			setErrorMessage("server not available")
		});
		setLoading(true);
	}, []);
	useEffect(()=>{

	})

	return (
		<Container className="vheight-100">
			<Row className="col-ms-2 minSpace">
			</Row>
			<Row>
				<Col>
					{ loading &&
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
						<Alert variant={"secondary"}>
							{errorMessage}
						</Alert>
					}
				</Col>
			</Row>
			<Row className="col-ms-2 minSpace"/>
			{/*<Outlet/>*/}
		</Container>
	)
}
export default DefaultRouting
