// Set up: npm install
var http = require("http"),
    fs = require("fs"),
    path = require("path"),
    ws = require("ws"),
    open = require("open");

// HTTP server
var server = http.createServer(function(req, res) {
        var file = null,
            type = "text/html";
        if (req.url == "/") {
            file = "json-index.html";
        } else if (/^\/(\w+(?:\.min)?\.(?:js|html|proto))$/.test(req.url)) {
            file = req.url.substring(1);
            if (/\.js$/.test(file)) {
                type = "text/javascript";
            }
        }
        if (file) {
            fs.readFile(path.join(__dirname, "www", file), function(err, data) {
                if (err) {
                    res.writeHead(500, {"Content-Type": type});
                    res.end("Internal Server Error: "+err);
                } else {
                    res.writeHead(200, {"Content-Type": type});
                    res.write(data);
                    res.end();
                    console.log("Served www/"+file);
                }
            });
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("Not Found");
        }
    });
server.listen(8080);
server.on("listening", function() {
    console.log("Server started");
    open("http://localhost:8080/");
});
server.on("error", function(err) {
    console.log("Failed to start server:", err);
    process.exit(1);
});
    
// WebSocket adapter
var wss = new ws.Server({server: server});
wss.on("connection", function(socket) {
    console.log("New WebSocket connection");
    socket.on("close", function() {
        console.log("WebSocket disconnected");
    });
    socket.on("message", function(data, flags) {
        try {
            var decode_st, decode_et, encode_st, encode_et;
            console.log("data: " + JSON.stringify(data));
            
            // Decode the Message
            decode_st = Date.now();
            var msg = JSON.parse(data);
            decode_et = Date.now();




            console.log("Received: "+msg.text);
            // Transform the text to upper case
            msg.text = msg.text.toUpperCase();




            // Re-encode it and send it back
            encode_st = Date.now();
            msg = JSON.stringify(msg);
            encode_et = Date.now();

            socket.send(msg);
            console.log("Sent: "+JSON.parse(data).text);
            console.log("Size: " + byteCount(msg) + " bytes");
            console.log("Decode time: " + (decode_et - decode_st) + " ms");
            console.log("Encode time: " + (encode_et - encode_st) + " ms");
            
        } catch (err) {
            console.log("Processing failed:", err);
        }
    });
});

function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
}