var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/Public"));
app.listen(port, "0.0.0.0", function() {
	localStorage.setItem("Port", port);
	console.log("Listening on Port 5000");
});