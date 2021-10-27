const express = require('express');
const port = process.env.PORT || 5005;
const app = express()



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});