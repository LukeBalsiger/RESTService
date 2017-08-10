var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var cardModel = new Schema({
    name: {
        type: String
    },
    setName: {
        type: String
    },
    imgUrl: {
        type: String
    },
    owned: {
        type: Boolean, 
        default:false
    }
});

module.exports = mongoose.model('Card', cardModel);