import http from "http";
import express from "express";
import proxy from "express-http-proxy";

const port = 3001;
const app = express();

app.use("/api/psd2", proxy("https://psd2-test.younify.ro", {
  proxyReqPathResolver(req) {
    return `/api/v1${req.url}`;
  },
  proxyReqOptDecorator(proxyReqOpts) {
    proxyReqOpts.headers["X-AUTH-TOKEN"] = "SDdIbDgzZmpFblRBem5MTzB4dlhlNQ==";
    proxyReqOpts.headers.accept = "application/json";

    return proxyReqOpts;
  },
}));


const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port: ${port}`);
  }
});
