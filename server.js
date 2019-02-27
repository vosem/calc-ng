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

mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://heroku_37j513mk:m063djag2fgn36smckkh9s78do@ds145694.mlab.com:45694/heroku_37j513mk', { useNewUrlParser: true }, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  db = client.db();
  collection = db.collection('ladies-insurance');
  // show dbs;
  // console.log(collection);
  // collection.insertOne({x: 1});
  var temp = collection.find({ Age: 3 }).toArray(function (err, items) {
                    console.log(items);
                   // res.send(items);
                });

  console.log(temp);
  // saveData();
});


app.post('/submit', function(req, res) {

  let receivedData = req.body;
  console.log(receivedData);
  console.log(typeof(receivedData));

  let receivedAge = req.body.age;
  let receivedTerm = req.body.term;

  // console.log(collection.find());

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

  res.end(JSON.stringify('10000000'));
});









// let saveData = db => {
//   	for(let i of dataIns){
// 		console.log(i);
// 		collection.insertOne('a');
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

