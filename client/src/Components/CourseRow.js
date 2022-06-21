import {Button, Container, Row, Table} from "react-bootstrap";
import {useState, useContext, useEffect} from "react";
import "./courseRow.css"
import {useLocation} from "react-router-dom";
import UserContext from "../UserContext";
import CourseState from "../models/CourseState";

function CourseRow(props) {
	const [extra, setExtra] = useState(false);
	const [addState, setAddState] = useState(CourseState.noConflict);
	useEffect(() => {
		CheakState();
	}, [props.studyPlan.length])
	const user = useContext(UserContext);
	const location = useLocation();
	const hasMandatoryCourse = () => {
		if (props.course.mandatoryCourse === " ")
			return true
		return props.studyPlan.includes(props.course.mandatoryCourse)
	}
	const NotIncompatibeCourse = () => {
		if ( props.course.IncompatibeCourse.length === 0)
			return false;

		for (const course of props.course.IncompatibeCourse) {
			if (props.studyPlan.includes(course))
				return true;
		}
		return false;
	}
	const CheakState = () => {
		const hasMandatory = hasMandatoryCourse();
		const hasNoIncompatibeCourse = NotIncompatibeCourse();

		if (hasMandatory &&
			!hasNoIncompatibeCourse &&
			(props.course.maxCapacity === " " || props.course.maxCapacity !== " " && props.course.maxCapacity > props.course.numInRole))
			setAddState(CourseState.noConflict)
		else if (props.course.maxCapacity !== " " && props.course.maxCapacity <= props.course.numInRole) {
			setAddState(CourseState.notAvailable)
		} else if (hasMandatory && hasNoIncompatibeCourse) {
			setAddState(CourseState.Incompatible)
		} else if (!hasMandatory) {
			setAddState(CourseState.MandatoryMiss)
		} else {
			setAddState(CourseState.MandatoryMissIncompatible)
		}
	}

	const setVariantButton = () => {
		switch (addState) {
			case CourseState.MandatoryMissIncompatible:
				return "outline-danger"
			case CourseState.Incompatible:
				return "outline-info"
			case CourseState.MandatoryMiss:
				return "outline-primary"
			case CourseState.notAvailable:
				return "outline-secondary"
			case CourseState.noConflict:
				return "outline-success"
		}


	}

	const AddCourse = () => {
		switch (addState) {
			case CourseState.MandatoryMissIncompatible:
				return props.DisplayWarning("The Course is Incompatible and the Course mandatory Are missing");
			case CourseState.Incompatible:
				return props.DisplayWarning("The Course is Incompatible");
			case CourseState.MandatoryMiss:
				return props.DisplayWarning("The Course mandatory Courses are missing");
			case CourseState.notAvailable:
				return props.DisplayWarning("The Course is full");
			case CourseState.noConflict:
				return props.addCourse(props.course.code);
		}
	}

	return (
		<>
			<tr>
				<ExamData course={props.course}/>
				<td>

					<Button onClick={() => setExtra(!extra)}>  {!extra ? "expand" : "contract"} </Button>

				</td>
				{
					location.pathname === "/editPlan" &&
					user !== undefined &&
					!props.studyPlan.includes(props.course.code) &&
					<td>
						<Button variant={setVariantButton()} onClick={() => AddCourse()}> add </Button>
					</td>

				}

				{extra &&
					<Table className="extraInfo">
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
