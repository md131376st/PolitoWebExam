const express = require('express');
const router = express.Router();
const courseDao = require('../Dao/dao_Course');
const StudyPlanDao = require('../Dao/dao_StudyPlan');
const userDao = require('../Dao/dao_user');
const {Course, CourseList} = require("../Course");
const {body, param, validationResult} = require('express-validator');
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({error: 'Not authorized'});
}


router.get('/Courses', async (req, res) => {
	try {
		const rows = await courseDao.ReadCourses();
		let courseList = new CourseList();
		for (const e of rows) {
			const course = new Course(e.code, e.name, e.numCredit, e.numInRole, e.maxCapacity, e.mandatoryCourse);
			const incompatableCourse = await courseDao.GetIncompatibeCourse(course.code);
			course.IncompatibeCourse = incompatableCourse.map((course) => course.SecondCourse);
			courseList.add(course);
		}

		res.json(courseList);
	} catch (err) {
		console.log(err)
		res.status(500).json({error: "Internal problem"});
	}

});
router.get('/StudyPlan/:id',
	isLoggedIn,
	param('id').isInt().withMessage('InvalidUserID'),

	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({error: "in valid User ID"});
			}
			const rows = await StudyPlanDao.ReadStudyPlan(req.params.id);
			res.json(rows.map((course) => course.courseCode));
		} catch (err) {
			console.log(err)
			res.status(500).json({error: "Internal problem"});
		}

	});

router.post('/StudyPlan/:id',
	isLoggedIn,
	param('id').isInt().withMessage('InvalidUserID'),
	async (req, res) => {
		try {
			const studyplan = req.body.studyPlanList;
			//check student credit
			let getCreditCheck = await courseDao.CalculateSumCredit(studyplan);
			getCreditCheck = getCreditCheck[0].sum;
			if ((getCreditCheck < 60 || getCreditCheck > 80) && req.body.PlanType === 2) {

				res.status(403).json({
					error: "the total number of credits for full-time students is between 60 and 80  "
				})
				return;
			} else if ((getCreditCheck < 20 || getCreditCheck > 40) && req.body.PlanType === 1) {
				res.status(403).json({
					error: "the total number of credits for part-time students is between 20 and 40  "
				})
				return;
			}
			let error = [];
			//Check if the studyPlan can be created
			for (const course of studyplan) {
				const mandetoryCourse = await courseDao.GetMandatoryCourses(course)
				if (mandetoryCourse[0].mandatoryCourse !== null) {
					if (!studyplan.includes(mandetoryCourse[0].mandatoryCourse))
						error.push({error: mandetoryCourse[0].mandatoryCourse + " is mandatory for " + course})
				}
				const InComatibalCourse = await courseDao.GetIncompatibeCourse(course);
				const InComatibalcourseList = InComatibalCourse.map((course) => course.SecondCourse);
				for (const course_ of InComatibalcourseList) {
					if (studyplan.includes(course_))
						error.push({error: course_ + " is incompatible with " + course})
				}
			}
			const CheakIFPlanExsist = await StudyPlanDao.ReadStudyPlan(req.params.id);
			//check availability of the course
			const studentInRole = await courseDao.GetInroledNumber(studyplan);
			for (const course of studentInRole) {
				if (course.maxCapacity !== null && course.numInRole!==null &&
					!CheakIFPlanExsist.map(e=>e.courseCode).includes(course.code) &&
					course.numInRole >= course.maxCapacity)
					error.push({error: course.code + " is full"})
			}
			if (error.length !== 0) {
				res.status(400).json(error);
				return;
			}
			//remove previous saved plan

			if (CheakIFPlanExsist.length !== 0)
				await StudyPlanDao.deleteItemByIdFromDB(req.params.id);
			const rows = await StudyPlanDao.createStudyPlanIntoDB(req.body.studyPlanList, req.params.id);


			const planType = req.body.PlanType;
			await userDao.setUserProgramType(planType === null ? 0 : planType, req.params.id);

			res.sendStatus(201);
		} catch (err) {
			console.log(err)
			res.status(500).json({error: "Internal problem"});
		}

	});
router.delete('/StudyPlan/:id',
	isLoggedIn,
	param('id').isInt().withMessage('InvalidUserID'),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({error: "in valid User ID"});
			}
			const rows = await StudyPlanDao.deleteItemByIdFromDB(req.params.id);
			await userDao.setUserProgramType(0, req.params.id);
			res.json(rows);

		} catch (err) {
			console.log(err)
			res.status(500).json({error: "Internal problem"});
		}

	});


module.exports = router;
