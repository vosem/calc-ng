const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const mongodb = require("mongodb");
const mongoXlsx = require('mongo-xlsx');
const fs = require('fs');

const app = express();
let db,
	  collection,
    insuranceCollection,
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
  insuranceCollection = db.collection('insurance');
  // saveData(db);
});


app.post('/submit', function(req, res) {

  let receivedData = req.body;
  console.log(receivedData);

  let age = 'Age',
      receivedAge = +receivedData.age,
      sex = 'Sex',
      receivedSex = '', // masculine => m, feminine => f
      query = {};
      if(receivedData.sex === 'Masculine') {
        receivedSex = 'm';
      } else { receivedSex = 'f'; }
  query[age] = receivedAge;
  query[sex] = receivedSex;

  let receivedTerm = +receivedData.term,
      projection = {};
  projection[receivedTerm] = 1;
  projection['_id'] = 0;

  let sum = 0;

  insuranceCollection.find(query).project(projection).toArray(function (err, items) {
    sum = +items[0][receivedTerm];
    res.end(JSON.stringify(sum));
  });
});




// Converting data from xlsx and saving them to mongo
let saveData = db => {
  	for(let i of dataIns){
		console.log(i);
		insuranceCollection.insertOne(i);
	}
};

let convert = () => {
  mongoXlsx.xlsx2MongoData("./dist/calc-ng/assets/VS_women.xlsx", null, function(err, mongoData) {
    if (mongoData) { dataIns = mongoData; }
      let json = JSON.stringify(mongoData);
      fs.writeFileSync('./dist/calc-ng/assets/insurance.json', json);
  });
};
// convert();

