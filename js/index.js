"use_strict";
var app = Object.create(null),
    button = document.getElementById('next');

window.addEventListener('load', function () {
    button.addEventListener('click', function () {
        var quote = getNextQuote(),
            quotePar = document.getElementById('quote'),
            authorPar = document.getElementById('author'),
            text = document.createTextNode(quote.text),
            author = document.createTextNode('- ' + quote.author);

        removeChildren(quotePar);
        quotePar.appendChild(text);
        removeChildren(authorPar);
        authorPar.appendChild(author);
    });

    function getNextQuote() {
        return app.quotes[Math.floor(app.quotes.length * Math.random())];
    }

    function removeChildren(elt) {
        while (elt.firstChild) {
            elt.removeChild(elt.firstChild);
        }
    }
});

window.addEventListener('load', function () {
    getJSON('assets/json/quotes.json').then(
        function (quotes) {
            app.quotes = quotes;
            button.click();
        }
    );

    function get(url) {
        return new Promise(function(succeed, fail) {
            var req = new XMLHttpRequest();
            req.open("GET", url, true);
            req.addEventListener("load", function() {
                if (req.status < 400)
                    succeed(req.responseText);
                else
                    fail(new Error("Request failed: " + req.statusText));
            });
            req.addEventListener("error", function() {
                fail(new Error("Network error"));
            });
            req.send(null);
        });
    }

    function getJSON(url) {
        return get(url).then(JSON.parse);
    }
});

