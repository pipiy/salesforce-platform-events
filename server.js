var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var port = process.env.PORT || 8080;
var clientId = process.env.CLIENT_ID;
var redirectUri = "https://platform-app-events.herokuapp.com/oauthcallback.html";
var proxyUrl = "https://node-salesforce-proxy.herokuapp.com/proxy/";

app.use(express.static(__dirname + "/Public"));
// app.use('Public/app.js', express.static(path.join(__dirname, '/app.js')));
// app.get('/', (req, res) => {
//     res.sendFile('Public/index.html', {
//         root: path.join(__dirname, './')
//     })
// })

app.listen(port, "0.0.0.0", function() {
	console.log("Listening on Port 8080");
});
