import {Course} from './models/Course';

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
	} catch (e) {
		throw "server Not connected"
	}
};
const getUserInfo = async () => {
	const response = await fetch(SERVER_URL + '/sessions/current', {
		credentials: 'include',
	});
	const user = await response.json();
	if (response.ok) {
		return user;
	} else {
		throw user;  // an object with the error coming from the server
	}
};
const logOut = async () => {
	const response = await fetch(SERVER_URL + '/sessions/current', {
		method: 'DELETE',
		credentials: 'include'
	});
	if (response.ok)
		return null;
}
const logIn = async (credentials) => {
	try {
		const response = await fetch(SERVER_URL + '/sessions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(credentials),
		});
		if (response.ok) {
			return await response.json();
		} else {
			throw 404;
		}
	} catch (e) {
		if (e === 404)
			throw "Incorrect username or password."
		throw "server Not connected"
	}


};
const getStudyPlan = async (userId) => {
	try {
		const response = await fetch(SERVER_URL + '/StudyPlan/' + userId, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		if (response.ok) {
			return await response.json();
		} else {
			throw 400;
		}
	} catch (e) {
		if (e === 400)
			throw "userNotFound"
		throw "server Not connected"
	}
}

const CreateStudyPlan = async (userId, studyPlan) => {
	try {

		const response = await fetch(SERVER_URL + '/StudyPlan/' + userId, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(studyPlan),
		});
		if (response.status === 201) {
			return "success"
		} else {
			const error = await response.json().error;
			throw {code: 400, error: error}
		}
	} catch (e) {
		if (e.code === 400)
			throw e.error
		throw "server Not connected"
	}
}

const DeleteStudyPlan = async (userId) => {
	try {
		const response = await fetch(SERVER_URL + '/StudyPlan/' + userId, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		if (response.ok) {
			return await response.json();
		} else {
			throw 400;
		}
	} catch (e) {
		if (e === 400)
			throw "Please login again"
		throw "server Not connected"
	}
}

const API = {getAllCourses,getUserInfo, logOut, logIn, getStudyPlan, CreateStudyPlan,DeleteStudyPlan};
export default API;
