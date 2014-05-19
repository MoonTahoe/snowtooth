var sinon = require('sinon'),
    should = require('should'),
    home = require('../../models/home');

describe('Home Model', function () {

    var modelMock, stubs;

    before(function () {

        modelMock = {
            findOne: sinon.stub(),
            find: sinon.stub(),
            limit: sinon.stub(),
            exec: sinon.stub()
        }

        stubs = Object.keys(modelMock);

        modelMock.findOne.yields(null, { id: 'snowtooth' });
        modelMock.find.returns(modelMock);
        modelMock.limit.returns(modelMock);
        modelMock.exec.yields(null, [
            { id: 'snowtooth' },
            { id: 'snowface' },
            { id: 'party' },
            { id: 'extreme' }
        ]);

        home.injectModel(modelMock);

    });

    after(function() {
        home.resetModel();
    });

    describe('.fetch()', function () {

        beforeEach(function () {

            stubs.forEach(function (stub) {
                modelMock[stub].reset();
            });

        });

        it('should fetch a single image', function (done) {
            var id = 'snowtooth';
            home.fetch(id, function (img) {
                img.should.be.instanceOf(Object).and.have.property('id', id);
                modelMock.findOne.called.should.be.ok;
                modelMock.findOne.calledWith({ 'id': id }).should.be.ok;
                done();
            });
        });

        it('should fetch all images', function (done) {
            home.fetch(function (imgs) {
                imgs.should.be.instanceOf(Array).and.have.property('length', 4);
                modelMock.find.called.should.be.ok;
                modelMock.exec.calledOn(modelMock);
                done();
            });
        });

        it('should fetch a specific number of images', function (done) {

            home.fetch(2, function (imgs) {
                imgs.should.be.instanceOf(Array).and.have.property('length', 4);
                modelMock.find.called.should.be.ok;
                modelMock.limit.calledOn(modelMock).should.be.ok;
                modelMock.limit.calledWith(2).should.be.ok;
                modelMock.exec.calledOn(modelMock);
                done();
            });


        });

    });

});