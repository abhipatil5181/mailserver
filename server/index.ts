import { SMTPServer } from "smtp-server";
import "dotenv/config";
import emailServerClass from "./emailserver";
require("dotenv").config();
import express from "express";
import { Request, Response } from "express";
import emailRouter from "./routes/email.routes";
import cookieParser from "cookie-parser";
import testRouter from "./test/test.routes"; // this one is  used to test functionlalities
import connectionRouter from "./routes/connection.routes";
const app = express();
app.use(express.json());
app.use(cookieParser());

export const globalpath = __dirname;
//loki setup

import winston, { createLogger, transports } from "winston";
import LokiTransport from "winston-loki";
const options = {
  transports: [
    new LokiTransport({
      json: true,
      host: "http://13.233.151.6:3100",
      format: winston.format.json(),
    }),
  ],
};
export const logger = createLogger(options);

//setup http server
app.get("/", (req: Request, res: Response) => {
  logger.info("this is / route");
  res.sendStatus(200).send("<h1>Hello to everyone 5 🎉🎉🎉<h1>");
  logger.info("Response: " + "<h1>Hello to everyone 5 🎉🎉🎉<h1>");
});

app.use("/email", emailRouter);
app.use('/test',testRouter);
app.use("/connect",connectionRouter);
app.listen(process.env.HTTP_PORT, () => {
  console.log(`server running on port ${process.env.HTTP_PORT}`);
});

//setup emailserver

const emailServer = new emailServerClass();

emailServer._server.listen(process.env.EMAIL_PORT, () => {
  console.log(`email server running on port ${process.env.EMAIL_PORT}`);
});
