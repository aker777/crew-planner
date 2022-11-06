import {config} from "dotenv";
config();

import express from "express";
import {MembreController} from "./controllers";
import mongoose, {Mongoose} from "mongoose";

async function startServer(): Promise<void> {

   const m: Mongoose = await mongoose.connect(process.env.MONGO_URI as string, {
      auth: {
         username: process.env.MONGO_USER  as string,
         password: process.env.MONGO_PASSWORD as string
      }
   });

   var app = express();

   app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

   const membreController = new MembreController();
   app.use('/membre', membreController.buildRoutes()); // enregistrement d'un routeur

   app.listen(process.env.PORT, function() {
      console.log("Server listening on port " + process.env.PORT);
   });
}

startServer().catch(console.error);
