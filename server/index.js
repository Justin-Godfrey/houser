require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ctrl = require('./controller');
const massive=require('massive');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`))

massive( process.env.CONNECTION_STRING ).then(dbInstance=>{
    app.set('db', dbInstance);
});

app.get('/api/houses', ctrl.getAll)
app.post('/api/house', ctrl.create)
app.delete('/api/house/:id', ctrl.delete)

app.listen(port, () => {
   console.log(`All cylinders firing on ${port}`)
})