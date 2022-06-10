'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('./studyPlan.db', (err) => {
	if (err) {
		throw err;
	}
});
const crypto = require('crypto');

exports.getUser = (email, password) => {
	return new Promise(async (resolve, reject) => {
		const sql = 'SELECT * FROM user WHERE email = ?'
		db.all(sql, [email], (err, row) => {
			if (err) {
				reject(err);
			} else if (row === undefined || row.length!==1 ) {
				console.log(row)
				resolve(false);
			} else {
				console.log(row)
				const user = {id: row[0].id, username: row[0].email, name: row[0].name};

				crypto.scrypt(password.toString(), row[0].salt, 32, function (err, hashedPassword) {
					if (err) reject(err);
					if (!crypto.timingSafeEqual(Buffer.from(row[0].password, 'hex'), hashedPassword))
						resolve(false);
					else
						resolve(user);
				});
			}
		});
	});
};

// exports.PostUser = (email, password, name) => {
// 	return new Promise((resolve, reject) => {
// 		const sql = 'INSERT INTO user (email, password, salt, name) \
//                         VALUES (?,?,?,?)'
//
// 		db.run(sql, [email], (err, row) => {
// 			if (err) {
// 				reject(err);
// 			} else if (row === undefined) {
// 				resolve(false);
// 			} else {
// 				const user = {id: row.id, username: row.email, name: row.name};
//
// 				crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
// 					if (err) reject(err);
// 					if (!crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword))
// 						resolve(false);
// 					else
// 						resolve(user);
// 				});
// 			}
// 		});
// 	});
// };

exports.getUserById = (id) => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM user WHERE id = ?';
		db.get(sql, [id], (err, row) => {
			if (err) {
				reject(err);
			} else if (row === undefined) {
				resolve({error: 'User not found!'});
			} else {
				const user = {id: row.id, username: row.email, name: row.name};
				resolve(user);
			}
		});
	});
};
