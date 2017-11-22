const uuid = require('uuid')

function RequestId() {
  return function(req, res, next) {
    console.log("add uuid...")
    req.id = uuid.v4();
    next()
  }
}

module.exports = RequestId;