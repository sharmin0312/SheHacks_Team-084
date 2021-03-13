const mongoose = require('mongoose');

const ParentDetailsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  adhar: {
    type: Number,
    required: true
  },
  childAge:{
      type:Number,
      required:true
  },
  hrs:{
    type:Number,
    required:true
},

parent:[
    {type: Schema.Types.ObjectId, ref: ' User'}
  ],

 date: {
    type: Date,
    default: Date.now
  }
});

const ParentDetails = mongoose.model('ParentDetails',ParentDetailsSchema);

module.exports =ParentDetails;
