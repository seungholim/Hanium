//module dependencies
const express = require('express');
const app = express();
const cron = require('node-cron');
const push = require('./push/push.js')
const createError = require('http-errors');
const cf = require('./python/cf.js');

//push notification
cron.schedule('0 0 * * *', async() => {
    try{
        await push.expirationCounter()
            .then(() => {
                push.refrigeratorUser();
            })
            .catch((e) => {
                console.error(e);
            });

    } catch(e) {
    console.error(e);
    next(createError(404, e));
}
    console.log('cron'); 
});

//collaborative filtering
cron.schedule('0 0 * * *', async() => {
    try{
        await cf.pythonCf();
    } catch(e) {
    console.error(e);
    next(createError(404, e));
}
    console.log('reset cf');
});

app.use(express.json());

//apiRouter
const apiRouter = require('./routes/route.js');
app.use('/api', apiRouter);

//exports
module.exports = app;

//ejs file
const fs = require("fs");
const ejs = require('ejs');

app.get('/', (req, res) => {
  fs.readFile('./upload.ejs', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(ejs.render(data, {
      name:'EJS Page',
      description:'Hello ejs with node.js'
    }));
  });
});