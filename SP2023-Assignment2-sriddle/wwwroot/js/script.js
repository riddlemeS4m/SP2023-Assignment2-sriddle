var len;
var results = '';

var my_api_url = "https://api.bing.microsoft.com/v7.0/search?"
var my_api_key = "ca8e20c700c349f48cc336e381249d2b"

var bkgd = 0

function apiSearch() {
    var params = {
        "q": $("#query").val(),
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: my_api_url + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", my_api_key);
        },
        type: "GET",
    })
        .done(function (data) {
            len = data.webPages.value.length;
            let results = '';
            for (i = 0; i < len; i++) {
                results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog({
                width: "67%"
            });
        })
        .fail(function () {
            alert("error");
        });
}

const search_btn = document.getElementById("search-button")
search_btn.onclick = () => {
    apiSearch()
}

const time_btn = document.getElementById("time-button")
time_btn.onclick = () => {
    const time_div = document.getElementById("time")

    var datetime = moment()
    var formatted_time = datetime.format('hh:mm A')
    time_div.textContent = formatted_time;
    $('#time').dialog({
        width: 200,
        height: 100
    })

    function refreshTime() {
      datetime = moment()
      formatted_time = datetime.format('hh:mm A')
      time_div.textContent = formatted_time;
    }
    setInterval(refreshTime, 1000);
}

const header = document.getElementById("search-engine-name")
header.onclick = () => {
    const body = document.querySelector("body")
    
    if (bkgd === 0) {
        body.style.backgroundImage = "url('./images/background2.jpg')"
        bkgd = 1
    } else {
        body.style.backgroundImage = "url('./images/background1.jpg')"
        bkgd = 0
    }
}

const lucky_btn = document.getElementById("lucky-button")
lucky_btn.onclick = () => {
    var params = {
        "q": $("#query").val(),
        "count": "1",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: my_api_url + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", my_api_key);
        },
        type: "GET",
    })
        .done(function (data) {
            location.assign(data.webPages.value[0].url)
        })
        .fail(function () {
            alert("error");
        });
}