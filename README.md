Benchmark tests on different server technologies
=============================

#### protobuff-websockets
A test to determine the performance characteristics of using protobuf.js compared to traditional json transmission over a websocket connection.

For the following message format and value:
```
{
  text: "hello world!"
}
```

A barebones node.js server:
- sends ~23 bytes using plain JSON.stringify() encoding.
- sends ~14 bytes using protobuf.js encoding.
