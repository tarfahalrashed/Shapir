
function download(id) {
    if (id == "download_html") {
        id = "";
    }
    console.log("ID: ", id)
    var zip = new JSZip();
    var a = document.getElementById(id);

    if (id == "countries") {
        var urls = [id + "/index.html", id + "/style.css", id + "/local-data.json"];
    } else {
        var urls = [id + "/index.html", id + "/style.css"];
    }

    function request(url) {
        return new Promise(function (resolve) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.open("GET", url);
            httpRequest.onload = function () {
                var cleanUrl = url.split(id + "/")[1];
                zip.file(cleanUrl, this.responseText);
                resolve()
            }
            httpRequest.send()
        })
    }

    Promise.all(urls.map(function (url) {
        return request(url)
    }))
        .then(function () {
            zip.generateAsync({
                type: "blob"
            })
                .then(function (content) {
                    a.download = id;
                    a.href = URL.createObjectURL(content);
                    // a.innerHTML = "downloadX";
                });
        })

}


function init() {
    download("memorials");
    download("books");
    download("movie");
    download("artist");
    download("paintings");
    download("countries");

    document.getElementById("memorials").addEventListener("click", function () { download("memorials") }, false);
    document.getElementById("books").addEventListener("click", function () { download("books") }, false);
    document.getElementById("movie").addEventListener("click", function () { download("movie") }, false);
    document.getElementById("artist").addEventListener("click", function () { download("artist") }, false);
    document.getElementById("paintings").addEventListener("click", function () { download("paintings") }, false);
    document.getElementById("countries").addEventListener("click", function () { download("countries") }, false);

    document.getElementById("memorials_html").addEventListener("click", function () { readHTMLFile("memorials") }, false);
    document.getElementById("books_html").addEventListener("click", function () { readHTMLFile("books") }, false);
    document.getElementById("movie_html").addEventListener("click", function () { readHTMLFile("movie") }, false);
    document.getElementById("artist_html").addEventListener("click", function () { readHTMLFile("artist") }, false);
    document.getElementById("paintings_html").addEventListener("click", function () { readHTMLFile("paintings") }, false);
    document.getElementById("countries_html").addEventListener("click", function () { readHTMLFile("countries") }, false);
}


function readHTMLFile(id) {
    fetch(id + "/index.html")
        .then(function (response) {
            return response.text();
        })
        .then(function (html) {
            const escapeHtml = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            document.getElementById("mavo").innerHTML = "";
            document.getElementById("mavo").innerHTML = escapeHtml;
            Prism.highlightElement($('#mavo')[0]);
        })
}


