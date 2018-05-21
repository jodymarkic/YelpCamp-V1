var express = require('express');
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded( {extended: true} ));

app.set("view engine", "ejs");

var campgrounds = 
[ 
    { name: "Salmon Creek", image: "https://c2.staticflickr.com/4/3064/2968934091_72b550ed59_b.jpg" },
    { name: "Granite Hill", image: "https://c2.staticflickr.com/8/7254/7527316876_a724547566_b.jpg" },
    { name: "Mountain Goat's Rest", image: "https://c2.staticflickr.com/4/3790/10507547803_b5bf312dbc_b.jpg" },
    { name: "Salmon Creek", image: "https://c2.staticflickr.com/4/3064/2968934091_72b550ed59_b.jpg" },
    { name: "Granite Hill", image: "https://c2.staticflickr.com/8/7254/7527316876_a724547566_b.jpg" },
    { name: "Mountain Goat's Rest", image: "https://c2.staticflickr.com/4/3790/10507547803_b5bf312dbc_b.jpg" },
    { name: "Salmon Creek", image: "https://c2.staticflickr.com/4/3064/2968934091_72b550ed59_b.jpg" },
    { name: "Granite Hill", image: "https://c2.staticflickr.com/8/7254/7527316876_a724547566_b.jpg" },
    { name: "Mountain Goat's Rest", image: "https://c2.staticflickr.com/4/3790/10507547803_b5bf312dbc_b.jpg" }
];


app.get("/", function(req, res){
    //res.send("YelpCamp Homepage!");
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", { campgrounds: campgrounds} );
})

app.post("/campgrounds", function(req, res){
    //res.send("you hit the campgrounds page!");
    
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image };
    campgrounds.push(newCampground);
    
    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server Started!"); 
});