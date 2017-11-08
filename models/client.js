'use strict';

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var clientSchema = new Schema({
    _id:        { type: String, required: true },
    name:       { type: String, required: true },
    email:      { type: String, required: true },
    password:   { type: String, required: true },
    role:       { type: String, required: true }
});

module.exports = mongoose.model('client', clientSchema);