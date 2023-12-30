import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import "./db/connection.js";
import { __dirname, mongoStoreOptions } from './utils.js';

//-------------------------📌VIEWS IMPORTS
import handlebars from 'express-handlebars';
import userRouter from "./routes/users.router.js";
import viewsRouter from './routes/views.router.js'

//-------------------------📌APIS IMPORTS
import cookiesRouter from "./routes/cookies.router.js";
import productsRouter from './routes/products.router.js';


//-------------------------📌FILESTORE IMPORTS
/* 
import sessionFileStore from "session-file-store";
 */
//-------------------------📌MONGOSTORE IMPORTS

import passport from "passport";
import "./passport/github.strategy.js";
import "./passport/local.strategy.js";


const app = express();

//-------------------------📌GENERAL SETTINGS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

//-------------------------📌HANDLEBARS SETTINGS
app.engine('handlebars', handlebars.engine()); 
app.set('view engine', 'handlebars');  
app.set('views', __dirname+'/views');  

//-------------------------📌SESSION OPTION
//app.use(session(fileStoreOptions));
app.use(session(mongoStoreOptions));

//-------------------------📌 PASSPORT SETTINGS
app.use(passport.initialize());
app.use(passport.session());

//-------------------------📌 VIEWS
app.use("/users", userRouter);
app.use('/', viewsRouter);

//-------------------------📌APIS ROUTES
app.use("/api/cookies", cookiesRouter);
app.use('/api/products', productsRouter);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server OK on port:: ${PORT}`);
});

export default app;
