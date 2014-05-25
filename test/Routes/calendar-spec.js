var sinon = require('sinon'),
    should = require('should'),
    route = require('../../routes/calendar');

describe('Calendar Route', function () {

    var responseMock,
        calendarMock,
        sampleEvents = [
            { title: 'Snow Face Concert' },
            { title: 'Skier Party' },
            { title: 'Snow Face Fun Day' },
            { title: 'Employee Party' }
        ];

    before(function () {

        responseMock = {
            render: sinon.stub(),
            send: sinon.stub()
        };
        calendarMock = {
            fetch: sinon.stub()
        };
        calendarMock.fetch.yields(sampleEvents);
        route.setModel(calendarMock);

    });

    beforeEach(function () {

        responseMock.render.reset();
        calendarMock.fetch.reset();

    });

    after(function () {
        route.resetModel();
    });

    describe('getCalendar()', function () {

        it('should fetch data and render a HTML response', function (done) {

            route.get.calendar({}, responseMock);
            calendarMock.fetch.called.should.be.ok;
            responseMock.render.calledWith('calendar', {
                title: 'Events at Snowtooth',
                description: 'When the skiing is over the fun begins, check out these awesome events',
                events: sampleEvents
            }).should.be.ok;
            done();

        });

        it('should fetch data and render a AJAX response', function(done) {

            route.get.calendar({ ajax: true }, responseMock);
            calendarMock.fetch.called.should.be.ok;
            responseMock.send.calledWith(sampleEvents).should.be.ok;
            done();

        });

    });

    describe('getEvent()', function() {

        var req;

        before(function() {
            calendarMock.fetch.yields({ title: 'Snow Face Concert' });

            req = {
                params: {
                    title: 'Snow-Face-Concert'
                }
            };
        });

        it('should fetch a single event and render a HTML response', function (done) {
            route.get.event(req, responseMock);
            calendarMock.fetch.called.should.be.ok;
            calendarMock.fetch.calledWith('Snow Face Concert').should.be.ok;
            responseMock.render.calledWith('event', { title: 'Snow Face Concert' }).should.be.ok;

            done();
        });

        it('should fetch a single event and send an AJAX response', function(done) {
            req.ajax = true;
            route.get.event(req, responseMock);
            calendarMock.fetch.called.should.be.ok;
            calendarMock.fetch.calledWith('Snow Face Concert').should.be.ok;
            responseMock.send.calledWith({ title: 'Snow Face Concert' }).should.be.ok;
            done();
        });


    });



});