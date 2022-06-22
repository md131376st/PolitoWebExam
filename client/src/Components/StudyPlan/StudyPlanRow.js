import {useLocation} from "react-router-dom";


const StudyPlanRow = (props) => {
	const location = useLocation();
	const Delete = () => {
		const studyPlanList = props.courseList.filter(e => props.studyplan.includes(e.code));
		const mandatoryCourseList =studyPlanList.map(e => e.mandatoryCourse);
		if (!mandatoryCourseList.includes(props.course.code))
			props.deleteCourse(props.course.code);
		else props.DisplayWarning("this course can't be deleted");
	}
	return (<>
			<tr>
				<td>{props.course.code}</td>
				<td>{props.course.name}</td>
				<td>{props.course.numCredit}</td>
				{
					location.pathname === "/editPlan" ?
						<td>
							<svg onClick={Delete}
							     xmlns="http://www.w3.org/2000/svg"
							     width="16"
							     height="16"
							     fill="currentColor"
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
export default StudyPlanRow
