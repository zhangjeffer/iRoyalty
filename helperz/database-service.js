const mongoose = require("mongoose");
const URI = "mongodb+srv://cluster0-sz1zy.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(URI,{
    dbName: "testAPI",
    user: "Group69",
    pass: "Group69!",
    userNewUrlParser: true,
    useUnifiedTopology: true
}, function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Connected to the db");
    }
});

mongoose.Promise = global.Promise;

module.exports = {
    User: require("../users/model")
};
