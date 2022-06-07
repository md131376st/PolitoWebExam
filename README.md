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

- POST `/api/login`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `Course` - contains course code, name, credit number, number student in rolled, course max capacity , mandatory Course
- Table `incompatibeCourses` - contains  course code and the one of its incompatible course  
- Table `users` - contains xx yy zz
- Table `something` - contains ww qq ss
- ...

## Main React Components

- `CourseTable` (in `CourseTable.js`): shows the course table 
- `CourseRow` (in `CourseRow.js`): shows the information of a singles course 

- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)
