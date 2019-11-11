jsforce.browser.init({
    clientId: "3MVG9pe2TCoA1Pf6rEeJ8R.bAvcmpyP4fspWbIKVgYFT8aBhedO.cgPlYEJPqwWx2XctzyaVzp1thL2RKs8c.",
    redirectUri: "https://platform-app-events.herokuapp.com/oauthcallback.html",
    proxyUrl: "https://node-salesforce-proxy.herokuapp.com/proxy/"
});

if (jsforce.browser.isLoggedIn()) {
    $("#loginBtn").addClass("hidden");
    $('#afterSignin').removeClass("hidden");
    $('#logoutBtn').removeClass("hidden");
    getUser();
    startQuery();
} else {
    $('#logoutBtn').addClass("hidden");
    $('#afterSignin').addClass("hidden");
    $('#loginBtn').removeClass("hidden");
    getUser();
    startQuery();
}

localStorage.removeItem('id');
localStorage.removeItem('name');

function startQuery() {
    jsforce.browser.on("connect", function(conn) {
        conn.query("Select Id, Name, CreatedDate, Owner.Name From Folder__c Order By CreatedDate Desc", function(err, res) {
            if (err) {
                return console.error(err);
            } else if (res.records.length > 0) {
                $("#folder-length").append("(" + res.records.length + ")");
                for (var i in res.records) {
                    var date = new Date(res.records[i].CreatedDate);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    var monthName = function(dt){
                        mlist = [
                            "January", "February", "March", "April", "May", "June", "July", "August",
                            "September", "October", "November", "December"
                        ];
                        return mlist[dt.getMonth()];
                    };
                    var fullName = monthName(new Date(year, month, day));
                    $("#row").append(
                        '<div class="card mb-4">' +
                            '<div class="card-body" onclick="selectFolder(this)" style="cursor: pointer;">' +
                                '<h2 class="card-title">' + res.records[i].Name + '</h2>' +
                                '<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</p>' +
                                '<input type="hidden" value="' + res.records[i].Id + '"/>' +
                            '</div>' +
                            '<div class="card-footer text-muted" id="date-' + res.records[i].Id +'">' +
                                'Posted on ' + fullName + ' ' + day + ', ' + year + ' by ' + res.records[i].Owner.Name +
                            '</div>' +
                        '</div>'
                    );
                }

                getUser();
                $("#loginBtn").addClass("hidden");
                $('#logoutBtn').removeClass("hidden");
                $('#afterSignin').removeClass("hidden");
            }
        });
    });
}

function getUser() {
    var url = localStorage.getItem("jsforce0_id");
    var jsforceid = /(\w+)$/.exec(url);
    var userQuery = "SELECT Id,Name FROM User WHERE Id='" + jsforceid[0] + "'";
    var conn = jsforce.browser.connection;

    conn.query(userQuery, function(err, res) {
        if (err) { return handleError(err); }
        $(".navbar-text").text("Signed in as " + res.records[0].Name);
        localStorage.setItem("user_name", res.records[0].Name);
    });
}

function logout() {
    jsforce.browser.logout();
    location.reload();
}

function selectFolder(e) {
    var name = e.firstElementChild.textContent;
    var id = e.lastElementChild.value;
    var date = $("#date-" + id)[0].innerText;

    localStorage.setItem("folder-name", name);
    localStorage.setItem("folder-id", id);
    localStorage.setItem("folder-date", date);
    window.location.href = "folder-edit.html";
};