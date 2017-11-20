"use strict;"

class UsersController {
  constructor(){
    console.log('initilize user controller....')
  }

  index(req, res, next) {
    console.log("users controller index method is hit....");
    res.send('respond with a index resource..!!!');
  }

  show(req, res, next) {
    console.log("users controller show method is hit....");
    res.send('respond with a show resource..!!!');
  }
}

module.exports = UsersController;