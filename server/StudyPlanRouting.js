const express = require('express');
const router = express.Router();
const courseDao = require('./dao_Course');
const {Course, CourseList} = require("./Course");

router.get('/Courses', async (req, res) => {
	try {
		const rows = await courseDao.ReadCourses();
		let courseList  = new CourseList();
		for (const e of rows) {
			const course = new Course(e.code, e.name, e.numCredit, e.numInRole, e.maxCapacity, e.mandatoryCourse);
			const incompatableCourse = await courseDao.GetIncompatibeCourse(course.code);
			course.IncompatibeCourse = incompatableCourse.map((course) => course.SecondCourse);
			courseList.add(course);
		}

		res.json(courseList);
	} catch (err) {
		res.status(500).json({error: err});
	}

});


module.exports = router;
