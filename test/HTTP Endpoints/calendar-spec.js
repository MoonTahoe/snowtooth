var request = require('supertest'),
    should = require('should'),
    cheerio = require('cheerio'),
    app = require('../../app'),
    calendar = require('../../models/calendar');

describe('Calendar Page', function () {

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

    it('should return JSON calendar on AJAX request', function(done) {

        request(app)
            .get('/calendar')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, response) {
                if (err) throw err;
                response.should.be.ok;
                response.should.be.instanceOf(Array);
                done();
            });

    });

    it('should contain at least 4 events', function (done) {
        $('article.event-item').length.should.be.above(3);
        done();
    });
    it('should not contain any empty image urls', function (done) {
        $('img').attr('src').length.should.be.above(0);
        done();
    });

    calendar.fetch(function (events) {
        events.forEach(function (event, i) {

            describe(event.id + " Page", function () {

                it('should GET HTML', function (done) {

                    request(app).get('/calendar/' + event.title.replace(/ /g, '-'))
                        .expect('Content-Type', 'text/html; charset=utf-8')
                        .expect(200)
                        .end(function (err, res) {
                            if (err) throw err;
                            $ = cheerio.load(res.text);
                            done();
                        });

                });

                it('should return JSON event "' + event.id + '" on AJAX request', function(done) {

                    request(app)
                        .get('/calendar/' + event.title.replace(/ /g, '-'))
                        .set('Accept', 'application/json')
                        .expect('Content-Type', 'application/json')
                        .expect(200)
                        .end(function(err, response) {
                            if (err) throw err;
                            response.should.be.ok;
                            response.should.be.instanceOf(Array);
                            done();
                        });

                });

                it('should display the title"' + event.title + '"', function () {
                    $('article>h1:first-child').text().should.equal(event.title);
                });
                it('should display the image', function () {
                    $('.event>img').attr('src').should.equal(event.img);
                    $('.event>img').attr('src').length.should.be.above(0);
                });
                it('should display the description', function () {
                    $('.event>.description').text().should.equal(event.description);
                });
                it('should display the content', function () {
                    $('.event>.content').html().trim().should.equal(event.html);
                });
                it('should display the start time', function () {
                    $('.event-start').text().should.equal(event.start.toString());
                });
                it('should display the end time', function () {
                    $('.event-end').text().should.equal(event.end.toString());
                });

            });

        });
    });

});
