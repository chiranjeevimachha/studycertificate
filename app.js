const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PdfPrinter = require("pdfmake");

var path = __dirname + "/node_modules/pdfmake/build/fonts/Roboto/";

var fonts = {
  Roboto: {
    normal: path + "Roboto-Regular.ttf",
    bold: path + "Roboto-Medium.ttf",
    italics: path + "Roboto-Italic.ttf",
    bolditalics: path + "Roboto-MediumItalic.ttf",
  },
};

const printer = new PdfPrinter(fonts);
const fs = require("fs");
const { stringify } = require("querystring");
const template = require(__dirname + "/templates.js");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// database part

mongoose.connect("mongodb://localhost:27017/students", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const students = mongoose.Schema({
  _id: String,
  name: String,
  group: String,
  year: String,
  academicYear: String,
});

var studentData;

const mecsSC = mongoose.model("mecs", students);

// run("173205");

// pdf maker
// routes

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/details", function (req, res) {
  var rollNo = req.body.rollNo;
  mecsSC.findOne({ _id: rollNo }, function (err, student) {
    if (err) {
      console.log(err);
    } else {
      studentData = student;
      res.status(200).send(studentData);
    }
  });
});

app.post("/generate", function (req, res) {
  var docDefinition = template.studyCertificate(
    studentData.name,
    studentData.year,
    studentData.group,
    studentData._id,
    studentData.academicYear
  );
  var options = {};
  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream(__dirname + "/public/test.pdf"));
  pdfDoc.end();
  setTimeout(() => {
    res.send("test.pdf");
  }, 100);
});

app.listen(3000, function () {
  console.log("Sever Deployed and Listening on port 3000");
});

// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/peopleDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const peopleSchema = mongoose.Schema({
//   name: String,
//   age: Number,
// });

// const people = mongoose.model("People", peopleSchema);

// var person2 = {
//   name: "Chiranjeevi",
//   age: 20,
// };
// var person3 = {
//   name: "Nikhitha",
//   age: 20,
// };
// var person4 = {
//   name: "sai",
//   age: 20,
// };
// var person5 = {
//   name: "indu",
//   age: 20,
// };
// var person6 = {
//   name: "suhel",
//   age: 20,
// };

// // people.insertMany([person2, person3, person4, person5, person6], function (
// //   err
// // ) {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log("Inserted successfully!!!");
// //   }
// // });

// people.find(function (err, people) {
//   if (err) {
//     console.log(err);
//   } else {
//     people.forEach(function (person) {
//       console.log(person.name);
//     });
//   }
// });
// person.save();
