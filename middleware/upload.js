const util = require("util");
const Multer = require("multer");
const maxSize = '50mb';

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: {fileSize:maxSize}
}).single("file");

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
