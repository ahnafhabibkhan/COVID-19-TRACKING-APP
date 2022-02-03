// const assert = require('chai').assert;
//const sinon=require("sinon");
import { assert } from 'chai';
import { getUserByEmail, insertUser, deleteUserById } from"../src/backend/models/userModel.js";

describe('GET USER BY EMAIL TEST',function(){
    var server;
    it('sample test',function(){
        getUserByEmail("admin@gmail.com",(err, results) => {
            assert.equal(results["Email"], "admin@gmail.com");
        });
    });
    // after(function(done){
    //     process.exit(); // <-- THIS LOOKS REALLY BAD
    //   });
});
// describe.close();
