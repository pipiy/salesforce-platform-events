jsforce.browser.init({
    clientId: "3MVG9pe2TCoA1Pf6rEeJ8R.bAvcmpyP4fspWbIKVgYFT8aBhedO.cgPlYEJPqwWx2XctzyaVzp1thL2RKs8c.",
    redirectUri: "https://platform-app-events.herokuapp.com/oauthcallback.html",
    proxyUrl: "https://node-salesforce-proxy.herokuapp.com/proxy/"
});
jsforce.browser.on('connect', function(conn) {
    window.close();
});
