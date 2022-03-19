const express = require('express');
const router = require('./controllers/rateController');
const app = express();
app.set('view engine','ejs');
app.use("/",router);
const PORT = 3000;
app.listen(PORT,()=>console.log(`Listening at port ${PORT}`));
