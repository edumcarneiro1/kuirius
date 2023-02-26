var MongoClient = require('mongodb').MongoClient;

var URL = "mongodb+srv://root:root@kuriuscluster.md9cifv.mongodb.net/?retryWrites=true&w=majority";
var DB_NAME = 'kuiriusdb'


var restaurantDishes = [
    {name: 'Convívio', city: '63b9a00f7e2cc972a6dceb17', link:'', score: '5', author: 'Maria Marques', dateOfCreation: '', dish: '63b9abf8da303f22cb7cc01a'},
    {name: 'Hamburgo', city: '63b9a00f7e2cc972a6dceb19', link:'', score: '2', author: 'João Teixeira', dateOfCreation: '', dish: '63b9abf8da303f22cb7cc01a'},
    {name: 'Beergaia', city: '63b9a00f7e2cc972a6dceb19', link:'', score: '10', author: 'Adolfo Mesquita', dateOfCreation: '', dish: '63b9abf8da303f22cb7cc01a'},
    {name: 'Cervejaria F', city: '63b9a00f7e2cc972a6dceb1f', link:'', score: '99', author: 'Joana Costa', dateOfCreation: '', dish: '63b9abf8da303f22cb7cc01a'},
    {name: 'Cantarinha', city: '63b9a00f7e2cc972a6dceb17', link:'', score: '12', author: '', dateOfCreation: '', dish: '63b9abf8da303f22cb7cc01a'},
    {name: 'Santa Francesinha', city: '63b9a00f7e2cc972a6dceb1f', link:'', score: '96', author: 'João Costa', dateOfCreation: '', dish: '63b9abf8da303f22cb7cc01a'},
    {name: 'Trotas', city: '63b9a00f7e2cc972a6dceb19', link:'', score: '2', author: 'Maria Ferreira', dateOfCreation: '', dish: '63b9abf8da303f22cb7cc01a'},
    {name: 'Meia Banana', city: '63b9a00f7e2cc972a6dceb17', link:'', score: '14', author: 'Augusto Costa', dateOfCreation: '', dish: '63b9abf8da303f22cb7cc01a'},

]





MongoClient.connect(URL, function(err, db) {
    if (err) throw err;
    var dbo = db.db(DB_NAME);
  
  
    dbo.collection("restaurants_dishes").insertMany(restaurantDishes, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });
  