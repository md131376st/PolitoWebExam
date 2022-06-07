import {Table} from "react-bootstrap";
import CourseRow from "./CourseRow";


function CourseTable(props) {
	return (
		<>
			<Table striped={false}>
				<thead>
				<tr>
					<th>Code</th>
					<th>Name</th>
					<th>Number of credits</th>
					<th> Students In Role</th>
					<th> Max Capacity</th>

				</tr>
				</thead>
				<tbody>
				{

					props.course.map((e) => (
						<CourseRow key={e.code} course={e}
						/>))
				}
				</tbody>
			</Table>
		</>);

}

export default CourseTable;
