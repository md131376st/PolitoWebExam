import {Accordion, Table} from "react-bootstrap";
import CourseRow from "./CourseRow";
import "./Coursetable.css";


function CourseTable(props) {
	return (

			<Table className="CourseTable" striped={false}>
				<thead>
				<tr>
					<th>Code</th>
					<th>Name</th>
					<th>Number of credits</th>
					<th> Students In Role</th>
					<th> Max Capacity</th>
					<th> Operations</th>


				</tr>
				</thead>
				<tbody >
				{

					props.course.map((e) => (
						<CourseRow key={"CR_"+e.code} addCourse={props.addCourse} DisplayWarning={props.DisplayWarning} key={e.code} course={e}
						           studyPlan={props.studyPlan}
						/>))
				}
				</tbody>
			</Table>
		);

}

export default CourseTable;
