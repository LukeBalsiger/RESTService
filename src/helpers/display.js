module.exports = {
    createLIList: function(list) {
        var newList
        for(var i = 0; i < list.length; i++) {
            newList += '<li>' + list[i] + '</li>'
        }
        return newList
    },
    createListOfLists: function(lists) {
        var page
        for(var i = 0; i < lists.length; i++) {
            page += `<ul>
            ${lists[i]} 
            </ul>`
        }
        return page
    }
}