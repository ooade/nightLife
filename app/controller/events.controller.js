'use strict';

var Events = require('../models/events');

exports.newEvent = function(req, res) {
    Events.findOne({'eventId': req.body.eventId, 'username': req.body.username}, function (err, event) {
        if(err) { throw err; } 
        if(event){
            res.json("Added");
        }
        else{
            var newEvent = new Events();
            newEvent.eventId = req.body.eventId;
            newEvent.username = req.body.username; 
            newEvent.place = req.body.place;
            newEvent.save(function (err, result) {
            if(err) { throw err; }
                res.json(result);
            });
        }
    });
};

exports.checkGoing = function(req, res) {
    Events.find({'username': req.params.username},{_id:0, __v:0}, function (err, event) {
        if(err) {throw err;}
        res.json(event);
    });
}

exports.deleteGoing = function(req, res) {
    Events.findOne({'username': req.params.username, 'eventId':req.params.id}, function (err, event) {
        if(err) {throw err;}
        event.remove(function(err){
            if(err) {throw err;}
             console.log("removed");
             res.json(event);
        })
    });
}