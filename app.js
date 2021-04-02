const express = require('express');
const cluster = require('cluster');
const http = require('http');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const i18n = require('i18n');

const MongoStore = require('connect-mongo')(session);
const CronJob = require('./cron/CronJob');

const numCPUs = process.env.WEB_CONCURRENCY || require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++)
    cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  const server = http.createServer(app);

  i18n.configure({
    locales:['tr', 'en', 'de', 'es', 'fr'],
    directory: __dirname + '/translations',
    queryParameter: 'lang',
    defaultLocale: 'en'
  });

  dotenv.config({ path: path.join(__dirname, ".env") });

  const PORT = process.env.PORT || 3000;
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/usersmagic";

  const authRouteController = require('./routes/authRoute');
  const imageRouteController = require('./routes/imageRoute');
  const indexRouteController = require('./routes/indexRoute');
  const projectsRouteController = require('./routes/projectsRoute');
  const settingsRouteController = require('./routes/settingsRoute');

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");

  mongoose.connect(mongoUri, { useNewUrlParser: true, auto_reconnect: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

  app.use(express.static(path.join(__dirname, "public")));

  app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  });

  app.use(sessionOptions);
  app.use(cookieParser());

  app.use(i18n.init);

  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.use('/', indexRouteController);
  app.use('/auth', authRouteController);
  app.use('/image', imageRouteController);
  app.use('/projects', projectsRouteController);
  app.use('/settings', settingsRouteController);

  server.listen(PORT, () => {
    console.log(`Server is on port ${PORT} as Worker ${cluster.worker.id} running @ process ${cluster.worker.process.pid}`);
    if (cluster.worker.id == 1) { // Call CronJobs only for the first worker
      // CronJob.start(() => {
      //   console.log('Cron jobs are started for every minute');
      // });
    }
  });
}
