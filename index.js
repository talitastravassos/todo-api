const express = require("express");
const app = express();
const cors = require('cors')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors())

app.get('/', (req, res) => {
    res.send('Todo API')
})

const port = process.env.PORT || 4000 

app.listen(port, () => console.log(`listening on port ${port}`));
