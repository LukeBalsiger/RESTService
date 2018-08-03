const https = require('https')
var display = require('./../helpers/display')

var cardController = function(pokemon){

    var get = function(req, res){
        pokemon.card.where({ name: req.query.name})
        .then(result => {
            var stuff = {
                length: result.length,
                set: [],
                number: [],
                rarity: [],
                imageUrls: []
            }
            for(var i = 0; i < result.length; i++)
            {
                stuff.set.push(result[i].set)
                stuff.number.push(result[i].number)
                stuff.rarity.push(result[i].rarity)
                stuff.imageUrls.push(result[i].imageUrl)
            }
            var listSet = display.createLIList(stuff.set)
            var listNum = display.createLIList(stuff.number)
            var listRarity = display.createLIList(stuff.rarity)
            var listUrls = display.createLIList(stuff.imageUrls)

            var response = display.createListOfLists([listSet, listNum, listRarity, listUrls])
            res.send(response)
            console.log(result.length)
            console.log('done');
        })
    }

    return {
        get: get
    }
}

module.exports = cardController;