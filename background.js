var http = require('http');

function getData(text, callback) {
    http.get("http://sandbox.api.simsimi.com/request.p?key=49fbdd68-c3da-42f1-b454-951fb803e880&lc=ch&text=" + text, function(res) {
        res.on('data', function(chunk) {
            callback(chunk);
        });
    }).on('error', function(e) {
        callback('好像出错了！');
    });
}

var express = require('express');

var app = express();

app.use('/', express.static('public'));
app.use('/lib', express.static('lib'));
app.get('/q', function (req, res) {
    var text = req.query.text;
    if (text) {
        getData(text, function(data) {
            res.writeHead(200, {
                'Content-Type': 'text/json',
                'encode': 'utf-8'
            });
            res.end(data);
        });
    } else {
        res.end('');
    }
});

var port = 8800;
app.listen(port, function() {
    console.log('listening on port ' + port);
});