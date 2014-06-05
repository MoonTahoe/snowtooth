var sinon = require('sinon'),
    should = require('should'),
    calendar = require('../../models/calendar');

describe('Calendar Model', function () {

    var modelMock, stubs;

    before(function () {

        modelMock = {
            findOne: sinon.stub(),
            find: sinon.stub(),
            sort: sinon.stub(),
            limit: sinon.stub(),
            exec: sinon.stub()
        }

        stubs = Object.keys(modelMock);

        modelMock.findOne.yields(null, { title: 'Snow Face Concert' });
        modelMock.find.returns(modelMock);
        modelMock.sort.returns(modelMock);
        modelMock.limit.returns(modelMock);
        modelMock.exec.yields(null, [
            { title: 'Snow Face Concert' },
            { title: 'Skier Party' },
            { title: 'Snow Face Fun Day' },
            { title: 'Employee Party' }
        ]);

        calendar.injectModel(modelMock);

    });

    after(function() {

        calendar.resetModel();

    });

    describe('.fetch()', function () {

        beforeEach(function () {

            stubs.forEach(function (stub) {
                modelMock[stub].reset();
            });

        });

        it('should fetch a single event', function (done) {
            var title = 'Snow Face Concert';
            calendar.fetch(title, function (event) {
                event.should.be.instanceOf(Object).and.have.property('title', title);
                modelMock.findOne.called.should.be.ok;
                modelMock.findOne.calledWith({ 'title': title }).should.be.ok;
                done();
            });



        });

        it('should fetch all events', function (done) {
            calendar.fetch(function (event) {
                event.should.be.instanceOf(Array).and.have.property('length', 4);
                modelMock.find.called.should.be.ok;
                modelMock.sort.calledOn(modelMock).should.be.ok;
                modelMock.sort.calledWith({ 'start': 1 }).should.be.ok;
                modelMock.exec.calledOn(modelMock);
                done();
            });
        });

        it('should fetch a specific number of events', function (done) {

            calendar.fetch(2, function (event) {
                event.should.be.instanceOf(Array).and.have.property('length', 4);

                modelMock.find.called.should.be.ok;
                modelMock.sort.calledOn(modelMock).should.be.ok;
                modelMock.sort.calledWith({ 'start': 1 }).should.be.ok;
                modelMock.limit.calledOn(modelMock).should.be.ok;
                modelMock.limit.calledWith(2).should.be.ok;
                modelMock.exec.calledOn(modelMock);

                done();
            });


        });

    });

});