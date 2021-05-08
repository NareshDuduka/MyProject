const formidable = require("formidable");
const _ = require("lodash");//for updating
const fs = require("fs");
const Vegetables = require("../models/vegetables");
const { errorHandler } = require("../helpers/dbErrorHandler");
console.log("add1");
exports.vegetableById = (req, res, next, id) => {
    Vegetables.findById(id).exec((err, vegetable) => {
        if (err || !vegetable) {
            return res.status(400).json({
                error: "vegetable not found"
            });
        }
        req.vegetable = vegetable;
        next();
    });
};

exports.read = (req, res) => {
    req.vegetable.photo = undefined;
    return res.json(req.vegetable);
};

exports.add = (req, res) => {
    
    let form = new formidable.IncomingForm();
    console.log("add");
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(fields.price);
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        const {
            item_name,
            price,
            quantity
        } = fields;

        if (
            !item_name ||
            !price ||
            !quantity 
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        let vegetables = new Vegetables(fields);

        if (files.photo) {
            console.log(files.photo)
            vegetables.photo.data = fs.readFileSync(files.photo.path);
            vegetables.photo.contentType = files.photo.type;
        }

        vegetables.save((err, result) => {
            if (err) {
                console.log(err);
                return res.staus(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};
exports.remove = (req, res) => {
    console.log("remove")
    let vegetable = req.vegetable;
    vegetable.remove((err, deleteVegetable) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Vegetable deleted successfully"
        });
    });
};

//updating

exports.update = (req, res) => {
    
    let form = new formidable.IncomingForm();
    console.log("update");
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(fields.price);
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        const {
            item_name,
            price,
            quantity
        } = fields;

        if (
            !item_name ||
            !price ||
            !quantity 
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        let vegetables = req.vegetable;
        vegetables= _.extend(vegetables,fields);

        if (files.photo) {
            //console.log(files.photo)
            vegetables.photo.data = fs.readFileSync(files.photo.path);
            vegetables.photo.contentType = files.photo.type;
        }

        vegetables.save((err, result) => {
            if (err) {
                console.log(err);
                return res.staus(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

/**
 * sell / arrival
 * by sell = /vegetables?sortBy=sold&order=desc&limit=4
 * by arrival = /vegetables?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all vegetables are returned
 */

 exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Vegetables.find()
        .select("-photo")
        .populate("farmer_id")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, vegetables) => {
            if (err) {
                return res.status(400).json({
                    error: "Vegetables not found"
                });
            }
            res.json(vegetables);
        });
};
//farmers vegetables based on one vegetable
exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Vegetables.find({ _id: { $ne: req.vegetable }, user: req.vegetable.farmer_id })
        .limit(limit)
        .populate("farmer_id", "_id name")
        .exec((err, vegetables) => {
            if (err) {
                return res.status(400).json({
                    error: "vegetables not found"
                });
            }
            res.json(vegetables);
        });
};