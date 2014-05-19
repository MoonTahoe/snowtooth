var sinon = require('sinon'),
    should = require('should'),
    news = require('../../models/news');

describe('News Model', function () {

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

        modelMock.findOne.yields(null, { title: 'News Article' });
        modelMock.find.returns(modelMock);
        modelMock.sort.returns(modelMock);
        modelMock.limit.returns(modelMock);
        modelMock.exec.yields(null, [
            { title: 'Headline Article' },
            { title: 'Sports Article' },
            { title: 'Neighborhood Article' },
            { title: 'Business Article' }
        ]);

        news.injectModel(modelMock);

    });

    after(function() {

        news.resetModel();

    });

    describe('.fetch()', function () {

        beforeEach(function () {

            stubs.forEach(function (stub) {
                modelMock[stub].reset();
            });

        });

        it('should fetch a single article', function (done) {
            var title = 'News Article';
            news.fetch(title, function (article) {
                article.should.be.instanceOf(Object).and.have.property('title', title);
                modelMock.findOne.called.should.be.ok;
                modelMock.findOne.calledWith({ 'title': title }).should.be.ok;
                done();
            });
        });

        it('should fetch all news articles', function (done) {
            news.fetch(function (articles) {
                articles.should.be.instanceOf(Array).and.have.property('length', 4);
                modelMock.find.called.should.be.ok;
                modelMock.sort.calledOn(modelMock).should.be.ok;
                modelMock.sort.calledWith({ 'date': 1 }).should.be.ok;
                modelMock.exec.calledOn(modelMock);
                done();
            });
        });

        it('should fetch a specific number of events', function (done) {

            news.fetch(2, function (articles) {
                articles.should.be.instanceOf(Array).and.have.property('length', 4);
                modelMock.find.called.should.be.ok;
                modelMock.sort.calledOn(modelMock).should.be.ok;
                modelMock.sort.calledWith({ 'date': 1 }).should.be.ok;
                modelMock.limit.calledOn(modelMock).should.be.ok;
                modelMock.limit.calledWith(2).should.be.ok;
                modelMock.exec.calledOn(modelMock);
                done();
            });


        });

    });

});