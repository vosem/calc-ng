var express = require("express");
var bodyParser = require("body-parser");
const path = require('path');
var mongodb = require("mongodb");
var mongoXlsx = require('mongo-xlsx');
var fs = require('fs');

const app = express();
let db,
	  collection,
	  dataIns = [{a: 'a'}];

app.use(express.static(path.join(__dirname, './dist/calc-ng')));
app.use(bodyParser.json());
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + './dist/calc-ng/index.html'));
});
app.listen(process.env.PORT || 8080, function(){
  console.log(process.env.MONGODB_URI);
});

// mongodb.MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, function (err, client) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }
//   db = client.db();
//   collection = db.collection('ladies-insurance');
//   saveData();
// });

function saveData (db) {
  	for(let i of dataIns){
		console.log(i);
		collection.insertOne(i);
	}
};

function convert() {
  mongoXlsx.xlsx2MongoData("./dist/calc-ng/assets/Ladies.xlsx", null, function(err, mongoData) {
    if (mongoData) { dataIns = mongoData; }
      var json = JSON.stringify(mongoData); //convert it back to json
      fs.writeFileSync('./dist/calc-ng/assets/test.json', json);
  });
};
// convert();
