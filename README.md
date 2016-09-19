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