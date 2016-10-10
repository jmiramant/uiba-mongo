# Welcome to Gotham City

Looking to move on up in the world?! Gotham City is just the place to do it. Ambitious, motivated, hungry? You've come to the land of opportunity. Gotham City is full of characters. This world includes Mr. Freeze, a React/Redux/Webpack client app, The Joker, a Node/Express API handling user logic and Black Mask, the MongoDB storage. 

![GitHub Logo](/docs/architecture.png)

## Instructions

#### Development

Development is a breeze. Once you have installed all your dependencies all the configuration is done for you. using simple The process is outlined [here](docs/development.md).

#### Unit Tests

Testing with:
- `karma` as test runner
	- `karma.conf.js` for the main karma configuration (it has webpack configurations)
	- `tests.webpack.js` which is the single entry file. It uses `webpack`'s require API to find all the files we need that have a `-test.js` suffix.
- `mocha` as the test framework
- `jsdom` as my test environment

```bash
# Run test once
npm test

# Run in watch mode
npm test:watch
```

Unit tests for async (redux) actions, reducers, and stateless components with [enzyme](http://airbnb.io/enzyme).

## Application Workflow

The path to apply is '/apply/<company-name-spaces-are-dashes>?rid=<recruiterId>'
To allow an user to apply using Ubia, a company object must be create in the database.

## Application Workflow

The path to apply is '/apply/<company-name-spaces-are-dashes>?rid=<recruiterId>'

To allow an user to apply using Ubia, a company object must be create in the database.

#### Creating a Company Object

There are two ways to create an Company item in the `companies` collection. 

##### 1. Via MLab Portal 
  - Access MLAB via Heroku SSL and
  - Select the 'companies' collection
  - Select Add Document from the upper right corner
  - Create a document with data of the following values. name and name_lower are required.
    ```javascript
        {
          "name": "Truveris",
          "name_lower": "truveris",
          "location": "2 Park Ave #1500, New York, NY 10016",
          "description": "Brokers, health plans, unions, employers, pharmaceutical manufacturers, and consumers use our technology and insights to make smarter decisions.",
          "foundedDate": {
              "$date": "2009-02-01T07:00:00.000Z"
          },
          "size": 100,
          "logoImg": "images/truveris-logo.png"
        }
    ```
    
##### 2. Using Shell
  - SSH MLab Shell 
      - Staging: `mongo ds145405.mlab.com:45405/heroku_ntt4p0mr -u <dbuser> -p <dbpassword>
`
      - Production: `mongo ds145405.mlab.com:45405/heroku_7xlg5vkl -u <dbuser> -p <dbpassword>
`
    - Insert company object through comand line
         ```
            db.companies.insert({
                name: "Truveris",
                name_lower: 'truveris',
                location: "2 Park Ave #1500, New York, NY 10016",
                description: "Brokers, health plans, unions, employers, pharmaceutical manufacturers, and consumers use our technology and insights to make smarter decisions.",
                foundedDate: new Date(2009, 1, 1),
                size: 100,
                logoImg: "images/truveris-logo.png"
            })
        ```

#### Creating a Recruiter Object
To track applicants to a specific recruiter an recruiter must be generated in the database. The creation of this user will generate a `recruiterId`. This will be appeneded to the apply url to track attribution using the `rid` param :
```
/apply/<company-name>?rid=<recruiterId>
```

##### POST: Create Recruiter
Create a Recruiter object to generate RecruiterId and track applications

* **URL**: /api/v1/recruiter/create
* **Method:** `POST`
*  **Headers:** `{Content-Type: application/x-www-form-urlencoded}`
*  **Required:**
        `firstName=[string]`
        `lastName=[string]`
* **Response:** 
    ```
    {
        "__v": 0
        "updatedAt": "2016-10-10T17:22:34.872Z"
        "createdAt": "2016-10-10T17:22:34.872Z"
        "firstName": "asd"
        "lastName": "asdas"
        "key": "asdasdasa2x1or"
        "_id": "57fbce5a379462a03ee97284"
        "credit": [0]
    }
    ```
![REST Client Example](/docs/recruiter_rest.png)

## Environment

We are using heroku for our live staging and production instances; 

Staging: [cryptic-temple-34724](https://cryptic-temple-34724.herokuapp.com)
Production: [uiba-production](https://uiba-production.herokuapp.com)

Master branch deploys to production. Staging deploys to staging. 


## External API


**Creating a token**
  - Ensure user is authenticated on app. 
  - Hit `/api/v1/token' with `email` and `password` as headers. You will be returned a Token.
  - Pass this token as a header on `x-access-token`. 
  - Token will expire after 1 week.


**Get: Generate Token**
----
  Create a token to use for internal API access.

* **URL**

  /api/v1/token

* **Method:**

  `GET`
  
*  **Headers**

  Requires an @uiba email authenticated on the app.

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```
    {
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N2RlZmU4YTJlOWVmNWIwNTJjNjVmZWMiLCJleHAiOjE0NzQ4Mzc2MDgzMzN9.iGTUcCE9wTlG6jpxAw-hZI43fRg_rT-PDZTWDC_r7fU"
      "expires": 1474837608333
      "user": {
        "_id": "57defe8a2e9ef5b052c65fec"
        "profile_id": "57defe8a2e9ef5b052c65fed"
        "email": "token@token.com"
        "password": "$2a$05$qgq9PMcvKuIjDvWqjsqqy.HY46kzcq5ngh036xp47ubjcJKhDNkc."
        "__v": 0
        "tokens": [0]
      }
    }

    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/token",
      headers: {
        email: <email>,
        password: <password>,
      }
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Get: Export New Users**
----
  Export user data for all new users after a provided timestamp. Limited to 500.

* **URL**

  /api/v1/export/created/:epoch_datetime

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `epoch_datetime=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
  "details": {
    "timestamp": "2016-09-10T00:00:00.000Z",
    "returnedUsers": 3,
    "totalUsers": 3,
    "paginated": false
  },
  "data": [{
    "_id": "57d37851c62123309e64b4fb",
    "updatedAt": "2016-09-10T03:04:49.337Z",
    "createdAt": "2016-09-10T03:04:49.337Z",
    "user_id": "57d37851c62123309e64b4fa",
    "service": "email",
    "picture": "",
    "website": "",
    "location": "",
    "gender": "",
    "headline": "",
    "email": "qwe@qwe.com",
    "lastName": "qwe",
    "firstName": "qwe",
    "name": "qwe qwe",
    "language": [{
      "_id": "57dc75ea635535483012c967",
      "updatedAt": "2016-09-16T22:44:58.717Z",
      "createdAt": "2016-09-16T22:44:58.717Z",
      "profile_id": "57d37851c62123309e64b4fb",
      "proficiency": "minimum professional proficiency",
      "experience": 5,
      "__v": 0,
      "language": "Adyghe"
    }],
    "project": [],
    "school": [],
    "skill": [],
    "job": [{
      "_id": "57d9c3643854f59c081e9a65",
      "updatedAt": "2016-09-14T21:40:57.538Z",
      "createdAt": "2016-09-14T21:38:44.317Z",
      "profile_id": "57d37851c62123309e64b4fb",
      "company_id": "57d9c3643854f59c081e9a64",
      "companyName": "d",
      "startDate": "2016-02-01T22:38:23.000Z",
      "endDate": "2016-03-01T22:38:23.000Z",
      "__v": 0,
      "current": false,
      "description": "asdas",
      "headline": "",
      "title": "d"
    }]
  },
  ...
  ]
}```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/export/created/1473465600000",
      headers: {
        x-access-token: <TOKEN>
      }
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Get: Export Updated Users**
----
  Export user data for all users that have updated content after a provided timestamp. Limited to 250.

* **URL**

  /api/v1/export/updated/:epoch_datetime

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `epoch_datetime=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```{
  "details": {
    "timestamp": "2016-09-10T00:00:00.000Z",
    "returnedUsers": 3,
    "totalUsers": 3,
    "paginated": false
  },
  "data": [{
    "_id": "57d37851c62123309e64b4fb",
    "updatedAt": "2016-09-10T03:04:49.337Z",
    "createdAt": "2016-09-10T03:04:49.337Z",
    "user_id": "57d37851c62123309e64b4fa",
    "service": "email",
    "picture": "",
    "website": "",
    "location": "",
    "gender": "",
    "headline": "",
    "email": "qwe@qwe.com",
    "lastName": "qwe",
    "firstName": "qwe",
    "name": "qwe qwe",
    "language": [{
      "_id": "57dc75ea635535483012c967",
      "updatedAt": "2016-09-16T22:44:58.717Z",
      "createdAt": "2016-09-16T22:44:58.717Z",
      "profile_id": "57d37851c62123309e64b4fb",
      "proficiency": "minimum professional proficiency",
      "experience": 5,
      "__v": 0,
      "language": "Adyghe"
    }],
    "project": [],
    "school": [],
    "skill": [],
    "job": [{
      "_id": "57d9c3643854f59c081e9a65",
      "updatedAt": "2016-09-14T21:40:57.538Z",
      "createdAt": "2016-09-14T21:38:44.317Z",
      "profile_id": "57d37851c62123309e64b4fb",
      "company_id": "57d9c3643854f59c081e9a64",
      "companyName": "d",
      "startDate": "2016-02-01T22:38:23.000Z",
      "endDate": "2016-03-01T22:38:23.000Z",
      "__v": 0,
      "current": false,
      "description": "asdas",
      "headline": "",
      "title": "d"
    }]
  },
  ...
  ]
}```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/export/updated/1473465600000",
      headers: {
        x-access-token: <TOKEN>
      }
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
