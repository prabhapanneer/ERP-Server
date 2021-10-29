"use strict";
const mongoose = require('mongoose');
const fs = require("fs");
const store = require("../../models/store.model");
const sections = require("../../models/section.model");
const restoredSections = require("../../models/restored_section.model");
const storeService = require("../../../services/store.service");
const commonService = require("../../../services/common.service");
const imgUploadService = require("../../../services/img_upload.service");

exports.list = (req, res) => {
    sections.findOne({ _id: mongoose.Types.ObjectId(req.query.section_id), "categories._id": mongoose.Types.ObjectId(req.query.category_id) }, function(err, response) {
        if(!err && response) {
            let category = response.categories.filter(object => object._id.toString()==req.query.category_id);
            if(category.length) {
                res.json({ status: true, list: category[0].sub_categories });
            }
            else {
                res.json({ status: false, message: "Invalid category" });
            }
        }
        else {
            res.json({ status: false, error: err, message: "failure" });
        }
    });
}

exports.details = (req, res) => {
    sections.findOne({ _id: mongoose.Types.ObjectId(req.body.section_id), "categories._id": mongoose.Types.ObjectId(req.body.category_id) }, function(err, response) {
        if(!err && response) {
            let category = response.categories.filter(object => object._id.toString()==req.body.category_id);
            if(category.length) {
                let subCategory = category[0].sub_categories.filter(object => object._id.toString()==req.body._id);
                if(subCategory.length) {
                    res.json({ status: true, data: subCategory[0] });
                }
                else {
                    res.json({ status: false, message: "Invalid sub-category" });
                }
            }
            else {
                res.json({ status: false, message: "Invalid category" });
            }
        }
        else {
            res.json({ status: false, error: err, message: "failure" });
        }
    });
}

exports.add = (req, res) => {
    sections.findOne({ _id: mongoose.Types.ObjectId(req.body.section_id), "categories._id": mongoose.Types.ObjectId(req.body.category_id) }, function(err, response) {
        if(!err && response) {
            let category = response.categories.filter(object => object._id.toString()==req.body.category_id);
            if(category.length)
            {
                let subCategoryList = category[0].sub_categories;
                if(subCategoryList.findIndex(obj => obj.name==req.body.name) == -1) {
                    // inc rank
                    subCategoryList.forEach((object) => {
                        if(req.body.rank <= object.rank) {
                            object.rank = object.rank+1;
                        }
                    });
                    // add
                    let pathName = response.name+"-"+category[0].name+"-"+req.body.name;
                    let seoUrl = commonService.urlFormat(pathName);
                    if(seoUrl) {
                        req.body.seo_status = true;
                        req.body.seo_details = {
                            page_url: seoUrl,
                            h1_tag: req.body.name.substring(0, 70),
                            page_title: req.body.name.substring(0, 70)
                        };
                    }
                    subCategoryList.push(req.body);
                    sections.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.section_id), "categories._id": mongoose.Types.ObjectId(req.body.category_id) },
                    { $set: { "categories.$.sub_categories": subCategoryList } },
                    function(err, response) {
                        if(!err) {
                            storeService.updateStoreSitemap(req.id);
                            res.json({ status: true });
                        }
                        else { res.json({ status: false, error: err, message: "failure" }); }
                    });
                }
                else {
                    res.json({ status: false, error: err, message: "Name already exist" });
                }
            }
            else {
                res.json({ status: false, message: "Invalid category" });
            }
        }
        else {
            res.json({ status: false, error: err, message: "Invalid category" });
        }
    });
}

exports.update = (req, res) => {
    sections.findOne({ _id: mongoose.Types.ObjectId(req.body.section_id), "categories._id": mongoose.Types.ObjectId(req.body.category_id) }, function(err, response) {
        if(!err && response) {
            let category = response.categories.filter(object => object._id.toString()==req.body.category_id);
            if(category.length)
            {
                let subCategoryList = category[0].sub_categories;
                if(req.body.prev_rank < req.body.rank)
                {
                    // dec rank
                    subCategoryList.forEach((object) => {
                        if(req.body.prev_rank<object.rank && req.body.rank>=object.rank) {
                            object.rank = object.rank-1;
                        }
                    });
                }
                else if(req.body.prev_rank > req.body.rank)
                {
                    // inc rank
                    subCategoryList.forEach((object) => {
                        if(req.body.prev_rank>object.rank && req.body.rank<=object.rank) {
                            object.rank = object.rank+1;
                        }
                    });
                }
                let index = subCategoryList.findIndex(object => object._id == req.body._id);
                if(index != -1) {
                    // seo details
                    if(!req.body.seo_details) { req.body.seo_details = {}; }
                    if(!req.body.seo_details.modified) {
                        let pathName = response.name+"-"+category[0].name+"-"+req.body.name;
                        let seoUrl = commonService.urlFormat(pathName);
                        if(seoUrl) {
                            req.body.seo_status = true;
                            req.body.seo_details.page_url = seoUrl;
                            req.body.seo_details.h1_tag = req.body.name.substring(0, 70);
                            req.body.seo_details.page_title = req.body.name.substring(0, 70);
                        }
                    }
                    if(req.body.img_change) {
                        // remove existing img
                        if(req.body.exist_image) {
                            fs.unlink(req.body.exist_image, function (err) { });
                            let smallImg = req.body.exist_image.split(".");
                            if(smallImg.length>1) fs.unlink(smallImg[0]+"_s."+smallImg[1], function (err) { });
                        }
                        // upload new img
                        let rootPath = 'uploads/'+req.id+'/category';
                        imgUploadService.singleFileUpload(req.body.image, rootPath, true, null).then((img) => {
                            req.body.image = img;
                            subCategoryList[index] = req.body;
                            // update
                            sections.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.section_id), "categories._id": mongoose.Types.ObjectId(req.body.category_id) },
                            { $set: { "categories.$.sub_categories": subCategoryList } },
                            function(err, response) {
                                if(!err) {
                                    storeService.updateStoreSitemap(req.id);
                                    res.json({ status: true });
                                }
                                else { res.json({ status: false, error: err, message: "failure" }); }
                            });
                        });
                    }
                    else {
                        subCategoryList[index] = req.body;
                        // update
                        sections.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.section_id), "categories._id": mongoose.Types.ObjectId(req.body.category_id) },
                        { $set: { "categories.$.sub_categories": subCategoryList } },
                        function(err, response) {
                            if(!err) {
                                storeService.updateStoreSitemap(req.id);
                                res.json({ status: true });
                            }
                            else { res.json({ status: false, error: err, message: "failure" }); }
                        });
                    }
                }
                else {
                    res.json({ status: false, error: "Invalid sub-category", message: "Failure" });
                }
            }
            else {
                res.json({ status: false, message: "Invalid category" });
            }
        }
        else {
            res.json({ status: false, error: err, message: "Invalid category" });
        }
    });
}

exports.soft_remove = (req, res) => {
    sections.findOne({ _id: mongoose.Types.ObjectId(req.body.section_id), "categories._id": mongoose.Types.ObjectId(req.body.category_id) }, function(err, response) {
        if(!err && response) {
            let category = response.categories.filter(object => object._id.toString()==req.body.category_id);
            if(category.length)
            {
                let subCategoryList = category[0].sub_categories;
                // dec rank
                subCategoryList.forEach((object) => {
                    if(req.body.rank<object.rank) {
                        object.rank = object.rank-1;
                    }
                });
                let index = subCategoryList.findIndex(object => object._id == req.body._id);
                if(index != -1) {
                    let restoreData = {
                        store_id: req.id, type: 'sub_category', section_id: req.body.section_id, category_id: req.body.category_id,
                        sub_category_id: req.body._id, details: subCategoryList[index]
                    };
                    subCategoryList.splice(index, 1);
                    // update
                    sections.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.section_id), "categories._id": mongoose.Types.ObjectId(req.body.category_id) },
                    { $set: { "categories.$.sub_categories": subCategoryList } },
                    function(err, response) {
                        if(!err) {
                            restoredSections.create(restoreData, function(err, response) {
                                storeService.updateStoreSitemap(req.id);
                                res.json({ status: true });
                            });
                        }
                        else { res.json({ status: false, error: err, message: "failure" }); }
                    });
                }
                else {
                    res.json({ status: false, error: "Invalid sub-category", message: "Failure" });
                }
            }
            else {
                res.json({ status: false, message: "Invalid category" });
            }
        }
        else {
            res.json({ status: false, error: err, message: "Invalid category" });
        }
    });
}