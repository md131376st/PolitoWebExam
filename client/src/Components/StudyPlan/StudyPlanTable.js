import {useLocation} from "react-router-dom";
import {Table} from "react-bootstrap";
import StudyPlanRow from "./StudyPlanRow";

const StudyPlanTable = (props) => {
	const location = useLocation();
	return (<>
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
				props.showlist.map((e) => (

					<StudyPlanRow studyplan={props.studyPlan} courseList={props.courseList} deleteCourse={props.deleteCourse} DisplayWarning={props.DisplayWarning}
					              key={e.code + "_"} course={e}
					/>)
				)

			}
			</tbody>
		</Table>
	</>);
}
export default StudyPlanTable
