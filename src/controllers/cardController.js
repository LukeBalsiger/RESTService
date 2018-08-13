var cardController = function(cardData){

    var get = function(req, res) {
        if(req.query.cardId || req.query.location || req.query.owned || req.query.name || req.query.setCode) {
            cardData.find(req.query).then(result => {
                res.json(result.sort((a,b) => {
                    return a.number - b.number
                }))
            })
        }
        else {
            cardData.find({}).then(result => {
                res.json(result.sort((a,b) => {
                    return a.number - b.number
                }))
            })
        }
    }

    var post = function(req, res) {
        cardData.find({cardId: req.body.cardId}).then(result => {
            if(result.length > 0) {
                res.send("Something with that ID already exists, please update with a patch")
            }
            else {
                var newCardData = {
                    name: "",
                    setCode: "",
                    setName: "",
                    imageUrl: "",
                    number: "",
                    rarity: "",
                    owned: false,
                    location: "",
                    notes: ""
                }
                if(!req.body.cardId || !req.body.name || !req.body.setCode) { 
                    res.send("Need an id, name and set")
                    return
                }
                if(req.body.owned) { newCardData.owned = req.body.owned }
                if(req.body.location) { newCardData.location = req.body.location }
                if(req.body.notes) { newCardData.notes = req.body.notes }
                cardData.create({
                    cardId: req.body.cardId,
                    name: req.body.name,
                    setCode: req.body.setCode,
                    setName: req.body.setName,
                    imageUrl: req.body.imageUrl,
                    number: req.body.number,
                    rarity: req.body.rarity,
                    owned: newCardData.owned,
                    location: newCardData.location,
                    notes: newCardData.notes
                }).then(result => {
                    res.json(result)
                })
            }
        })
        
    }

    var patch = function(req, res) {
        if(!req.body.cardId) {
            res.send("Please provide a card id")
        }
        cardData.findOneAndUpdate(
            req.body
        ).then(result => {
            res.send("Updated")
        })
    }

    var remove = function(req, res) {
        if(!req.body.cardId) {
            res.send("Please provide a card id")
        }
        cardData.findOneAndRemove({
            cardId: req.body.cardId
        }).then(result => {
            res.json(result)
        })
    }

    return {
        get: get,
        post: post,
        patch: patch,
        delete: remove

    }
}

module.exports = cardController;