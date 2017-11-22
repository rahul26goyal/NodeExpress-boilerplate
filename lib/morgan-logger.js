
const path = require('path');
const fs = require('fs')

function MorganLogger(mode) {
  const logger = require('morgan');
  logger.token('host', function(req) {return "host-ip: 127.0.0.0"})
  logger.token('pid', function(req){return "PID: "+ process.pid})
  logger.token('reqId', function(req) { return "reqId: "+ req.id});
  logger.token('date', function(req) { return new Date().toISOString();});
  let logDirectory = path.join(__dirname,'..', 'log')
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
  console.log("node:", mode)
  let accessLogStream = fs.createWriteStream(path.join(logDirectory, mode + '.log'), {flags: 'a'})
  accessLogStream.write("Saa")
  return logger('[:host :pid :date] [:remote-addr :remote-user :reqId HTTP/:http-version :url :method :referrer ] [:status ]', {stream: accessLogStream})
}

module.exports = MorganLogger;