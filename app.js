// app.js

const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

// const db = require('./database_connection.js');

// async function testConnection() {   
//     try {
//         await db.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
//testConnection();

// middleware
app.use(koaBody.koaBody());

// Require the routers
let data = require('./routes/data.js');
let user = require('./routes/user.js');
let tracker = require('./routes/tracker.js');
let user_tracker = require('./routes/user_tracker.js');

// use the routes
app.use(data.routes());
app.use(data.allowedMethods());
app.use(user.routes());
app.use(user.allowedMethods());
app.use(tracker.routes());
app.use(tracker.allowedMethods());
app.use(user_tracker.routes());
app.use(user_tracker.allowedMethods());

app.listen(3000);