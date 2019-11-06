var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var clientId = process.env.clientId;
console.log(clientId);

app.use(express.static(__dirname + "/Public"));
app.listen(port, "0.0.0.0", function() {
	console.log("Listening on Port 5000");
});