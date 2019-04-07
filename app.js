var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground")
var seedDB = require("./seeds")

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded( {extended: true} ));
app.set("view engine", "ejs");

// var campgrounds = 
// [ 
//     { name: "Salmon Creek", image: "https://c2.staticflickr.com/4/3064/2968934091_72b550ed59_b.jpg" },
//     { name: "Granite Hill", image: "https://c2.staticflickr.com/8/7254/7527316876_a724547566_b.jpg" },
//     { name: "Mountain Goat's Rest", image: "https://c2.staticflickr.com/4/3790/10507547803_b5bf312dbc_b.jpg" },
//     { name: "Salmon Creek", image: "https://c2.staticflickr.com/4/3064/2968934091_72b550ed59_b.jpg" },
//     { name: "Granite Hill", image: "https://c2.staticflickr.com/8/7254/7527316876_a724547566_b.jpg" },
//     { name: "Mountain Goat's Rest", image: "https://c2.staticflickr.com/4/3790/10507547803_b5bf312dbc_b.jpg" },
//     { name: "Salmon Creek", image: "https://c2.staticflickr.com/4/3064/2968934091_72b550ed59_b.jpg" },
//     { name: "Granite Hill", image: "https://c2.staticflickr.com/8/7254/7527316876_a724547566_b.jpg" },
//     { name: "Mountain Goat's Rest", image: "https://c2.staticflickr.com/4/3790/10507547803_b5bf312dbc_b.jpg" }
// ];


//SCHEMA SETUP
// var campgroundSchema = new mongoose.Schema({
//     name: String,
//     image: String,
//     description: String
// });




app.get("/", function(req, res){
    //res.send("YelpCamp Homepage!");
    res.render("landing");
});

//INDEX ROUTE
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
    //res.render("campgrounds", { campgrounds: campgrounds} );
});


app.post("/campgrounds", function(req, res){
    //res.send("you hit the campgrounds page!");
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc };
    
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            //console.log("NEWLY CREATED CAMPGROUND: ");
            //console.log(campground);
            res.redirect("/campgrounds");
        }
    });
});


app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


//SHOW ROUTE - shows more info about one campground.
app.get("/campgrounds/:id", function(req, res){
    
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
             //render show template with that campground
             res.render("show", {campground: foundCampground});
             
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server Started!"); 
});