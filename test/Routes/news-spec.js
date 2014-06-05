var sinon = require('sinon'),
    should = require('should'),
    route = require('../../routes/news');

describe('News Route', function () {

    var responseMock,
        newsMock,
        sampleArticles = [
            { title: 'Snow Face Concert' },
            { title: 'Skier Party was Great' },
            { title: 'Snow Face Fun Day coming up' },
            { title: 'Employee Party canceled' }
        ];

    before(function () {

        responseMock = {
            render: sinon.stub(),
            send: sinon.stub()
        };

        newsMock = {
            fetch: sinon.stub()
        };

        newsMock.fetch.yields(sampleArticles);
        route.setModel(newsMock);

    });

    beforeEach(function () {

        responseMock.render.reset();
        newsMock.fetch.reset();

    });

    after(function () {
        route.resetModel();
    });

    describe('getNews()', function () {

        it('should fetch data and render a HTML response', function (done) {

            route.get.news({}, responseMock);
            newsMock.fetch.called.should.be.ok;
            responseMock.render.calledWith('news', {
                title: 'Snowtooth News',
                description: 'Check out what is happening around the mountain',
                news: sampleArticles
            }).should.be.ok;
            done();

        });

        it('should fetch data and render a AJAX response', function(done) {

            route.get.news({ ajax: true }, responseMock);
            newsMock.fetch.called.should.be.ok;
            responseMock.send.calledWith(sampleArticles).should.be.ok;
            done();
        });

    });

    describe('getArticle()', function () {

        var req;

        before(function() {

            newsMock.fetch.yields({ title: 'Snow Face Concert' });

            req = {
                params: {
                    title: 'Snow-Face-Concert'
                }
            };

        });

        it('should fetch a single article and render a HTML response', function (done) {

            route.get.article(req, responseMock);
            newsMock.fetch.called.should.be.ok;
            newsMock.fetch.calledWith('Snow Face Concert').should.be.ok;
            responseMock.render.calledWith('article', { title: 'Snow Face Concert' }).should.be.ok;

            done();
        })

        it('should fetch a single article and render a AJAX response', function(done) {

            req.ajax = true;
            route.get.article(req, responseMock);
            newsMock.fetch.called.should.be.ok;
            newsMock.fetch.calledWith('Snow Face Concert').should.be.ok;
            responseMock.send.calledWith({ title: 'Snow Face Concert' }).should.be.ok;
            done();

        });

    });

});