// Loading .env
import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";

import { Application } from "./Application";

const app = new Application();
app.run();
