const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require('morgan')
const routes = require("./routes");


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/api', routes);
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.get('/', (req, res) => {
    res.redirect('/api')
})

app.get("/api", (req, res) => {
  res.send("Todo API");
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on port ${port}`));
