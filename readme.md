Snowtooth Website
=================
This is the snowtooth website.

Topics
------
* express
* ejs
* mongo
* passport

Installation
------------

1. Install Express Generator

```
    $ npm install express-generator
```

2. Generate Express Boilerplate

```
    $ express --ejs
```

3. Install Dependcies

```
    $ npm install
```

4. Run Sample

```
    $ npm start
```

Routes
------

1. Add Special Routes to __app.js__

```javascript
    var routes = require('./routes/yourRoute');

    ...

    app.use('/', routes);
    app.use('/users/, users);
    app.use('/yourRoute/', yourRoute);
```

2. Edit Route File

```
    var express = require('express');
    var router = express.Router();

    router.get('/', function (req, res) {
        res.render('yourPage', { title: 'Custom Route' });
    });

    module.exports = router;
```

3. Create Routing Files and templates

```
   <%- include parts/header -%>
```

4. Use the Model Data in the files

Mongodb Installation
--------------------

1. Download and Install Mongodb - [Mongodb Downloads](http://www.mongodb.org/downloads)
2. FInd Mongo on your computer - (c:\Program Files\MongoDB 2.6 Standard/bin/
3. Create a directory c:\mongod, and move the bin there
4. Path the files in c:\mongod\bin, so you can use mongo from any terminal


Database Population
-------------------

1. Create a data directory for your database

```
   $ mkdir data
```

2. Run mongo, specify your data directory

```
   $ mongod --dbpath ./data
```

3. Open a New Terminal and navagate to __data-init__ folder

4. Import initial data

```
   $ mongoimport --db snowtooth --collection home --file home.json --jsonArray
   $ mongoimport --db snowtooth --collection news --file news.json --jsonArray
   $ mongoimport --db snowtooth --collection calendar --file calendar.json --jsonArray
```
5. Connect to Mongo and check data

```
   $ mongo
   > use snowtooth
   switched to db snowtooth
   > db.home.find().pretty()
   {
            "_id" : ObjectId("5375a34730fc999d83f071b7"),
            "id" : "snowtooth",
            "url" : "/img/snowtooth.jpg",
            "text" : "Get some snow in those teeth."
    }
    {
            "_id" : ObjectId("5375a34730fc999d83f071b8"),
            "id" : "snowface",
            "url" : "/img/snowface.jpg",
            "text" : "Snowface Music Festival, tickets on sale now!"
    }
    {
            "_id" : ObjectId("5375a34730fc999d83f071b9"),
            "id" : "bigmountia",
            "url" : "/img/bigmountain.jpg",
            "text" : "We're hosting the Big Mountain Finals."
    }
    >
```

Add database to App
-------------------

1. Install mongoose

```
   $ npm install --save mongoose
```

2. Add DB Connection to app.js

```javascript

    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/snowtooth');
    var db = mongoose.connection;
    db.on('error', function(err) {
        console.log(err.message);
    });

    db.once('open', function() {
        console.log("Connected to Mongodb");
        mongoose.connection.db.collectionNames(function (err, collectionNames) {
           if (err) {
               console.log("Error Listing Tables");
           } else {
               collectionNames.forEach(function(name) {
                   console.log("'%s'", name.name);
               });
           }
        });
    });

```

3. Add the database to the request pipeline

```javascript
    app.use(function(req, res, next) {
        req.db = db;
        next();
    });
```

Home Model and Route
--------------------

1. Create __models/home.js__

```javascript
    app.use(function(req, res, next) {
        req.db = db;
        next();
    });
```


2. Build and export the home model

```javascript
    var mongoose = require('mongoose');

    var homeSchema = mongoose.Schema({
        id: String,
        url: String,
        text: String
    });

    module.exports.home = mongoose.model('home', homeSchema, 'home');
```

3. In the __routes/index.js__ consume the model and send the data to the template

```javascript
    var express = require('express');
    var router = express.Router();
    var home = require('../models/home').home;

    router.get('/', function (req, res) {


        home.find(function (err, docs) {

            var model;

            if (err) {
                throw err;
            } else {

                res.render('index', {
                    title: 'Snowtooth Mountain',
                    description: 'The official website for the snowtooth ski resort',
                    imgs: docs
                });

            }

        });


    });

    module.exports = router;
```

4.  Repeat this process for calendar and news

5.  Finish all of the basic routing and views

