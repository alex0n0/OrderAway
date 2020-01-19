# OrderAway

App is a SaaS for restaurants to sign up for accounts and access table side ordering interfaces that directly display orders on a kitchen interface. An additional corporate portal is provided for restaurants to create and update multiple menus and publish to the table side interface.

[Click here](https://beanstalk03.herokuapp.com/) for an interactive demo.

## Features

- Responsive React application
- Corporate Interface
  - Set a single menu as the active menu
  - Duplicate and modify menus
  - CRUD actions on all menus and menu items
- Customer Interface
  - Create a bill for each round of customers
  - Make orders for menu items
  - Display key information for menu items (title, description, price, tags e.g. vegan, vegetarian, gluten free)
- Kitchen Interface
  - View live orders and mark them as complete
  - View history of orders for past 24 hours
- Mongo database with Mongoose ODM

## Getting Started

Begin by cloning the [OrderAway](https://github.com/alex0n0/OrderAway) repository and install dependencies:

```terminal
git clone https://github.com/alex0n0/OrderAway.git
npm install
```

Build the application and start the server to see it in action:

```terminal
npm run build
npm run start
go to http://localhost:5000 in your browser
```

## Built With

Front End

- React

Node Packages

- Express
- React
- Moment
- Mongodb
- Mongoose
- Socket Io
- Json Web Token
- Uuid

## License

This project is licensed under the terms of the [MIT](https://github.com/alex0n0/OrderAway/blob/master/LICENSE) license.
