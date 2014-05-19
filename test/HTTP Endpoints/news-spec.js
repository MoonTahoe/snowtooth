var request = require('supertest'),
    should = require('should'),
    cheerio = require('cheerio'),
    app = require('../../app'),
    news = require('../../models/news');

describe('News Page', function () {

    var $;

    it('should GET HTML', function (done) {
        request(app).get('/calendar')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                $ = cheerio.load(res.text);
                done();
            });
    });
    it('should contain at least 1 news article', function (done) {
        $('article').length.should.be.above(0);
        done();

    });
    it('should not contain any empty image urls', function (done) {
        $('img').attr('src').length.should.be.above(0);
        done();
    });

    news.fetch(function (articles) {
        articles.forEach(function (article, i) {

            describe("News: '" + article.title + "'", function () {

                it('should GET HTML', function (done) {

                    request(app).get('/news/' + article.title.replace(/ /g, '-'))
                        .expect('Content-Type', 'text/html; charset=utf-8')
                        .expect(200)
                        .end(function (err, res) {
                            if (err) throw err;
                            $ = cheerio.load(res.text);
                            done();
                        });

                });
                it('should display the title', function () {
                    $('.news-article>h1:first-child').text().should.equal(article.title);
                });
                it('should display the image', function () {
                    $('.news-article>img').attr('src').should.equal(article.img);
                    $('.news-article>img').attr('src').length.should.be.above(0);
                });
                it('should display the description', function () {
                    $('.news-article .description').text().should.equal(article.description);
                });
                it('should display the content', function () {
                    $('.news-article .content').html().trim().should.equal(article.content);
                });
                it('should display the author', function () {
                    $('.news-article .author').text().should.equal(article.author);
                });

            });

        });
    });


});
