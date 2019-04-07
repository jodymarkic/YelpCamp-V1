var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
     { 
         name: "Salmon Creek",
         image: "https://c2.staticflickr.com/4/3064/2968934091_72b550ed59_b.jpg",
         description: "blah blah blah"
     },
     { 
         name: "Granite Hill", 
         image: "https://c2.staticflickr.com/8/7254/7527316876_a724547566_b.jpg",
         description: "blah blah blah" 
         
     },
     { 
         name: "Mountain Goat's Rest",
         image: "https://c2.staticflickr.com/4/3790/10507547803_b5bf312dbc_b.jpg",
         description: "blah blah blah" 
         
     }
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "this place is great, but i wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment")
                            }
                        });
                    
                }
            });
        });
    });       
}

module.exports = seedDB;