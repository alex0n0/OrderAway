# https://github.com/alex0n0/ordering-app

App allows you to create and remove burgers and keep track of their time of origin and update.

[Click here](https://beanstalk99.herokuapp.com/) for an interactive demo.

## Features

- Single page application
- Responsive
- Create and move burgers from "Delivered" to "Eaten" sections
- New burgers are also added to a "Quick Order" list
- MySQL database for data storage

## Getting Started

Begin by cloning the [ordering-app](https://github.com/alex0n0/ordering-app) repository and install dependencies:

```terminal
git clone https://github.com/alex0n0/eat-da-burger.git
npm install
```

Create a **.env** file and add your database credentials:

```javascript
DB_HOST=your localhost
DB_USER=your username
DB_PASSWORD=your password
DB_DATABASE=your database name
```

Run the application to see it in action:

```terminal
npm run start
go to http://localhost:8080 in your browser
```

## Built With

Front End

- HTML, CSS, JS

Node Packages

- Express
- Express-handlebars
- Moment
- Mysql
- Dotenv

## License

This project is licensed under the terms of the [MIT](https://github.com/alex0n0/eat-da-burger/blob/master/LICENSE) license.
