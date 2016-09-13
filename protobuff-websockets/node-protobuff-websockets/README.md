ProtoBuf.js WebSocket example - [Original example](https://github.com/dcodeIO/protobuf.js/tree/master/examples/websocket)
=============================
This example shows the performance characteristics of using a protocol buffer ([protobuf.js](https://github.com/dcodeIO/protobuf.js)) vs using traditional json string transmission. 

Instructions
------------
1. Set up dependencies: `npm install`

Test Protobuf.js
------------
1. Run: `node proto-server.js`
2. Open [http://localhost:8080/](http://localhost:8080/) in a recent browser

Test JSON
------------
1. Run: `node json-server.js`
2. Open [http://localhost:8080/](http://localhost:8080/) in a recent browser

Results
------------
For a message of the following format and value:
```
{
  text: 'hello world!'
}
```
1. ~14 bytes are sent using protobuf.js' .toBuffer() encoding.
1. ~23 bytes are sent using plain JSON.stringify() encoding.
