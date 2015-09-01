var express = require('express');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
var port = 8080;
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
	if(!req.body) {
		return res.sendStatus(400);
	};
	
	var item = storage.add(req.body.name);
	res.status(201).json(item);
});

app.delete('/items/:id', function(req, res) {
   if(storage.items.length <= req.params.id) {
       res.statusCode = 404;
       return res.send('Error 404: Not Found')
   };
   storage.items.splice(req.params.id, 1);
   res.json(true);
   
});

app.listen(process.env.PORT || port);

console.log("Shopping List Server - Active on " + port);
console.log("Press Control+C to close");