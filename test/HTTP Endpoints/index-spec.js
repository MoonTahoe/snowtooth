var request = require('supertest'),
    should = require('should'),
    cheerio = require('cheerio'),
    app = require('../../app');

describe('Home Page', function () {

    var $;

    it('should GET HTML', function (done) {
        request(app).get('/')
            .set('accept', 'text/html')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                $ = cheerio.load(res.text);
                done();
            });
    });

    it('should return JSON Home images on AJAX request', function(done) {

        request(app)
            .get('/')
            .set('accept', 'application/json')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, response) {
                if (err) throw err;
                response.should.be.instanceOf(Object);
                done();
            });

    });

    it('should contain at least one marketing box', function (done) {
        $('#main-image>div').length.should.be.above(0);
        done();
    });

    it('should contain 4 events', function (done) {
        $('#calendar>section').length.should.equal(4);
        done();
    });

    it('should not contain any empty image urls', function (done) {
        $('img').attr('src').length.should.be.above(0);
        var bgImage = $('section#main-image>div').css('background-image');
        bgImage = bgImage.replace("'url('", "").replace("')","");
        bgImage.length.should.be.above(0);
        done();
    });

});
