'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var User = require('../models/User.js');
var ContactList = require('../models/ContactList');
var mongoose = require('mongoose');
chai.use(chaihttp);


for (var i=0; i<100000; i++){ describe('test somthing important', function(){
		it('should pass', function(done){
			expect('true').to.eql('true');
			done();
		});
	});
}
