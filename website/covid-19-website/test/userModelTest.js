// const assert = require('chai').assert;
//const sinon=require("sinon");
import { assert } from 'chai';
import { getUserByEmail, insertUser, deleteUserById } from"../src/backend/models/userModel.js";

describe('GET USER BY EMAIL TEST',function(){

    it('get user test',function(){
        getUserByEmail("admin@gmail.com",(err, results) => {
            assert.equal(results["Email"], "admin@gmail.com");
        });
        getUserByEmail("notAvaliable.com",(err, results) => {
            assert.equal(results, undefined);
        });
    });
    // after(function(done){
    //     process.exit(); // <-- THIS LOOKS REALLY BAD
    //   });
});
// describe.close();

describe('insert and delete test',function(){

    it('insert and delete test',function(){
        getUserByEmail("testOnly@gmail.com",(err, results) => {
            assert.equal(results, undefined);
        });
        insertUser("testOnly@gmail.com",(err, results) => {
            assert.equal(results, undefined);
        });
        getUserByEmail("notAvaliable.com",(err, results) => {
            assert.equal(results['Email'], "testOnly@gmail.com");
        });
    });
    
});
