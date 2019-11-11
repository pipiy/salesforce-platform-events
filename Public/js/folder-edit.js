jsforce.browser.init({
    clientId: "3MVG9pe2TCoA1Pf6rEeJ8R.bAvcmpyP4fspWbIKVgYFT8aBhedO.cgPlYEJPqwWx2XctzyaVzp1thL2RKs8c.",
    redirectUri: "https://platform-app-events.herokuapp.com/oauthcallback.html",
    proxyUrl: "https://node-salesforce-proxy.herokuapp.com/proxy/"
});

function fetchData() {
    if (jsforce.browser.isLoggedIn()) {
        $(".hidden").removeClass("hidden");
        document.getElementById("folder-title").innerText = localStorage.getItem("folder-name");
        document.getElementById("inputFolder").value = localStorage.getItem("folder-name");

        $(".navbar-text").append(localStorage.getItem("user_name"));
        $("#posted-date").append(localStorage.getItem("folder-date"));

        var conn = jsforce.browser.connection;
        conn.query("Select Id, Tags__c, (Select Id, Name From Attachments) From GalleryAsset__c Where Folder__c='" + localStorage.getItem("folder-id") + "' Order By CreatedDate Desc", function(err, res) {
            var orgUrl = localStorage.getItem("jsforce0_instance_url");

            for (var i in res.records) {
                if (err) {
                    return console.error(err);
                } else if (res.records.length > 0) {
                    var fileId = res.records[i].Attachments.records[0].Id;
                    var fileName = res.records[i].Attachments.records[0].Name;
                    var tags = res.records[i].Tags__c;

                    $("#media-object").append(
                        '<div class="col-3" style="padding-bottom:5px" >' +
                            '<a href="#my_modal" data-toggle="modal">' +
                                '<img style="width:60px;" src="' + orgUrl + '/servlet/servlet.FileDownload?file=' + fileId + '" alt="' + fileName + '" class="mr-3">' +
                                '<input type="hidden" value="' + tags + '">' +
                            '</a>' +
                        '</div>'
                    );
                }
            }
        });
    } else {
        window.location.href = "404.html";
    }
};

function logout() {
    jsforce.browser.logout();
    window.location = "/";
}

function update() {
    var conn = jsforce.browser.connection;
    conn.sobject("Folder__c").update({
        Id : localStorage.getItem("folder-id"),
        Name : document.getElementById("inputFolder").value
    },
    function(err, ret) {
        if (err || !ret.success) {
            return console.error(err, ret);
        } else {
            var message = "Updated Successfully - " + document.getElementById("inputFolder").value;

            var eventData = {
                Message__c: message
            };
            conn.sobject("Notification__e").create(eventData, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Event published");
                }
            });

            localStorage.setItem("folder-name", document.getElementById("inputFolder").value);
            document.getElementById("folder-title").innerText = localStorage.getItem("folder-name");

            $("#alert").text("Updated Successfully - " + document.getElementById("inputFolder").value);
            $(".alert").addClass("alert-success");
            $(".alert").show();
            setTimeout(function () {
                $(".alert").hide();
            }, 5000);
        }
    });
}

$('#my_modal').on('show.bs.modal', function(e) {
    var title = e.relatedTarget.firstElementChild.alt;
    var imageUrl = e.relatedTarget.firstElementChild.src;
    var tags = e.relatedTarget.lastElementChild.value.split(";");

    $(e.currentTarget).find('.modal-title')[0].innerText = title;
    $(e.currentTarget).find('#image-append')[0].src = imageUrl;
    for (var i in tags) {
        $(".modal-footer").append(
            '<span class="badge badge-success">' + tags[i] + '</span>'
        )
    }
});

$('#my_modal').on('hidden.bs.modal', function (e) {
    var target = $(e.currentTarget).find('.modal-footer')[0];
    target.innerHTML = '';
})