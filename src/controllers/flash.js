
    const _ = require('lodash');
    const ObjectID = require('mongodb');
    const Flash = require('../models/flash');


    /* POST /flash */
    exports.postFlash = (req, res) => {
        let active = req.body.active
let work_from = req.body.work_from
let work_to = req.body.work_to
let data = {active
,work_from,work_to};
        const flash = new Flash(data);
    
        flash.save().then((flash) => {
            res.json({flash});
        }, (e) => {
            e['code'] = 400;
            res.status(400).json({"errors": e});
        });
    };
    
    /* GET /flash */
    exports.getFlash = (req, res) => {    
        Flash.find({}).then((flash) => {
            res.json({flash});
        }, (e) => {
            e['code'] = 400;
            res.status(400).json({"errors": e});
        });
    };
    
    /* GET /flash/:id */
    exports.getFlashById = (req, res) => {
        const id = req.params.id;    
        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                "errors": {
                    "code": 404,
                    "message": "Sent parameter is invalid"
                }
            });
        }
    
        Flash.findOne({
            _id: id
        }).then((flash) => {
            if (!flash) {
                return res.status(404).json({
                    "errors": {
                        "code": 404,
                        "message": "Flash not found"
                    }
                });
            }
    
            res.json({flash});
        }).catch((e) => {
            e['code'] = 400;
            res.status(400).json({"errors": e});
        });
    };
    
    /* DELETE /flash/:id */
    exports.deleteFlashById = (req, res) => {
        const id = req.params.id;    
        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                "errors": {
                    "code": 404,
                    "message": "Sent parameter is invalid"
                }
            });
        }
    
        Flash.findOneAndRemove({
            _id: id
        }).then((flash) => {
            if (!flash) {
                return res.status(404).json({
                    "errors": {
                        "code": 404,
                        "message": "Flash not found"
                    }
                });
            }
    
            res.json({flash});
        }).catch((e) => {
            e['code'] = 400;
            res.status(400).json({"errors": e});
        });
    };
    
    /* PATCH /flash/:id */
    exports.updateFlashById = (req, res) => {
        const id = req.params.id;
        let active = req.body.active
let work_from = req.body.work_from
let work_to = req.body.work_to
let data = {active
,work_from,work_to};  
        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                "errors": {
                    "code": 404,
                    "message": "Sent parameter is invalid"
                }
            });
        }
    
        Flash.findOneAndUpdate({
            _id: id
        },{
            $set: data
        },{
            new: true
        }).then((flash) => {
            if (!flash) {
                return res.status(404).json({
                    "errors": {
                        "code": 404,
                        "message": "Flash not found"
                    }
                });
            }
    
            res.json({flash});
        }).catch((e) => {
            e['code'] = 400;
            res.status(400).json({"errors": e});
        });
    };
    
    