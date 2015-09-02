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
    var item = {name: name, id: ++this.id};
    this.items.push(item);
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
   var id = +req.params.id;
   for(var i=0; i <= storage.items.length; i++) {
       if(id === storage.items[i].id) {
         storage.items.splice(i, 1);
         console.log('Item deleted: ', id);
         return res.status(200).end();  
       };
   };
   return res.send('404').end();
});

app.put('/items/:id', jsonParser, function(req,res) {
    var id = +req.params.id;
    for(var i = 0, len = storage.items.length; i < len; i++){
        if(id === storage.items[i].id) {
            storage.items[id].name = req.body.name;
            return res.status(202).end();
        };
    };
    return res.status(404).end();
});

app.listen(process.env.PORT || port, function(){
    console.log("Shopping List Server - Active on " + port);
    console.log("Press Control+C to close");
});