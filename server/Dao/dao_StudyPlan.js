'use strict';

const sqlite = require('sqlite3');
const DBOperations = require('../database');

const db = new DBOperations();

async function ReadStudyPlan(id) {

	const sql = 'SELECT * FROM studyplan WHERE userID =?';
	const arg = [id];
	return await db.fromDB(sql, arg);
}

//delete last plan before  running this query
async function createStudyPlanIntoDB(ListCourse, UserId) {
	let sql = `INSERT INTO studyplan ( userID, courseCode ) VALUES `;
	let args = []
	for (const course of ListCourse) {
		sql += '(?,?),';
		args.push(UserId);
		args.push(course);
	}
	sql = sql.slice(0, -1)

	return await db.intoDB(sql, args);

}

async function deleteItemByIdFromDB(userId) {
	const sql = 'DELETE FROM studyplan WHERE userID = ?';
	const args = [userId];

	return await db.deleteFromDB(sql, args);

}

module.exports = {ReadStudyPlan, createStudyPlanIntoDB, deleteItemByIdFromDB};
