var Suppliers = require('../../models/Supplier');
var Events = require('../../models/Event');

var mongoose = require('mongoose');
var EVResponse = require('./../EVResponse.js');
var Rx = require('rxjs/Rx');
var RxMongo = require('./../RxMongo.js');
var EVBody = require('./../EVBody.js');

module.exports = {

  getAllOfSupplier: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    var rx = RxMongo.find(Events, {
      "supplier_id": supplier_id
    });

    rx.subscribe(function(doc){
        if(doc) {
          doc = doc.map(function(element){
            return element.getInfo();
          })
        }
        EVResponse.success(res, doc);
    }, function(error) {

      EVResponse.failure(res,403, error);
    })
  },

  getDetail: function(req,res,next) {

    var event_id = req.params.event_id;
    var rx = RxMongo.findOne(Events,{
      "_id": event_id
    }, false);

    rx.subscribe(function(doc){

      EVResponse.success(res,doc.getDetail());
    }, function(error) {
      EVResponse.failure(res,405,error);
    });
  },

  createEvent: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    var body = EVBody(req.body);
    if (body == null) {
      EVResponse.failure(res,406,"Body empty");
      return;
    }
    var newEvent = new Events(body);
    var passKey = newEvent.checkKeyRequire();

    if (!passKey) {
      EVResponse.failure(res,406,"Body not adequate");
      return;
    }

    RxMongo.save(newEvent).subscribe(function(
      EVResponse.success(res,newEvent.getDetail());
    ), function(error) {
      EVResponse.failure(res,406,"Save fail event");
    });
  },

  updateEvent: function(req,res,next) {

    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    var event_id = req.params.event_id;

    RxMongo.findOneAndUpdated(Events,{
      "_id": event_id,
      "supplier_id": supplier_id
    }).subscribe(function(doc){
      EVResponse.success(res,doc);
    }, function(error) {
      EVResponse.failure(res,403,"Update fail with error " + error);
    })
  }

  deleteEvent: function(req,res,next) {

    var event_id = req.params.event_id;
    var supplier_id = EVResponse.verifiyAccessToken(req,"supplier_id");
    if (supplier_id == null) {
      EVResponse.failure(res,405,"Access token not true");
      return;
    }

    RxMongo.remove(Events,{
      '_id': event_id,
      'supplier_id': supplier_id
    }).subscribe(function () {

      EVResponse.success(res,"Success");
    }, function (err) {
      EVResponse.failure(res,403,"Failure");
    })
  }

}
