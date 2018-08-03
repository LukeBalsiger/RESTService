const https = require('https')
var display = require('./../helpers/display')

var cardController = function(pokemon){

    var get = function(req, res){
        var query = {}
        if(req.query.name) {query.name = req.query.name}
        if(req.query.set) {query.set = req.query.set}
        pokemon.card.where(query)
        .then(result => {
            var stuff = {
                length: result.length,
                set: [],
                number: [],
                rarity: [],
                imageUrls: [],
                name: []
            }
            for(var i = 0; i < result.length; i++)
            {
                stuff.set.push(result[i].set)
                stuff.number.push(result[i].number)
                stuff.rarity.push(result[i].rarity)
                stuff.imageUrls.push(result[i].imageUrl)
                stuff.name.push(result[i].name)
            }
            var listSet = display.createLIList(stuff.set)
            var listNum = display.createLIList(stuff.number)
            var listRarity = display.createLIList(stuff.rarity)
            var listUrls = display.createLIList(stuff.imageUrls)
            var listName = display.createLIList(stuff.name)

            var response = display.createListOfLists([listSet, listNum, listRarity, listUrls, listName])
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