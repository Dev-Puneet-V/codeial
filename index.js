const express = require('express');
const app = express();
const port = 8000;


//Start server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);//this is called interpolation, writing variabe inside string
        return;
    }

    console.log(`Server is running on port: ${port}`);
});