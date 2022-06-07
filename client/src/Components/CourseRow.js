import {Button, Container, Row, Table} from "react-bootstrap";
import {useState} from "react";
import "./courseRow.css"

function CourseRow(props) {
	const [extra, setExtra] = useState(false);

	return (
		<>
			<tr>
				<ExamData course={props.course}/>
				<td>
					<Button onClick={() => setExtra(!extra)}>  {!extra ? "expand" : "contract"} </Button>
				</td>
				{extra &&
					<Table className="extraInfo" >
						<thead>
						<tr>
							<th>Mandatory Course</th>
							<th> Incompatible Courses</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>
								{props.course.mandatoryCourse}
							</td>
							<td>
								{props.course.IncompatibeCourse.map((e) => (
										<div>
											{e}
											<br/>
										</div>
									)
								)}
							</td>
						</tr>
						</tbody>
					</Table>
				}
			</tr>
		</>

	);


}

function ExamData(props) {
	return <>
		<td>{props.course.code}</td>
		<td>{props.course.name}</td>
		<td>{props.course.numCredit}</td>
		<td>{props.course.numInRole}</td>
		<td>{props.course.maxCapacity}</td>

	</>;
}

export default CourseRow;
