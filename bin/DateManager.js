var moment = require('moment');

function DateManager() {
}

DateManager.prototype.formatDate = function (start, end) {

    var s = '';

    start = moment(start);

    if (end) {
        end = moment(end);

        if (start.format('MM/DD/YYYY') != end.format('MM/DD/YYYY')) {

            s = '<span>' + start.format('MMMM Do') + ' - ' + end.format('MMMM Do') + '</span>';

        } else {
            s = '<span>' + start.format('ddd MMMM Do') + '</span>';
            s += '<span>' + start.format('ha') + " - "
                + end.format('ha') + '</span>';
        }
    } else {

        s = '<span>' + start.format('dddd MMMM Do') +  '</span>';

    }

    return s;
};

module.exports = DateManager;

