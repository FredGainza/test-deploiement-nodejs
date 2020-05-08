var express = require('express');
var path = require('path');
const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://kopa:bMvpjMRKRM4A9qR@cluster0-hiu6h.mongodb.net/chap24-production?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, 
  err => {
    if (err) {
      console.log('ERROR DB');
    } else {
      console.log('CONNEXION DB OK');
    }
});

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client-build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client-build/index.html'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
