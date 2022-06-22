import {useEffect, useState, useContext} from "react";
import {Badge, Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import UserContext from "../../UserContext";
import StudyPlanTable from "./StudyPlanTable";


const StudyPlan = (props) => {
	const [showList, setShowList] = useState([]);
	const user = useContext(UserContext);

	const location = useLocation();
	const sumCredit = showList.reduce((acc, course) => {
		acc += course.numCredit;
		return acc;
	}, 0);
	useEffect(() => {

		let list = props.courseList.filter((e) =>
			props.studyPlan.includes(e.code)
		)
		setShowList(list);

	}, [props.studyPlan.length, props.courseList.length])

	const navigate = useNavigate();
	const showPlan = props.studyPlan.length > 0;

	const handleSubmit = (event) => {
		event.preventDefault();
		props.editPlan();
		navigate('/editPlan');
	};
	const SaveSubmit = (event) => {
		event.preventDefault();

		if (props.type === 0) {
			props.DisplayWarning("Please select your study Plan");
			return;
		} else if (props.type === 1 && (sumCredit < 20 || sumCredit > 40)) {
			props.DisplayWarning("your Study Plan Type allows 20-40 credits");
			return;
		} else if (props.type === 2 && (sumCredit < 60 || sumCredit > 80)) {
			props.DisplayWarning("your Study Plan Type allows 60-80 credits")
			return;
		}
		props.savePlan(props.type)
	};
	const cancelSubmit = (event) => {
		event.preventDefault();
		props.cancel();
		navigate('/');
	};

	return (<>
		{
			location.pathname === "/editPlan" && user.studyplan === 0 &&

			<Form>
				<div key={`default-radio`} className="mb-3">
					<Form.Check
						inline
						checked={props.type === 2}
						type='radio'
						name="planType"
						label="Full Time"
						onChange={() => {
							props.changePlanType(2)
						}}
					/>

					<Form.Check
						inline
						checked={props.type === 1}
						onChange={() => {
							props.changePlanType(1)
						}}
						type='radio'
						label={` Part Time`}
						name="planType"
					/>
				</div>


			</Form>
		}
		{
			(showPlan || props.type !== 0) && <Container>
				<Row>
					<Col/>
					<Col>
						<h2> total credit taken: {sumCredit}
						</h2>
						<Badge bg="secondary">
							Study plan type :{props.type === 1 ? "Part Time " : "Full Time "}
						</Badge>
						{' '}
						<Badge bg="info">
							credit allowed range :{props.type === 1 ? "20-40 " : "60-80 "}
						</Badge>

					</Col>
					<Col>
						<Button variant="outline-danger" onClick={() => {
							navigate('/deletePlan');
						}}> Delete Study Plan
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
							     className="bi bi-trash"
							     viewBox="0 0 16 16">
								<path
									d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
								<path fillRule="evenodd"
								      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
							</svg>
						</Button>
					</Col>
				</Row>
				<StudyPlanTable key={props.studyPlan.length}
				                studyPlan ={props.studyPlan}
				                showlist={showList}
				                courseList={props.courseList}
				                deleteCourse={props.deleteCourse}
				                DisplayWarning={props.DisplayWarning}/>


			</Container>

		}

		{location.pathname === "/" &&
			<Container>
				<Col>
					<Button variant="primary" onClick={handleSubmit}>
						{!showPlan ? "Create New StudyPlan" : "Edit StudyPlan"}
					</Button>
				</Col>

			</Container>
		}
		{location.pathname === "/editPlan" &&
			<Container>
				<Row>
					<Col/>
					<Col>
						<Button variant="success" type="submit" onClick={SaveSubmit}>
							save
						</Button>
						<Button variant="danger" type="submit" onClick={cancelSubmit}>
							cancel
						</Button>
					</Col>
					<Col/>


				</Row>
			</Container>
		}


	</>)
}







export default StudyPlan
