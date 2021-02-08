const express = require('express');
const router = express.Router();
const path = require('path');

//imports multer
const multer = require('multer');

//defines how files should be stored
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  //sets that the file should be stored with its extension name
  filename: function (req, file, callback) {
    console.log(file);
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

//file filter. determines which type of file ext to store
const fileFilter = (req, file, cb) => {
  //accepts on jpeg and png file and rejects other files
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//adds the storage,limit and filter  when a file is uploaded
//then limits the file size to 5mb.
//nb 1024 bits is 1kb, 1024kb is 1mb hence
//1024*1024 *1 is 1mb

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const Category = require('../../models/category');
