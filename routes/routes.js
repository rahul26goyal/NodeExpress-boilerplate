"use strict;"
const UserRoutes = require('./user_routes')
class Routes {
  constructor(app, obj = {}) {
    console.log("Initializing All routes...")
    this.initilize_user_routes(app, obj);
  };

  initilize_user_routes(app, obj) {
    console.log("Initializing user routes...");
    new UserRoutes(app, obj);
  };
};

module.exports = Routes;