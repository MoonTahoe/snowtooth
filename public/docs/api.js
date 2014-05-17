YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Models.calendar",
        "Models.home",
        "Models.news"
    ],
    "modules": [
        "snowtooth app"
    ],
    "allModules": [
        {
            "displayName": "snowtooth app",
            "name": "snowtooth app",
            "description": "Snowtooth Express Website\n=========================\nAn example application using __express__, __ejs__, and __mongoose__.  This is a content driven web application\nfor a fake ski resort.\n\napp.js\n------\n* Opens snowtooth database connection\n* Prints a list of collection names once the connection has opened\n* Attaches __req.db__ database to routing requests\n* Adds favorite Icon\n* Parses cookies\n* Parses POST request bodies\n* Parses json request bodies\n* Adds routing\n* Handles Errors\n* Attaches __req.ajax__ to request headers with json\n* Enables CORS for json requests"
        }
    ]
} };
});