# Calculator app
A webpage with a calculator and a list of recent calculations.

## Using it
The site is running live here: http://52.15.174.58/frontend
Create an account, sign in, and then use the calculator and see recent calculations made by any of the users.

## Host it yourself
The backend uses NodeJS, Express and Mongoose. The frontend uses React with JSX. To set up:
* Install node and npm.
* Clone this repository to your server
* Install node packages: `npm install`
* Set up a MongoDB database. Put the connection string for that db server into the mongoDB variable in mongoAuth.js.
* Set up a JSX preprocessor. You can do so by following the steps at the bottom of this page https://reactjs.org/docs/add-react-to-a-website.html
* Create a folder called `react_compiled` inside the `static` folder. Run the JSX preprocessor on all of the JavaScript files in the `static/react` folder and put the output into the `react_compiled` folder. Afterwards your directory structure should look like
```
calculator-website-nodejs / main.go
calculator-website-nodejs / CheckSession.go
.
.
calculator-website-nodejs / static / react / app.js
calculator-website-nodejs / static / react / AuthPage.js
.
.
calculator-website-nodejs / static / react_compiled / app.js
calculator-website-nodejs / static / react_compiled / AuthPage.js
.
.
```
* cd into the nodejs directory and run the command `node app.js`
