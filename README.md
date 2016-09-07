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

