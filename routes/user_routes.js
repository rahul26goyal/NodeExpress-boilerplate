"use strict;"
const userController = require('./../app/controller/users_controller');

class UserRoutes {
  constructor(app, obj){
    console.log("Adding user routes..")
    let x = new userController()
    app.get('/users', x.index);
    app.get('/users/show', x.show);
  }
}

module.exports = UserRoutes;