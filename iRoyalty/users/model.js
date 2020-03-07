const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {type: String, unique: true, required: true}
});

schema.set("toJSON", {virtuals: true});

module.exports = mongoose.model("User", schema);