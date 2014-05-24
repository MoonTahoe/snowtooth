var should = require('should'),
    DateManager = require('../../bin/DateManager');

describe('Date Manager', function() {

    var date;

    beforeEach(function(done) {
        date = new DateManager();
        done();
    });

    it("should show times on the same day", function() {

        var r = date.formatDate(new Date('3/28/14 09:00:00 AM'),
            new Date('3/28/14 11:00:00 PM'));

        r.should.equal("<span>Fri March 28th</span><span>9am - 11pm</span>");

    });

    it("should show month and days for different days", function() {

        var r = date.formatDate(new Date('3/28/14 09:00:00 AM'),
            new Date('3/29/14 11:00:00 PM'));

        r.should.equal("<span>March 28th - March 29th</span>");

    });

    it("should print single days", function() {

        var r = date.formatDate(new Date('3/28/14 09:00:00 AM'));

        r.should.equal("<span>Friday March 28th</span>");

    });

});


