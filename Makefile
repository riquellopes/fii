test:
	NODE_ENV=.env.test node_modules/mocha/bin/mocha tests/
run:
	node_modules/.bin/nodemon app.js
