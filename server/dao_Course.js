'use strict';

const sqlite = require('sqlite3');
const DBOperations = require('./database');

const db = new DBOperations();
async function ReadCourses() {

	const sql = 'SELECT * FROM Course ORDER BY name';
	const arg = [];
	return await db.fromDB(sql, arg);
}


async function GetIncompatibeCourse(code) {
	const sql = 'SELECT SecondCourse FROM incompatibeCourses WHERE PrimeCourse =? ';
	const arg = [code]
	return await db.fromDB(sql, arg);

	// return new Promise((resolve, reject) => {
	//
	//
	// 	new db.all(sql, [code], (err, rows) => {
	// 		if (err) {
	// 			reject(err);
	// 		} else {
	// 			resolve(rows);
	// 		}
	// 	});
	// });

}

module.exports = {ReadCourses, GetIncompatibeCourse};
