'use strict';

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var policySchema = new Schema({
    _id:                { type: String, required: true },
    amountInsured:      { type: String, required: true },
    email:              { type: String, required: true },
    inceptionDate:      { type: Date, required: true },
    installmentPayment: { type: Boolean, required: true },
    clientId:           { type: String, required: true }
});

module.exports = mongoose.model('policy', policySchema);