import http from "http";
import express from "express";
import proxy from "express-http-proxy";

const port = 3001;
const app = express();

app.use("/api/psd2", proxy("https://psd2-test.younify.ro/api/v1", {
  userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
    // recieves an Object of headers, returns an Object of headers.

    console.log(headers);

    return headers;
  },
}));


const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
});
