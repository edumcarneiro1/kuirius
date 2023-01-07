var MongoClient = require('mongodb').MongoClient;

var URL = "mongodb+srv://root:root@kuriuscluster.md9cifv.mongodb.net/?retryWrites=true&w=majority";
var DB_NAME = 'kuiriusdb'


var dishes = [
    {name: 'Arroz de lavagante'},
    {name: 'Arroz de marisco'},
    {name: 'Arroz de pato'},
    {name: 'Bacalhau'},
    {name: 'Cabrito'},
    {name: 'Caldeirada de Peixe'},
    {name: 'Cozido à Portuguesa'},
    {name: 'Enguias'},
    {name: 'Filetes Polvo com Arroz do Mesmo'},
    {name: 'Francesinha'},
    {name: 'Leitão'},
    {name: 'Naco'},
    {name: 'Posta á Mirandesa'},
    {name: 'Rodizio'},
    {name: 'Tripas à moda do Porto'},
    {name: 'Vitela'}
]

MongoClient.connect(URL, function(err, db) {
  if (err) throw err;
  var dbo = db.db(DB_NAME);


  dbo.collection("dishes").insertMany(dishes, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});



