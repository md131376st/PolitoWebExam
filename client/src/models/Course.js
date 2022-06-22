/**
 * Constructor function for new Course objects
 * @param {string} code
 * @param {string} name
 * @param {number} numCredit
 * @param {number} numInRole
 * @param {number} numCredit
 * @param {number} maxCapacity
 * @param {string} mandatoryCourse
 * @param {Array} IncompatibeCourse
 */
export function Course(code, name, numCredit, numInRole, maxCapacity, mandatoryCourse,
                IncompatibeCourse ) {
	this.code = code;
	this.name = name;
	this.numCredit = numCredit;
	this.numInRole = numInRole;
	this.maxCapacity = maxCapacity;
	this.mandatoryCourse = mandatoryCourse;
	this.IncompatibeCourse =IncompatibeCourse;

}

/**
 * Constructor function for new Course objects
 * @param {number} id
 * @param {string} PrimeCourse
 * @param {string} SecondCourse
 *
 */
function IncompatibeCourse(id, PrimeCourse, SecondCourse) {
	this.id = id;
	this.PrimeCourse = PrimeCourse;
	this.SecondCourse = SecondCourse;
}

function IncompatibeCourseList() {
	this.incompatibeCourseList = [];
	// this.find =(code) =>{
	// 	const result = this.Course
	// }
}


/**
 * Create a new empty transcript object (a list of Course objects)
 */
export function CourseList() {
	this.courseList = [];

	/**
	 * Add a new exam to the list
	 * @param {Course} course the exam to be added
	 */
	this.add = (course) => {
		this.courseList.push(course);
	};

	this.find = (code) => {
		const result = this.courseList.filter((course) => course.code === code);
		return result.length ? result[0] : undefined;
	};


}



