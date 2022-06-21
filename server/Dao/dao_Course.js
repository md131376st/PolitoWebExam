'use strict';

const sqlite = require('sqlite3');
const DBOperations = require('../database');

const db = new DBOperations();

async function ReadCourses() {

	const sql = 'SELECT Course.code, Course.name, Course.numCredit,  Inrolednum.numInRole, Course.maxCapacity, Course.mandatoryCourse  FROM Course  LEFT JOIN  (select count(*) as numInRole , courseCode FROM studyplan GROUP by courseCode) as Inrolednum on Course.code=  inrolednum.courseCode ORDER BY name';
	const arg = [];
	return await db.fromDB(sql, arg);
}


async function GetIncompatibeCourse(code) {
	const sql = 'SELECT SecondCourse FROM incompatibeCourses WHERE PrimeCourse =? ';
	const arg = [code]
	return await db.fromDB(sql, arg);
}

async function GetMandatoryCourses(code) {

	const sql = 'SELECT mandatoryCourse FROM Course WHERE code =? ';
	const arg = [code];
	return await db.fromDB(sql, arg);
}

async function CalculateSumCredit(studyPlan) {

	let sql = 'SELECT sum(numCredit) as sum FROM Course  WHERE code in ( ';
	for (const num in studyPlan) {
		if (num !== (studyPlan.length - 1).toString())
			sql += "?,"
		else
			sql += "?)"
	}
	return await db.fromDB(sql, studyPlan);
}


module.exports = {ReadCourses, GetIncompatibeCourse, GetMandatoryCourses, CalculateSumCredit};
