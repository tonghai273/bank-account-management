const { error } = require('console');
const { query } = require('express');
var Customer = require('../models/Customer');
var self = {};

self.addCustomer = function (req, res, next) {
    Customer.find({ 
        $or: [
            {email: req.body.email},
            {account_number: req.body.account_number}
        ] 
    }, function (err, array) {
        if (array.length > 0) {
            var code;
            var customers = [];
            array.forEach(data => {
                if (data.account_number === req.body.account_number) {
                    code = 1000;
                }
                if (data.email === req.body.email) {
                    code = 1002;
                }
                if ((data.account_number === req.body.account_number) && (data.email === req.body.email)) {
                    code = 1003;
                }
                customers.push({
                    _id: data.get('id'),
                    code: code
                })
            });
            res.json({
                customers: customers,
                status: 'fail'
            });
        } else {
            Customer.create(req.body, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json({
                        customer: data,
                        status: 'success'
                    });
                }
            });
        }
    });
}

self.getCustomer = function (req, res, next) {
    var page = req.query.page || 1;
    var size = req.query.size || 50;
    var skip = (page - 1) * size;
    var sort = req.query.sort;
    var order = req.query.order || 'asc';
    var search = req.query.search;
    var value = req.query.value;
    var query;
    var sortDetail = '';
    var searchDetail = '';

    // paginate
    if (page) {
        query = Customer.find().limit(parseInt(size)).skip(skip);
    } else {
        query = Customer.find();
    }

    //  field search
    if (search) {
        var params = {};
        if (search === 'age' || search === 'account_number' || search === 'balance') {
            params[search] = value;
        } else {
            params[search] = new RegExp(value);
        }
        query = Customer.find(params);
        searchDetail = search + ' ' + value;
    }
    //  field sort
    if (sort) {
        var params = {};
        if (order === 'asc') {
            params[sort] = 1;
        } else {
            params[sort] = -1;
        }
        query = query.sort(params);
        sortDetail = sort + ' ' + order;
    }

    query.exec(function (error, data) {
        if (error) {
            return next(error);
        } else {
            // count records
            Customer.countDocuments({}, function (err, result) {
                var totalPage = Math.ceil(result / size);
                res.json([{
                    customers: data,
                    paging: {
                        totalPage: totalPage,
                        page: page,
                        countSearch: data.length,
                        count: result,
                        size: size,
                    },
                    sort: sortDetail,
                    search: searchDetail
                }]);
            });
        }
    })
}

self.seachMutilField = function (req, res, next) {
    var query;
    var fieldSearch = req.query;
    var arraySearch = [];
    Object.keys(fieldSearch).forEach(key => {
        var searchItem = {};
        searchItem[key] = fieldSearch[key];
        arraySearch.push(searchItem);
    });
    query = Customer.find({
        $and: arraySearch
    });
    query.exec(function (error, data) {
        if (error) {
            return next(error);
        } else {
            res.json({
                customers: data,
                count: data.length
            });
        }
    })
}

self.getCustomerById = function (req, res, next) {
    Customer.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json({
                customer: data,
                status: 'success'
            });
        }
    });
}

self.updateCustomer = function (req, res, next) {
    Customer.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            if (req.body.email !== data.get('email')) {
                Customer.find({ 
                        email: req.body.email,
                },(error, data) => {
                    if (data.length > 0) {
                        return res.json({
                            code: 1002,
                            status: 'fail'
                        });
                    }
                    Customer.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    }, {new: true}, (error, data) => {
                        if (error) {
                            return next(error);
                        } else {
                            res.json({
                                customer: data,
                                status: 'success'
                            });
                        }
                    });
                })
            } 
            if (req.body.account_number !== data.get('account_number'))  {
                 Customer.find({ 
                    account_number: req.body.account_number,
                },(error, data) => {
                    if (data.length > 0) {
                        return res.json({
                            code: 1000,
                            status: 'fail'
                        });
                    }
                    Customer.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    }, {new: true}, (error, data) => {
                        if (error) {
                            return next(error);
                        } else {
                            res.json({
                                customer: data,
                                status: 'success'
                            });
                        }
                    });
                })
            }
            if (req.body.email === data.get('email') && req.body.account_number === data.get('account_number')) {
                Customer.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                } , {new: true}, (error, data) => {
                    if (error) {
                        return next(error);
                    } else {
                        res.json({
                            customer: data,
                            status: 'success'
                        });
                    }
                });
            }
        }
    });
    
}

self.deleteCustomer = function (req, res, next) {
    Customer.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json({
                msg: 'Deleted cutomer success',
                status: 'success'
            })
        }
    });
}

module.exports = self;