const mongoose = require('mongoose');

const ServiceDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  image: {
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
  zipcode:{
    type:String,
    required:true
},
desc:{
    type:String,
    required:true
},
provider:[
  {type: Schema.Types.ObjectId, ref: 'Service'}
],
 date: {
    type: Date,
    default: Date.now
  }
});

const ServiceDetail = mongoose.model('ServiceDetail', ServiceDetailsSchema);

module.exports = ServiceDetail;
