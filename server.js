var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var clientId = process.env.CLIENT_ID;
var redirectUri = "https://platform-app-events.herokuapp.com/oauthcallback.html";
var proxyUrl = "https://node-salesforce-proxy.herokuapp.com/proxy/";

app.use(express.static(__dirname + "/Public"));
app.listen(port, "0.0.0.0", function() {
	console.log("Listening on Port 5000");
});

jsforce.browser.init({
	clientId: clientId,
	redirectUri: redirectUri,
	proxyUrl: proxyUrl
});