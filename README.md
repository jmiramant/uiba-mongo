# Welcome to Gotham City

Looking to move on up in the world?! Gotham City is just the place to do it. Ambitious, motivated, hungry? You've come to the land of opportunity. Gotham City is full of characters. This world includes Mr. Freeze, a React/Redux/Webpack client app, The Joker, a Node/Express API handling user logic and Black Mask, the MongoDB storage. 

![GitHub Logo](/docs/architecture.png)

## Instructions

#### Development

This section contains notes on the development lifecycle of the project. Once you have installed all your dependencies all the configuration is done for you. using simple The process is outlined [here](docs/development.md).

Development on this project is set up in a typical production/release/development cycle as described in _[A Successful Git Branching Model](http://nvie.com/posts/a-successful-git-branching-model/)_. A typical workflow is as follows:

1. Select a card from Asana - preferably one that is "ready" then move it to "in-progress".

2. Create a branch off of develop called "feature-[feature name]", work and commit into that branch.

        ~$ git checkout -b feature-myfeature dev

3. Once you are done working (and everything is tested) merge your feature into develop.

        ~$ git checkout dev
        ~$ git pull
        ~$ git merge --no-ff feature-myfeature
        ~$ git branch -d feature-myfeature
        ~$ git push origin dev

4. Repeat. Releases will be routinely pushed into master via release branches, then deployed to the server.


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

The path to apply is `/apply/<company-name-spaces-are-dashes>?rid=<recruiterId>`

To allow an user to apply using Uiba, a company object must be create in the database.

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
    **Content:** 
```
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

**POST: Create Admin User**
----
  Create an Admin user at a company. A company must be created first. A user is not required to be on the platform. A user can 'claim' a profile. To claim an admin instance, a user must match the email in a created instance.

* **URL**

  /api/v1/user/company

* **Method:**

  `POST`
  
*  **Headers**

    Requires an ```x-access-token``` from 'api/v1/token'

*  **Required:**
    Headers:  `x-access-token=[string]`
    Body: 
    `email: '<someEmail>'`
    `companyName: '<name_lower_from_company>'`

* **Success Response:**

  * **Code:** 200
    **Content:** 
```
[{
  "__v": 0,
  "updatedAt": "2016-12-09T18:09:36.091Z",
  "createdAt": "2016-12-09T18:09:36.091Z",
  "company_id": "581d388a85b07bff55bb22bf",
  "_id": "584af360e0992539356ee37e",
  "picture": "",
  "website": "",
  "location": "",
  "claim": true,
  "gender": "",
  "apply": {
    "applyComplete": false,
    "applied": false
  },
  "headline": "",
  "email": "someemail@gmail.com",
  "lastName": "",
  "firstName": "",
  "name": ""
}]
```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Please provide an api key." }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** `Please provide a company name. || Please provide an email. || Could not find that company.`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/user/company",
      headers: {
        x-access-token: <token>
      },
      data: {
        email: 'someemail@gmail.com',
        companyName: <name_lower_from_database>
      }
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**POST: Create a Company**
----
  Create a new company. Required fields, description & name.

* **URL**

  /api/v1/company

* **Method:**

  `POST`
  
*  **Headers**

    Requires an ```x-access-token``` from 'api/v1/token'

*  **Required:**
    Headers:  `x-access-token=[string]`
    Body: 
    `email: '<string>'`
    `name: "<string>"`
    `description: "<string>"`
    `foundedDate: "<2016-12-09>"`
    `size: <number>`
    `websiteUrl: "<string>"`
    `logoUrl: "<string>"`
    `specialties: "<string>"`
    `industry: "<string>"`

* **Success Response:**

  * **Code:** 200
    **Content:** 
```
{
"__v": 0,
"name_lower": "some_companyw",
"updatedAt": "2016-12-20T20:42:58.060Z",
"createdAt": "2016-12-20T20:42:58.060Z",
"name": "Some Companyw",
"description": "asdasd asdas asd asd.",
"_id": "585997d2e2cddc7534949ea4",
"specialties": [],
}
```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Please provide an api key." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/company",
      headers: {
        x-access-token: <token>
      },
      data: {
        email: '<string>',
        name: "<string>",
        description: "<string>",
        foundedDate: "<2016-12-09>",
        size: "<number>",
        websiteUrl: "<string>",
        logoUrl: "<string>",
        specialties: "<string>",
        industry: "<string>"
      }
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**POST: Authorize Emails**
----
  Given any number of existing user's emails, will verify the email.

* **URL**

  /api/v1/admin/authorize-emails

* **Method:**

  `POST`
  
*  **Headers**

    Requires an ```x-access-token``` from 'api/v1/token'

*  **Required:**
    Headers:  `x-access-token=[string]`
    Body: 
    `emails: <string>,<string>`(comma seperated)

* **Success Response:**

  * **Code:** 200
    **Content:** 
```
[
  [{
      "_id": "5870238efb1d6b156cd5f096",
      "profile_id": "5870238efb1d6b156cd5f097",
      "email": "djks@gmail.com",
      "password": "$2a$05$8q2dZYH0JCrccuRyj1vldumQsnf2ET.iCXK4oPkPE/PeAUPoGg5aS",
      "__v": 0,
      "verifyEmailToken": "8d8a3f363104e4520c14f54c26f876",
      "verifyEmailTokenExpires": "2017-01-07T23:09:02.172Z",
      "isEmailVerified": true,
      "role": [
        1
      ],
      "claim": false,
      "tokens": [],
    },
    0
  ], ...
]
```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Please provide an api key." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/admin/authorize-emails",
      headers: {
        x-access-token: <token>
      },
      data: {
        emails: 'josh@miramant.me','Another@email.com'
      }
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**DELETE: Delete a User**
----
  This will delete a user and all associated files, including any attributions on Roles or recruiters. There will be nothing left of this user after a delete.

* **URL**

  /api/v1/admin/delete-user

* **Method:**

  `DELETE`
  
*  **Headers**

    Requires an ```x-access-token``` from 'api/v1/token'

*  **Required:**
    Headers:  `x-access-token=[string]`
    Body: 
    `email: '<string>'`
  

* **Success Response:**

  * **Code:** 200
    **Content:** 
`'User: example@gmail.com deleted."`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Please provide an api key." }`
  
* **Code:** 404 NOT FOUND <br />
    **Content:** `User Not Found.`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/admin/delete-user",
      headers: {
        x-access-token: <token>
      },
      data: {
        email: '<string>',
      }
      type : "DELETE",
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
    **Content:** 
```{
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
}
```
 
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
    **Content:** 
```{
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
}
```
 
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

**Get: Export New Users By Recruiter**
----
  Export profile and all nested data for all users applied by recruiterId. Limited to 500.

* **URL**

  /api/v1/export/recruiter/:recruiter_key

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `recruiter_key=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
      {
        "details": {
          "totalUsers": 1
        }
        "data": [1]
        0: {
          "_id": "581d3be4ffde6c5b4ae1feb2"
          "updatedAt": "2016-11-05T01:54:44.647Z"
          "createdAt": "2016-11-05T01:54:44.647Z"
          "user_id": "581d3be4ffde6c5b4ae1feb1"
          "service": "email"
          "__v": 0 
          "childUpdatedAt": "2016-11-05T02:05:25.258Z"
          "picture": ""
          "website": ""
          "location": ""
          "gender": ""
          "apply": {
            "company_id": "581d388a85b07bff55bb22bf"
            "name": "everfi_inc"
            "applyComplete": true "applied": false
          }
          "headline": ""
          "email": "test3@gmail.com"
          "lastName": "Test3"
          "firstName": "Test3"
          "name": "Test3 Test3"
          "language": [1] ...
          "project": [1] ...
          "school": [1] ...
          "interest": [1] ...
          "skill": [1] ...
          "job": [1] ...
        }
      }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/export/recruiter/testermctestygh9f6r",
      headers: {
        x-access-token: <TOKEN>
      }
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Get: Export New Users By Company**
----
  Export profile and all nested data for all users applied by company name. Limited to 500.

* **URL**

  /api/v1/export/list?attr=<apply.attr>&target=<company.name_lower>

* **Method:**

  `GET`
  
*  **URL Params**
    
   `attr=[string]` - this is attribute under the apply attribute on the company object.
   `target=[string]` - this is attribute under the apply attribute on the company object.

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
      {
        "details": {
          "totalUsers": 1
        }
        "data": [1]
        0: {
          "_id": "581d3be4ffde6c5b4ae1feb2"
          "updatedAt": "2016-11-05T01:54:44.647Z"
          "createdAt": "2016-11-05T01:54:44.647Z"
          "user_id": "581d3be4ffde6c5b4ae1feb1"
          "service": "email"
          "__v": 0 
          "childUpdatedAt": "2016-11-05T02:05:25.258Z"
          "picture": ""
          "website": ""
          "location": ""
          "gender": ""
          "apply": {
            "company_id": "581d388a85b07bff55bb22bf"
            "name": "everfi_inc"
            "applyComplete": true "applied": false
          }
          "headline": ""
          "email": "test3@gmail.com"
          "lastName": "Test3"
          "firstName": "Test3"
          "name": "Test3 Test3"
          "language": [1] ...
          "project": [1] ...
          "school": [1] ...
          "interest": [1] ...
          "skill": [1] ...
          "job": [1] ...
        }
      }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/v1/export/list?attr=name&target=truveris",
      headers: {
        x-access-token: <TOKEN>
      }
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```