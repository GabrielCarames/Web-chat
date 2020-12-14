const mongoose = require('mongoose');
var url = "mongodb://localhost/users"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.catch(error => console.log("error"))
.then(db => console.log("hola te conectaste c.i"))