require('dotenv').config()
const express = require('express');
const port =  5005;
const app = express()

app.use(express.json())
const router = require('./src/routes/index')

app.get('/' , (req , res)=>{
   res.send(`Welcome in API dewe Tour :) `)
})

app.use('/backend/v1/', router)


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});