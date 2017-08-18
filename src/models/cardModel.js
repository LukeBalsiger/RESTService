var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var cardModel = new Schema({
    id:                    {type: String},
    name:                  {type: String},
    nationalPokedexNumber: {type: Number},
    imageUrl:              {type: String},
    imageUrlHiRes:         {type: String},
    types:                 {type: Object},
    supertype:             {type: String},
    subtype:               {type: String},
    retreatCost:           {type: Object},
    number:                {type: String},
    artist:                {type: String},
    rarity:                {type: String},
    setName:               {type: String},
    setCode:               {type: String},
    attacks:               {type: Object},
    weaknesses:            {type: Object},
    owned:                 {type: Boolean, default:false}
});

module.exports = mongoose.model('Card', cardModel), this.find;