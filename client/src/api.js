import {Course, CourseList} from './models/Course';

const SERVER_URL = 'http://localhost:3001/api/v1';

const getAllCourses = async () => {
	try {
		const response = await fetch(SERVER_URL + '/Courses', {
			credentials: 'include',
		});
		const courseJson = await response.json();
		if (response.ok) {
			// let courseList  = new CourseList();
			return courseJson.courseList.map(ex => {
				return new Course(ex.code,
					ex.name,
					ex.numCredit,
					(ex.numInRole ? ex.numInRole : 0),
					(ex.maxCapacity ? ex.maxCapacity : " "),
					(ex.mandatoryCourse ? ex.mandatoryCourse : " "),
					ex.IncompatibeCourse
				);

			});


		} else
			throw courseJson;
	}
	catch (e){
		throw "server Not connected"
	}
};
const API = {getAllCourses};
export default API;
