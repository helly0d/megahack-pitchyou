import http from "http";
import express from "express";
import proxy from "express-http-proxy";
import router from "./routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.use("/api", router);

const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port: ${port}`);
  }
});
