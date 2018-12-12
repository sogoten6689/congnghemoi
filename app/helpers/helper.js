var datetime = require('node-datetime');

exports.genrenateID = function( ){
    var pastDateTime = datetime.create();
    let pastNow = pastDateTime.now();
    console.log("da" + pastNow);
    return Number(pastNow);
};