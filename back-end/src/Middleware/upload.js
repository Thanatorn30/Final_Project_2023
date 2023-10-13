const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image');
  },
 
  
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().getTime() +
      ''+
        Math.round(Math.random() * 1000000) +
        '.'+
        file.mimetype.split('/')[1]
    );
  }
});

module.exports = multer({ storage:storage });
