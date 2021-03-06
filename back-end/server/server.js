//importing express
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//importing pool i.e.database 
const pool = require('../sqldb/db');
const sqldbHelpers = require('../sqldb/dbHelpers/learners')(pool);
//importing mongoDb
const mongodbSetup = require('../mongodb/db');

//creating express server
const app = express();
const PORT = 9001;
app.use(morgan('dev'));
app.use(cors());

mongodbSetup((monogodb) => {
  //creating a route
  app.get("/learners", (request, response) => {
    sqldbHelpers.getAllLearners().then(learners => {
      response.json({ learners });
    });
  });

  app.get("/test", async (request, response) => {
    //passing collection named documents
    const result = await monogodb.collection('documents').find().toArray();
    response.json(result);
  });

  // express server listening to PORT
  app.listen(PORT, () => {
    console.log(`back-end server listening on port ${PORT}`);
  });
});









