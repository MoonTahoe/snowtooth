var sinon = require('sinon'),
    should = require('should'),
    route = require('../../routes/index');

describe('Home Route', function () {

    var responseMock,
        calendarMock,
        homeMock,
        sampleEvents = [
            { title: 'Snow Face Concert' },
            { title: 'Skier Party' },
            { title: 'Snow Face Fun Day' },
            { title: 'Employee Party' }
        ],
        sampleImages = [
            { title: 'Get some Snow in those teeth' },
            { title: 'Tickets on Sale Now' },
            { title: 'Big Mountain Competition' },
            { title: 'Employee Party' }
        ];

    before(function () {

        responseMock = {
            render: sinon.stub()
        };

        calendarMock = {
            fetch: sinon.stub()
        };

        homeMock = {
            fetch: sinon.stub()
        };

        calendarMock.fetch.yields(sampleEvents);
        homeMock.fetch.yields(sampleImages);
        route.setModel({
            home: homeMock,
            calendar: calendarMock
        });

    });

    after(function () {
        route.resetModel();
    });

    describe('getIndex()', function () {

        it('should fetch home page images', function (done) {

            route.get.index({}, responseMock);
            homeMock.fetch.called.should.be.ok;
            done();

        });

        it('should fetch 4 calendar events', function (done) {

            calendarMock.fetch.called.should.be.ok;
            calendarMock.fetch.calledWith(4).should.be.ok;

            done();
        });

        it('should renders the page with both calendar and home images', function (done) {

            responseMock.render.calledWith('index', {
                title: 'Snowtooth Mountain',
                description: 'The official website for the snowtooth ski resort',
                imgs: sampleImages,
                calendar: sampleEvents
            }).should.be.ok;

            done();

        });

    });

});