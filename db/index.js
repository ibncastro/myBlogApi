// mongoose connection to database?
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("h");
});

exports.test = function (req, res) {
    res.render('test');
};


module.exports = db;