import {Alert, Col, Container, Row, Spinner} from "react-bootstrap";
import CourseTable from "./CourseList/courseTable";
import {useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import API from "../api";
import StudyPlan from "./StudyPlan/StudyPlan";
import UserContext from "../UserContext";


const DefaultRouting = (props) => {
	const user = useContext(UserContext);
	const location = useLocation();
	const navigate = useNavigate();


	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [warning, setWarning] = useState('');
	const [course, setCourse] = useState([]);
	const [oldPlan, setOldPlan] = useState([]);

	const [type, setType] = useState(0);
	useEffect(() => {
		if (user !== undefined)
			setType(user.studyplan);
	}, [user])
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
			CancelPlanEdit();
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
	const EditModeSave = () => {
		setOldPlan(props.studyPlan);
	}
	const ChangePlanType = (type) => {
		setType(type);
	}
	const CancelPlanEdit = () => {
		props.resetPlan(oldPlan);
		navigate('/');
	}
	const savePlan = async (studyPlanType) => {
		try {
			await API.CreateStudyPlan(user.id,
				{
					PlanType: studyPlanType,
					studyPlanList: props.studyPlan
				}
			);
			props.ChangeUserPType(studyPlanType);
			EditModeSave();
			await getCourses();
			navigate('/');
		} catch (err) {
			setWarning(err);
		}
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
					<StudyPlan type={type}
					           savePlan={savePlan}
					           cancel={CancelPlanEdit}
					           editPlan={EditModeSave}
					           DisplayWarning={DisplayWarning}
					           studyPlan={props.studyPlan}
					           courseList={course}
					           changePlanType={ChangePlanType}
					           deleteCourse={props.deleteCourse}/>
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
						<CourseTable  addCourse={props.addCourse}
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


		</Container>
	)
}
export default DefaultRouting
