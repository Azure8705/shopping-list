var express = require('express');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var app = express();
    app.use(express.static('public'));

var port = 8080;

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

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
	if(!req.body) {
		return res.sendStatus(404);
	};
	
	var item = storage.add(req.body.name);
	res.status(201).json(item);
});

app.delete('/items/:id', function(req, res) {
   for(var i=0; i <= storage.items.length; i++) {
       if(i = storage.items[req.params.id].id) {
         console.log('item found - ID: ' + i);
         break;  
       };
   };
   storage.items.splice(req.params.id, 1);
   res.statusCode = 200;
   return res.send('200');
});

app.put('/items/:id', jsonParser, function(req,res) {

    storage.items[req.params.id].name = req.body.name;
    
    return res.sendStatus(202);
});

app.listen(process.env.PORT || port, function(){
    console.log("Shopping List Server - Active on " + port);
    console.log("Press Control+C to close");
});