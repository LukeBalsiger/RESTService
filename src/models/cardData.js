const mongoose = require('mongoose')

let Schema = mongoose.Schema

const cardDataSchema = new Schema({
    cardId: String,
    name: String,
    number: String,
    rarity: String,
    setCode: String,
    setName: String,
    imageUrl: String,
    owned: Boolean,
    location: String,
    notes: String
})

const CardData = mongoose.model('CardData', cardDataSchema)

module.exports = CardData