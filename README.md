# Exam #12345: "Exam Title"

## Student: s123456 LASTNAME FIRSTNAME

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

- GET `/api/v1/Courses`
    - Description: Get the full list of courses
    - Request body: _None_
    - Request query parameter: _None_
    - Response: `200 OK` (success)
    - Response body: Array of objects, each describing one Course :

``` JSON
{
    "courseList": [
        {
            "code": "01UDFOV",
            "name": "Applicazioni Web I",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": [
                "01TXYOV"
            ]
        },
        {
            "code": "02GOLOV",
            "name": "Architetture dei sistemi di elaborazione",
            "numCredit": 12,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": [
                "02LSEOV"
            ]
        },
        {
            "code": "03UEWOV",
            "name": "Challenge",
            "numCredit": 5,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": []
        },
        {
            "code": "01URROV",
            "name": "Computational intelligence",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": []
        },
        {
            "code": "02LSEOV",
            "name": "Computer architectures",
            "numCredit": 12,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": [
                "02GOLOV"
            ]
        },
        {
            "code": "01OTWOV",
            "name": "Computer network technologies and services",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": 3,
            "IncompatibeCourse": [
                "02KPNOV"
            ]
        },
        {
            "code": "01SQJOV",
            "name": "Data Science and Database Technology",
            "numCredit": 8,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": [
                "01SQMOV",
                "01SQLOV"
            ]
        },
        {
            "code": "01SQMOV",
            "name": "Data Science e Tecnologie per le Basi di Dati",
            "numCredit": 8,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": [
                "01SQJOV",
                "01SQLOV"
            ]
        },
        {
            "code": "01SQLOV",
            "name": "Database systems",
            "numCredit": 8,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": [
                "01SQJOV",
                "01SQMOV"
            ]
        },
        {
            "code": "01TYMOV",
            "name": "Information systems security services",
            "numCredit": 12,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": [
                "01UDUOV"
            ]
        },
        {
            "code": "05BIDOV",
            "name": "Ingegneria del software",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": [
                "04GSPOV"
            ]
        },
        {
            "code": "01URSPD",
            "name": "Internet Video Streaming",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": 2,
            "IncompatibeCourse": []
        },
        {
            "code": "01OUZPD",
            "name": "Model based software design",
            "numCredit": 4,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": []
        },
        {
            "code": "02GRSOV",
            "name": "Programmazione di sistema",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": [
                "01NYHOV"
            ]
        },
        {
            "code": "01SQOOV",
            "name": "Reti Locali e Data Center",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": []
        },
        {
            "code": "01UDUOV",
            "name": "Sicurezza dei sistemi informativi",
            "numCredit": 12,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": [
                "01TYMOV"
            ]
        },
        {
            "code": "04GSPOV",
            "name": "Software engineering",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": [
                "05BIDOV"
            ]
        },
        {
            "code": "01TYDOV",
            "name": "Software networking",
            "numCredit": 7,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": []
        },
        {
            "code": "01NYHOV",
            "name": "System and device programming",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": 3,
            "IncompatibeCourse": [
                "02GRSOV"
            ]
        },
        {
            "code": "02KPNOV",
            "name": "Tecnologie e servizi di rete",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": 3,
            "IncompatibeCourse": [
                "01OTWOV"
            ]
        },
        {
            "code": "01TXYOV",
            "name": "Web Applications I",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": 3,
            "IncompatibeCourse": [
                "01UDFOV"
            ]
        },
        {
            "code": "01TXSOV",
            "name": "Web Applications II",
            "numCredit": 6,
            "numInRole": null,
            "maxCapacity": null,
            "IncompatibeCourse": []
        }
    ]
}
```

- GET `/api/v1/StudyPlan/`+userId
    - Description: Get the full list study plan
    - Request body: _None_
    - Request query parameter: userID
    - Response: `200 OK` (success)
    - Response body: Array of Course code list :
  ``` json
  [
    "01UDFOV",
    "02GOLOV",
    "03UEWOV",
    "01URROV"]
  ```

  - post `/api/v1/StudyPlan/`+userId
    - Description: Update/CreateStudyPlan
    - Request body:
    - ``` json
      {"PlanType": 1,
  "studyPlanList": [
  "01UDFOV",
  "02GOLOV",
  "03UEWOV",
  "01URROV"
  ]
  }
      ```
    - Request query parameter: userID
    - Response: `201 CREATE` (success)


- DELETE `/api/v1/StudyPlan/`+userId
  - Description: Delete the hole study plan
  - Request body: _None_
- Request query parameter: userID
- Response: `200 CREATE` (success)

- POST `/api/vi/sessions`
  - Description: login data
  - Request body: 
``` JSON

{
"username":"test@gmail.com",
"password":"password"
}

```
  - Request query parameter: _None_
  - Response: `200 OK` (success)
  - Response body: Array of user object
``` JSON
 {
    "id": 1,
    "username": "test@gmail.com",
    "name": "test",
    "studyplan": 1
}
```

- Delete `/api/v1/sessions/current`
    - Description: logout
    - Response: `200 OK` (success)

- GET `/api/v1/sessions/current`
- Description: Get credintioals of the corrent user
- Response: `200 OK` (success)
- Response body: Array of user object

 ``` JSON
{
    "id": 1,
    "username": "test@gmail.com",
    "name": "test",
    "studyplan": 1
}
```

## Database Tables

- Table `Course` - contains course code, name, credit number, course max capacity , mandatory
  Course
- Table `incompatibeCourses` - contains course code and the one of its incompatible course
- Table `users` - contains user email, password, salt, name, study plan type 
- Table `studyplan` - contains user id , course code
- ...

## Main React Components
- `LoginPage` (in `Components\Auth\LoginPage.js`): show login page
- `LogoutButton` (in `Components\Auth\LoginPage.js`): show logout page
- `CourseTable` (in `Components\CourseList\CourseTable.js`): shows the course table
- `CourseRow` (in `Components\CourseList\CourseRow.js`): shows the course details and add button logic
- `DeletePlan` (in `Components\StudyPlan\DeletePlan.js`): Delete the study plan
- `DeletePlan` (in `Components\StudyPlan\DeletePlan.js`): Delete the study plan
- `StudyPlanRow` (in `Components\StudyPlan\StudyPlanRow.js`): show the details of course in study plan
- `StudyPlanTable` (in `Components\StudyPlan\StudyPlanTable.js`): the current study plan table


## Screenshot

![homeUnauthenticated](./images/1.png)
![expand course](./images/2.png)
![loginpage](./images/3.png)
![home login user](./images/4.png)
![edit mode](./images/5.png)
![Screenshot](./images/6.png)
![add change color](./images/7.png)

## Users Credentials

```json
{
    "username":"test@gmail.com",
    "password":"password"
}
```
```json
{
    "username":"test1@gmail.com",
    "password":"password"
}
```
```json
{
    "username":"test3@gmail.com",
    "password":"password"
}
```
```json
{
    "username":"test4@gmail.com",
    "password":"password"
}
```
```json
{
    "username":"test5@gmail.com",
    "password":"password"
}
```
