
const Express = require('express');
const express = new Express();

function sendStatus(req, resp){
    resp.json({
        status: 'ok'
    })
}
express.get('/api/status', sendStatus);


express.listen(8000, 'localhost', ()=> {
    console.log("Server is running at", 8000)
})
