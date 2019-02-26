const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const mongodb = require("mongodb");
const mongoXlsx = require('mongo-xlsx');
const fs = require('fs');

const app = express();
let db,
	  collection,
	  dataIns = [];

app.use(express.static(path.join(__dirname, './dist/calc-ng')));
app.use(bodyParser.json());
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + './dist/calc-ng/index.html'));
});
app.listen(process.env.PORT || 8080);
console.log('Calc-ng is running');

app.post('/submit', function(req, res) {

  var receivedData = req.body;
    console.log(receivedData);
    console.log(typeof(receivedData));

  //   var receivedUrl = req.body.url;
  //   var receivedModel = req.body.model;

  // //working with Mongo
  // var List = require('./db/list').List;
  // var list = new List(receivedData);
  // list.save(function (err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('Ok');
  //     }
  // });

  res.end(JSON.stringify('100'));
});









// let saveData = db => {
//   	for(let i of dataIns){
// 		console.log(i);
// 		collection.insertOne(i);
// 	}
// };

let convert = () => {
  mongoXlsx.xlsx2MongoData("./dist/calc-ng/assets/Ladies.xlsx", null, function(err, mongoData) {
    if (mongoData) { dataIns = mongoData; }
      let json = JSON.stringify(mongoData);
      fs.writeFileSync('./dist/calc-ng/assets/test.json', json);
  });
};
// convert();

// mongodb.MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, function (err, client) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }
//   db = client.db();
//   collection = db.collection('ladies-insurance');
//   saveData();
// });