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
            render: sinon.stub()
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

        it('should fetch data and render a response', function (done) {

            route.get.news({}, responseMock);
            newsMock.fetch.called.should.be.ok;
            responseMock.render.calledWith('news', {
                title: 'Snowtooth News',
                description: 'Check out what is happening around the mountain',
                news: sampleArticles
            }).should.be.ok;
            done();

        });

    });

    describe('getArticle()', function () {

        it('should fetch a single article and render a response', function (done) {

            newsMock.fetch.yields({ title: 'Snow Face Concert' });

            var req = {
                params: {
                    title: 'Snow-Face-Concert'
                }
            };

            route.get.article(req, responseMock);
            newsMock.fetch.called.should.be.ok;
            newsMock.fetch.calledWith('Snow Face Concert').should.be.ok;
            responseMock.render.calledWith('article', { title: 'Snow Face Concert' }).should.be.ok;

            done();
        })


    });

});