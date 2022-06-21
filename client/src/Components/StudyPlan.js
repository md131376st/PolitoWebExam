import {useEffect, useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Outlet, useLocation, useNavigate} from "react-router-dom";


const StudyPlan = (props) => {
	const [studyPlan, setStudyPlan] = useState(props.studyPlan);
	const [showList, setShowList] = useState([]);
	const location = useLocation();
	const sumCredit = showList.reduce((acc, course) => {
		acc += course.numCredit;
		return acc;
	}, 0);
	useEffect(() => {

		let list = props.courseList.filter((e) =>
			studyPlan.includes(e.code)
		)
		setShowList(list);

	}, [studyPlan.length, props.courseList.length])
	const navigate = useNavigate();
	const [showPlan, setShowPlan] = useState(props.studyPlan.length > 0);
	const handleSubmit = (event) => {
		event.preventDefault();
		props.editPlan();
		navigate('/editPlan');
	};

	return (<>
		{

			showPlan && <Container>

				<Col>
					<h2> total credit taken: {sumCredit}</h2>
				</Col>


				<Table striped={false}>
					<thead>
					<tr>
						<th>Code</th>
						<th>Name</th>
						<th>Number of credits</th>
						{
							location.pathname === "/editPlan" ?
								<th> delete </th> : <></>
						}

					</tr>
					</thead>
					<tbody>
					{
						showList.map((e) => (

							<StudyPlanRow deleteCourse = {props.deleteCourse} DisplayWarning={props.DisplayWarning} key={e.code + "_"} course={e}
							/>)
						)

					}
					</tbody>
				</Table>

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
						<Button variant="success" >
							save
						</Button>
						<Button  variant="danger" onClick={props.cancel}>
							cancel
						</Button>
					</Col>
					<Col/>


				</Row>
			</Container>
		}


	</>)
}

function StudyPlanRow(props) {
	const location = useLocation();
	return (<>
			<tr>
				<td>{props.course.code}</td>
				<td>{props.course.name}</td>
				<td>{props.course.numCredit}</td>
				{
					location.pathname === "/editPlan" ?
						<td>

							<svg onClick={() => {
								props.deleteCourse(props.course.code)

							}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
							     className="bi bi-trash"
							     viewBox="0 0 16 16">
								<path
									d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
								<path fillRule="evenodd"
								      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
							</svg>
						</td>
						: <></>
				}
			</tr>
		</>
	);

}


export default StudyPlan
