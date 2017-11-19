import "../config/env";

import fs from "fs";
import chalk from "chalk";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import clearConsole from "react-dev-utils/clearConsole";
import checkRequiredFiles from "react-dev-utils/checkRequiredFiles";
import { choosePort, createCompiler, prepareProxy, prepareUrls } from "react-dev-utils/WebpackDevServerUtils";
import paths from "../config/paths";
import config from "../config/webpack.config.dev";
import createDevServerConfig from "../config/webpackDevServer.config";


process.on("unhandledRejection", (err) => {
  throw err;
});


const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const DEFAULT_PORT = 3000;
const PORT = parseInt(process.env.PORT, 10) || DEFAULT_PORT;
const HOST = process.env.HOST || "0.0.0.0";

choosePort(HOST, PORT).
  then((port) => {
    if (!port) {
      return;
    }
    const protocol = process.env.HTTPS === "true" ? "https" : "http";
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, HOST, port);
    const compiler = createCompiler(webpack, config, appName, urls, useYarn);
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    );
    const devServer = new WebpackDevServer(compiler, serverConfig);
    devServer.listen(port, HOST, (err) => {
      if (err) {
        console.log(err);

        return;
      }

      if (isInteractive) {
        clearConsole();
      }

      console.log(chalk.cyan("Starting the development server...\n"));
    });

    ["SIGINT", "SIGTERM"].forEach((sig) => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });
  }).
  catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
