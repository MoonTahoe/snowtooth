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
            render: sinon.stub()
        };

        calendarMock = {
            fetch: sinon.stub()
        };

        calendarMock.fetch.yields(sampleEvents);
        route.setModel(calendarMock);

    });

    after(function () {
        route.resetModel();
    });

    describe('getCalendar()', function () {

        beforeEach(function () {

            responseMock.render.reset();
            calendarMock.fetch.reset();

        });

        it('should fetch data and render a response', function (done) {

            route.get.calendar({}, responseMock);
            calendarMock.fetch.called.should.be.ok;
            responseMock.render.calledWith('calendar', {
                title: 'Events at Snowtooth',
                description: 'When the skiing is over the fun begins, check out these awesome events',
                events: sampleEvents
            }).should.be.ok;
            done();

        });

        it('should fetch a single event adn render a response', function (done) {

            calendarMock.fetch.yields({ title: 'Snow Face Concert' });

            var req = {
                params: {
                    title: 'Snow-Face-Concert'
                }
            };

            route.get.event(req, responseMock);
            calendarMock.fetch.called.should.be.ok;
            calendarMock.fetch.calledWith('Snow Face Concert').should.be.ok;
            responseMock.render.calledWith('event', { title: 'Snow Face Concert' }).should.be.ok;

            done();
        })


    });

});