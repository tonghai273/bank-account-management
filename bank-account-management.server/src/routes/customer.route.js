var express = require('express');
var customerRoute = express.Router();
var auth = require('../middlewares/auth-middleware');
var customerController = require('../controllers/customer.controller');

customerRoute.get('/search', auth.checkToken, customerController.seachMutilField);

// Get single customer
customerRoute.get('/:id', auth.checkToken, customerController.getCustomerById);
// Update customer
customerRoute.put('/:id', auth.checkToken, auth.isAuth, customerController.updateCustomer);
// Delete customer
customerRoute.delete('/:id', auth.checkToken, auth.isAuth, customerController.deleteCustomer);
// Get all customer
customerRoute.get('', customerController.getCustomer);
// Add Customer
customerRoute.post('', auth.checkToken, auth.isAuth, customerController.addCustomer);

module.exports = customerRoute;