import {Alert, Col, Container, Row, Spinner} from "react-bootstrap";
import CourseTable from "./courseTable";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import API from "../api";
import StudyPlan from "./StudyPlan";
import UserContext from "../UserContext";


const DefaultRouting = (props) => {

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [warning, setWarning] = useState('');
	const [course, setCourse] = useState([]);
	const [oldPlan, setOldPlan] = useState([]);


	const user = useContext(UserContext);
	const location = useLocation();
	const navigate = useNavigate();
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
		if (location.pathname === '/')
			cancelPlanEdit();
	}, [location.pathname])

	useEffect(() => {
		getCourses().catch(() => {
			setErrorMessage("server not available")
		});
		setLoading(true);
	}, []);
	const DisplayWarning = (w) => {
		setWarning(w);
	}
	const editmodeSave = () => {
		setOldPlan(props.studyPlan)
	}
	const cancelPlanEdit = () => {
		props.resetPlan(oldPlan);
		navigate('/');
	}
	return (
		<Container>
			<Row className="col-ms-2 minSpace"/>
			<Row className="col-ms-2 ">
				{
					warning &&
					<Alert variant="danger" onClose={() => setWarning('')} dismissible>
						<p>
							{warning}
						</p>
					</Alert>
				}
			</Row>
			<Row className="col-ms-2">
				{
					user !== undefined &&
					<StudyPlan cancel={cancelPlanEdit} editPlan={editmodeSave} key={props.studyPlan.length}
					           studyPlan={props.studyPlan} courseList={course} deleteCourse={props.deleteCourse}/>
				}

			</Row>
			<Row className="col-ms-2 minSpace"/>
			<Row>
				<Col>
					{loading &&
						< Spinner animation="border" variant="primary" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					}
					{
						!loading && !errorMessage &&
						<CourseTable key={props.studyPlan.length} addCourse={props.addCourse}
						             DisplayWarning={DisplayWarning} course={course} studyPlan={props.studyPlan}/>
					}
					{
						errorMessage &&
						<Alert variant={"secondary"}>
							{errorMessage}
						</Alert>
					}

				</Col>
			</Row>

			{/*<Outlet/>*/}
		</Container>
	)
}
export default DefaultRouting
