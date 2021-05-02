const express = require("express");
const router = new express.Router();
const app = express();
const log = console.log;
const port = 3030;
const { exec } = require("child_process");
const request = require('request');
const cors = require('cors')
const path = require('path');

app.use(cors())
app.use(express.static(__dirname + '/public'));

router.post('/action', async (req, res) => {
    try{
        const directory = req.body.dir
        const port = req.body.port
        const action = req.body.action
        const live = exec(`sh ${action}.sh ${directory} ${port}`);
        live.stdout.on('data', (data)=>{
            log(data); 
        });
        live.stderr.on('data', (data)=>{
            log(`error is ${data}`);
        });
        live.on('close', (code) => {
            log(`child process exited with code ${code}`);
        });
        res.send({status: 'SUCCESS'})
    }catch (e) {
        res.status(400).send(e);
    }
});

router.post('/check', async (req, res) => {
    const url = req.body.url
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send({status: 'UP'})
        } else {
            res.send({status: 'DOWN'})
        }
    })
})

router.get('/health',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/unauthorized', async (req, res) => {
    res.send("Not authorized")
})

app.use(express.json()); 
app.use(router)

app.listen(port, () => {
  log(`Server is up on port ${port}`);
});
