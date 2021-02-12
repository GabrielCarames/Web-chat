var moment = require('moment')

exports.converter = (timetoconvert) => { 
    moment.locale('es');
    var time = new moment(timetoconvert);
    var untilNow = time.fromNow(true);
    return untilNow;
};